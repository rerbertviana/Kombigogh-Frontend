<template>
  <div class="vendervue">
    <div class="form">
      <el-row class="lin1" :gutter="10">
        <el-col :span="13">
          <div class="l1c1">
            <i class="fas fa-paint-brush fa-fw ico"></i>
            <el-select v-model="value" filterable placeholder="ARTISTAS" clearable no-match-text="Não encontrado">
              <el-option v-for="item in options2" :key="item.id" :label="item.nome" :value="item.id"></el-option>
            </el-select>
            <i class="fas fa-paste fa-fw ico3"></i>
            <el-select v-model="value2" filterable placeholder="CATEGORIA" clearable no-match-text="Não encontrado">
              <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id"></el-option>
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
      <el-row class="tabela">
        <div>
          <el-table :data="products.filter(data => !search || data.nome.toLowerCase().includes(search.toLowerCase()) || data.descricao.toLowerCase().includes(search.toLowerCase()))" border stripe empty-text="Sem resultados">
            <el-table-column width="95">
              <template slot-scope="scope">
                <v-avatar size="70" rounded>
                  <v-img :src= "getImagem(scope.row)"/>
                </v-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="nome" label="NOME"></el-table-column>
            <el-table-column prop="descricao" label="DESCRIÇÃO"></el-table-column>
            <el-table-column prop="preco" label="PREÇO"></el-table-column>
            <el-table-column prop="quantidade" label="QUANTIDADE"></el-table-column>
            <el-table-column label="ADD CARRINHO" width="150">
              <template slot-scope="scope">
                <div class="acoes">
                  <el-button @click="getCarrinho(scope.row)" class="botao cor2"><i class="fas fa-shopping-bag ico2"></i></el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <el-row v-if="botao">
        <el-col :span="24" class="end">
          <el-button @click="getCancelar" class="botaocarro cor3">CANCELAR</el-button>
          <router-link to="/carrinho" class="botaocarro cor2"> <span class="letras">VENDER</span> </router-link>
        </el-col>
      </el-row>
  </div>  
    
</template>

<script>

import axios from 'axios'
import { baseApiurl } from '@/global'
import { mapState } from 'vuex'


export default {
    name: 'Vender',

    computed: mapState(['perfilVisible', 'order', 'botao', 'itens', 'mensagem']),

    data() {
      return {
        search: '',
        options: [],
        options2:[],
        value: '',
        input: '',
        value2: '',
        products: [],
      }
    },

    watch: {
      value() {
        this.getFilter()
      },
      value2() {
        this.getFilter()
      },
      itens() {
        this.getItens()
      }
    },

    methods: {

      visible() {
        if (this.perfilVisible == true)
        this.$store.commit('togglePerfil')
      },

      getCancelar() {
        this.$store.commit('zerarPedidos')
      },

      getItens() {
        if(this.itens == 0) {
          this.cancelada()
        }
        else {
          this.sucesso()
        }
      },

      getFilter() {
        if(!this.value && this.value2) {
          return this.getProductsCategory()
        }
        if(!this.value2 && this.value) {
          return this.getProductUser()
        }
        if(this.value && this.value2) {
          return this.getProductUserCategory()
        }
        if(!this.value && !this.value2) {
          return this.getProducts()
        }
      },

      getTodos() {
        this.getProducts();
        this.value = '';
        this.value2 = '';
      },
     
      getProductUserCategory() {
        return axios.get(`${baseApiurl}/products/${this.value}/${this.value2}`).then(res => this.products = res.data);
      },

      getProductsCategory() {
        return axios.get(`${baseApiurl}/categoriesproducts/${this.value2}`).then(res => this.products = res.data.product);
      },

      getProductUser() {
        return axios.get(`${baseApiurl}/products/${this.value}`).then(res => this.products = res.data.product);
      },

      getProducts() {
        return axios.get(`${baseApiurl}/products/actives`).then(res => this.products = res.data);
      },

      getCategories() {
        return axios.get(`${baseApiurl}/categories`).then(res => this.options = res.data);
      },

      getUsers() {
        return axios.get(`${baseApiurl}/users/adm`).then(res => this.options2 = res.data);
      },

      getImagem(row) {
        if(!row.imagem) {
          return `http://localhost:3333/files/default.jpg`
        }
        return `http://localhost:3333/files/${row.imagem}`
      },

      sucesso() {
        this.$message({
          showClose: true,
          message:'Produto adicionado.',
          type: 'success',
        });
      },

      cancelada() {
        this.$message({
          showClose: true,
          message:'Venda cancelada.',
          type: 'info',
        });
      },

      adicionado() {
        this.$message({
          showClose: true,
          message:'Este produto já foi adicionado.',
          type: 'info',
        });
      },

      getCarrinho(row) {
        this.$store.commit('pedidos', row);
        if(this.mensagem == true) {
          this.adicionado();
        }
      }

      
    },
    mounted() {
      this.getProducts()
      this.getCategories()
      this.getUsers()
      this.visible()
    }

}
</script>

<style scoped>

.form {
  padding-top: 30px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;

  border-radius: 10px;
  box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
}

.vendervue {
  margin-top: 50px;
  margin-right: 60px;
  margin-left: 60px;
  margin-bottom: 60px;
}

.lin1 {
  margin-bottom: 20px;
}

.lin2 {
  margin-bottom: 40px;
}

.l1c1 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.l1c2 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 5px;
}


.b1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #82D4D1;
  width: 115px;
  height: 40px;
  border: none;
}

.b2 {
  margin-left: 10px;
  background-color: #82D4D1;
  color: white;
  height: 40px;
  width: 100px;
  border: none;
}

.produtos {
  margin-right: 10px;
}


.botao {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  width: 100px;
  height: 40px;
  background-color: #82D4D1;
  color: white;
  border: none;
}

.botaocarro {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  width: 150px;
  height: 50px;
  color: white;
  border: none;
  text-decoration: none;
  border-radius: 5px;
}


.cor1 {
  background-color: #69F690;
}

.cor2 {
  background-color: #82D4D1;
}

.cor3 {
  background-color: #FFA882;
}

.ico {
  margin-right: 15px;
  color: black;
  font-size: 1.2rem;
}

.ico2 {
  color: white;
  font-size: 1.4rem;
}

.ico3 {
  margin-left: 15px;
  margin-right: 15px;
  color: black;
  font-size: 1.2rem;
}


.tabela {
  margin-top: 30px;
}

.espaco {
  margin-right: 10px;
}

.acoes {
  display: flex;
}

.end {
  animation: headShake;
  animation-duration: 1s;
  display:flex;
  margin-top: 20px;
  justify-content: flex-end;
}

.letras {
  font-size: 14px;
}

</style>