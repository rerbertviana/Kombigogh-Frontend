<template>
  <div class="meusprodutos">
    <div class="form">
      <el-row>
        <el-col :span="24" class="cadastro">
          <span class="letras2">CADASTRO DE PRODUTOS</span>
        </el-col>
      </el-row>
      <el-row class="lin1" :gutter="15">
        <el-col :span="12">
          <div class="l1c1">
            <i class="fas fa-box fa-fw ico"></i>
            <span class="letras nome">NOME</span>
            <el-input placeholder="Nome do produto" v-model="product.nome" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="l1c2">
            <i class="fas fa-hand-holding-usd fa-fw ico"></i>
            <span class="letras preco">PREÇO(R$)</span>
            <el-input-number size="small" v-model="product.preco" controls-position="right" :step="0.05" :min="0"></el-input-number>
            <i class="fas fa-th-large fa-fw ico qtd"></i>
            <span class="letras">QTD</span>  
            <el-input-number size="small" v-model="product.quantidade" controls-position="right" :step="1" :min="1"></el-input-number>
          </div>
        </el-col>
      </el-row>
      <el-row class="lin2" :gutter="15" >
        <el-col :span="12">
          <div class="l2c1">
            <i class="fas fa-pen-alt fa-fw ico"></i>
            <span class="letras">DESCRIÇÃO</span>
            <el-input placeholder="Descrição do produto" v-model="product.descricao" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="l2c2">
            <i class="fas fa-paste fa-fw ico ico2"></i>
            <span class="letras cat">CATEGORIA</span>
            <el-select v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
              <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id"></el-option>
            </el-select>
            <el-upload v-if="product.id" class="upload-demo espaco" :action="sfoto" :limit="1"  :on-exceed="handleExceed" :file-list="fileList"  :on-preview="handlePreview">
              <el-button class="bavatar"> <i class="fas fa-image fa-fw"></i> FOTO</el-button> 
            </el-upload>
            <el-button @click="salvar" class="b2">NOVO</el-button>
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
            <el-table-column label="AÇÕES"></el-table-column>
          </el-table>
        </div>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiurl } from "@/global";

export default {
  name: "produtos",
  data() {
    return {
      fileList: [],
      products: [],
      product:{},
      options: [],
      options2: [],
      search: "",
      value: "",
      input: "",
      input2: "",
    };
  },


  methods: {

    getCategories() {
      return axios
        .get(`${baseApiurl}/categories`)
        .then((res) => (this.options = res.data));
    },

    getMyproducts() {
      return axios
        .get(`${baseApiurl}/usersproducts`)
        .then((res) => (this.products = res.data.product));
    },

    getImagem(row) {
      if(!row.imagem) {
        return `http://localhost:3333/files/default.jpg`
      }
      return `http://localhost:3333/files/${row.imagem}`
    }, 

    handleExceed(files) {
        this.$message.warning(`O limite é de um arquivo, você selecionou ${files.length}`);
    },

    handlePreview(file) {
        console.log(file);
    },

    limpar() {
      this.product = {};
      this.value = '';
    },

    salvar() {
      axios.post(`${baseApiurl}/products/${this.value}`, this.product)
      .then(() => {
        this.getMyproducts()
        this.limpar()
      })
    },

    sfoto() {
      return ``
    }
  },

  mounted() {
    this.getMyproducts();
    this.getCategories();
  },
};
</script>

<style scoped>
.meusprodutos {
  margin-top: 50px;
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
.tabela {
  margin-top: 30px;
}

.ico {
  margin-right: 10px;
  color: black;
  font-size: 1.2rem;
}

.letras {
  margin-right: 15px;
  font-size: 17px;
  color: black;
}

.letras2 {
  margin-right: 15px;
  font-size: 17px;
  color: white;
}

.lin1 {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.lin2 {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.l1c1 {
  display: flex;
  align-items: center;
}

.l1c2 {
  display: flex;
  align-items: center;
}

.l2c1 {
  display: flex;
  align-items: center;
}

.l2c2 {
  display: flex;
  align-items: center;
}

.nome {
  margin-right: 65px;
}

.espaco {
  margin-left: 8px;
}

.bavatar {
  background-color: #82D4D1;
  color: white;
}

.b2 {
  margin-left: 8px;
  width: 100px;
  height: 40px;
  background-color: #69F690;
  color: white;
}

.cat {
  margin-right: 15px;
}

.qtd {
  margin-left: 15px;
}

.preco {
  margin-right: 22px;
}
.cadastro {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  border-radius: 5px;
  height: 50px;
  align-items: center;
  background-color: #82D4D1;
}
</style>