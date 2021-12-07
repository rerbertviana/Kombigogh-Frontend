<template>
  <div class="produtos">
    <div class="form">
      <el-row class="lin1" :gutter="15">
        <el-col :span="13">
          <div class="l1c1">
            <i class="fas fa-paint-brush fa-fw ico"></i>
            <el-select v-model="value" filterable placeholder="ARTISTAS" clearable no-match-text="Não encontrado">
              <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id"></el-option>
            </el-select>
            <i class="fas fa-paste fa-fw ico ico2"></i>
            <el-select v-model="value2" filterable placeholder="CATEGORIA" clearable no-match-text="Não encontrado">
              <el-option v-for="item in options2" :key="item.id" :label="item.nome" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="l1c2">
            <i class="fas fa-box-open fa-fw ico"></i>
            <el-input placeholder="NOME DO PRODUTO" v-model="search" size="large">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button @click="getTodos" class="b2">TODOS</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-select class="pag" v-model="value3" filterable placeholder="N° ITENS POR PÁGINA" clearable no-match-text="Não encontrado">
      <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-row class="tabela">
      <el-table :data="productslist.filter(data => !search || data.nome.toLowerCase().includes(search.toLowerCase()) || data.descricao.toLowerCase().includes(search.toLowerCase()))" border stripe empty-text="Sem resultados">
        <el-table-column width="95">
          <template slot-scope="scope">
            <v-avatar size="70" rounded>
              <v-img :src= "getImagem(scope.row)"/>
            </v-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="nome" label="NOME" width="170"></el-table-column>
        <el-table-column prop="descricao" label="DESCRIÇÃO"></el-table-column>
        <el-table-column prop="preco" label="PREÇO" width="130"></el-table-column>
        <el-table-column prop="quantidade" label="QUANTIDADE" width="130"></el-table-column>
        <el-table-column label="STATUS" width="110">
          <template slot-scope="scope">
            <span>{{scope.row.ativo == true ? 'ATIVO' : 'INATIVO'}}</span>
          </template>
        </el-table-column>
      </el-table>
      <v-pagination color="#82D4D1" class="paginacao" v-model="pageVender" :length="pages"></v-pagination>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiurl } from "@/global";
import { mapState } from 'vuex'

export default {
  name: "produtos",
  computed: mapState(['productslist', 'pages']),

  data() {
    return {
      products: [],
      options: [],
      options2: [],
      search: "",
      value: "",
      value2: "",
      value3: '',
      input: "",
      pageVender: 1,
      options3: [
          {
            value: 5,
            label: '05'
          },
          {
            value: 10,
            label: '10'
          },
          {
            value: 15,
            label: '15'
          },
      ],
    };
  },

  watch: {
    value() {
      this.getFilter();
    },
    value2() {
      this.getFilter();
    },
    value3() {
      this.setFiltro()
    },
    pageVender() {
      this.$store.commit('getProductList', this.pageVender);
    }
  },

  methods: {

    setFiltro() {
      if(this.value3 == '') {
        this.$store.commit('setFiltro', 5)
        this.getFilter()
      } else {
        this.$store.commit('setFiltro', this.value3)
        this.getFilter()
      }
    },

    getFilter() {
      if (!this.value && this.value2) {
        return this.getProductsCategory();
      }
      if (this.value && !this.value2) {
        return this.getProductUser();
      }
      if (this.value && this.value2) {
        return this.getProductUserCategory();
      }
      if (!this.value && !this.value2) {
        return this.getProducts();
      }
    },

    async getProductUserCategory() {
      await axios
        .get(`${baseApiurl}/products/${this.value}/${this.value2}`)
        .then((res) => (this.products = res.data));

      this.$store.commit('getProducts', this.products);
      if(this.pages < this.pageVender) {
        this.pageVender = 1
      }
      this.$store.commit('getProductList', this.pageVender);
    },

    async getProductsCategory() {
      await axios
        .get(`${baseApiurl}/categoriesproducts/${this.value2}`)
        .then((res) => (this.products = res.data.product));

      this.$store.commit('getProducts', this.products);
      if(this.pages < this.pageVender) {
        this.pageVender = 1
      }
      this.$store.commit('getProductList', this.pageVender);
    },

    async getProductUser() {
      await axios
        .get(`${baseApiurl}/products/${this.value}`)
        .then((res) => (this.products = res.data.product))
      
      this.$store.commit('getProducts', this.products);
      if(this.pages < this.pageVender) {
        this.pageVender = 1
      }
      this.$store.commit('getProductList', this.pageVender);
    },

    async getProducts() {
      await axios
        .get(`${baseApiurl}/products`)
        .then((res) => (this.products = res.data));

      this.$store.commit('getProducts', this.products);
      if(this.pages < this.pageVender) {
        this.pageVender = 1
      }
      this.$store.commit('getProductList', this.pageVender);
      
    },

    getUsers() {
      return axios
        .get(`${baseApiurl}/users/adm`)
        .then((res) => (this.options = res.data));
    },

    getCategories() {
      return axios
        .get(`${baseApiurl}/categories`)
        .then((res) => (this.options2 = res.data));
    },

    getTodos() {
      this.value = '';
      this.value2 = '';
      this.search = '';

      this.getProducts();
    },

    getImagem(row) {
      if(!row.imagem) {
        return `http://localhost:3333/files/default.jpg`
      }
      return `http://localhost:3333/files/${row.imagem}`
    }, 
  },

  mounted() {
    this.setFiltro()
    this.getUsers();
    this.getCategories();
  },
};
</script>

<style scoped>
.produtos {
  margin-top: 40px;
  margin-right: 60px;
  margin-left: 60px;
  margin-bottom: 60px;
}

.form {
  padding-top: 30px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;

  border-radius: 10px;
  box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
}

.lin1 {
  margin-bottom: 15px;
}

.l1c1 {
  display: flex;
  align-items: center;
}

.l1c2 {
  display: flex;
  align-items: center;
}

.ico {
  margin-right: 15px;
  color: black;
  font-size: 1.2rem;
}

.ico2 {
  margin-left: 15px;
}

.letras {
  margin-right: 15px;
  font-size: 17px;
  color: black;
}

.letras2 {
  margin-right: 15px;
  font-size: 17px;
  color: black;
}

.b2 {
  margin-left: 10px;
  background-color: #82D4D1;
  color: white;
  height: 40px;
  width: 100px;
  border: none;
}

.paginacao {
  margin-top: 15px;
}

.pag {
  margin-top: 15px;
  margin-bottom: 15px;
  width: 210px;
}
</style>