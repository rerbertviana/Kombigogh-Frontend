<template>
  <div class="meusprodutos">
    <div class="form">
        <el-row v-if="pesquisar"> 
          <el-col :span="24" class="pesquisar">
            <i class="fas fa-box fa-fw ico"></i>
            <span class="letras"> PRODUTOS </span>
            <el-input placeholder="Nome ou descrição produto" v-model="search" size="large">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button @click="getCadastrar" class="botao">NOVO</el-button>
          </el-col>
        </el-row>
      <div v-if="cadastrar">
        <el-row>
          <el-col :span="24" class="titulo">
            <span class="letras2">CADASTRAR PRODUTOS</span>
          </el-col>
        </el-row>
        <el-row class="lin1" :gutter="15">
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-box fa-fw ico"></i>
              <span class="letras nome">NOME</span>
              <el-input placeholder="Nome do produto" v-model="product.nome" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-hand-holding-usd fa-fw ico"></i>
              <span class="letras preco">PREÇO</span>
              <el-input-number size="small" v-model="product.preco" controls-position="right" :step="0.05" :min="0"></el-input-number>
              <i class="fas fa-th-large fa-fw ico qtd"></i>
              <span class="letras">QTD</span>  
              <el-input-number size="small" v-model="product.quantidade" controls-position="right" :step="1" :min="1"></el-input-number>
            </div>
          </el-col>
        </el-row>
        <el-row class="lin2" :gutter="15" >
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-pen-alt fa-fw ico"></i>
              <span class="letras">DESCRIÇÃO</span>
              <el-input placeholder="Descrição do produto" v-model="product.descricao" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-paste fa-fw ico ico2"></i>
              <span class="letras cat">CATEGORIA</span>
              <el-select v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id"></el-option>
              </el-select>
              <el-button @click="salvar" class="botao">SALVAR</el-button>
              <el-button  @click="getPesquisar" class="botao">CANCELAR</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-if="editar" >
        <el-row>
           <el-col :span="24" class="titulo titulo2">
            <span class="letras2">EDITAR PRODUTOS</span>
          </el-col>
        </el-row>
        <el-row class="lin1" :gutter="15">
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-box fa-fw ico"></i>
              <span class="letras nome">NOME</span>
              <el-input placeholder="Nome do produto" v-model="product.nome" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-hand-holding-usd fa-fw ico"></i>
              <span class="letras preco2">PREÇO</span>
              <el-input-number size="small" v-model="product.preco" controls-position="right" :step="0.05" :min="0"></el-input-number>
              <i class="fas fa-th-large fa-fw ico qtd"></i>
              <span class="letras">QTD</span>  
              <el-input-number size="small" v-model="product.quantidade" controls-position="right" :step="1" :min="1"></el-input-number>
            </div>
          </el-col>
        </el-row>
        <el-row class="lin2" :gutter="15" >
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-pen-alt fa-fw ico"></i>
              <span class="letras">DESCRIÇÃO</span>
              <el-input placeholder="Descrição do produto" v-model="product.descricao" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-paste fa-fw ico ico2"></i>
              <span class="letras cat">CATEGORIA</span>
              <el-select v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id"></el-option>
              </el-select>
              <el-upload  class="upload-demo espaco" :action="sfoto" :limit="1"  :on-exceed="handleExceed" :file-list="fileList"  :on-preview="handlePreview">
                <el-button class="bavatar"> <i class="fas fa-image fa-fw"></i> FOTO</el-button> 
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <el-row >
          <div class="botoesedit">
            <el-button  @click="salvaredit" class="botao b2">SALVAR</el-button>
            <el-button  @click="getPesquisar" class="botao b2">CANCELAR</el-button>
          </div>
        </el-row>
      </div>
      <div v-if="excluir" >
        <el-row>
           <el-col :span="24" class="titulo titulo3">
            <span class="letras2">EXCLUIR PRODUTOS</span>
          </el-col>
        </el-row>
        <el-row class="lin1" :gutter="15">
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-box fa-fw ico"></i>
              <span class="letras nome">NOME</span>
              <el-input placeholder="Nome do produto" v-model="product.nome" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-hand-holding-usd fa-fw ico"></i>
              <span class="letras preco2">PREÇO</span>
              <el-input-number size="small" v-model="product.preco" controls-position="right" :step="0.05" :min="0"></el-input-number>
              <i class="fas fa-th-large fa-fw ico qtd"></i>
              <span class="letras">QTD</span>  
              <el-input-number size="small" v-model="product.quantidade" controls-position="right" :step="1" :min="1"></el-input-number>
            </div>
          </el-col>
        </el-row>
        <el-row class="lin2" :gutter="15" >
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-pen-alt fa-fw ico"></i>
              <span class="letras">DESCRIÇÃO</span>
              <el-input placeholder="Descrição do produto" v-model="product.descricao" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-paste fa-fw ico ico2"></i>
              <span class="letras cat">CATEGORIA</span>
              <el-select v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id"></el-option>
              </el-select>
              <el-upload  class="upload-demo espaco" :action="sfoto" :limit="1"  :on-exceed="handleExceed" :file-list="fileList"  :on-preview="handlePreview">
                <el-button class="bavatar b3"> <i class="fas fa-image fa-fw"></i> FOTO</el-button> 
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <el-row >
          <div class="botoesedit">
            <el-button  @click="salvaredit" class="botao b3">EXCLUIR</el-button>
            <el-button  @click="getPesquisar" class="botao b3">CANCELAR</el-button>
          </div>
        </el-row>
      </div>
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
            <el-table-column prop="nome" label="NOME" width="170"></el-table-column>
            <el-table-column prop="descricao" label="DESCRIÇÃO" ></el-table-column>
            <el-table-column prop="preco" label="PREÇO" width="130"></el-table-column>
            <el-table-column prop="quantidade" label="QUANTIDADE" width="130"></el-table-column>
            <el-table-column label="AÇÕES" width="245">
              <template slot-scope="scope">
                <div class="acoes">
                  <el-button @click="getEditar(scope.row)" class="botao b2">EDITAR</el-button>
                  <el-button @click="getExcluir(scope.row)" class="botao b3">EXCLUIR</el-button>
                </div>
              </template>
            </el-table-column>
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
      cadastrar: false,
      pesquisar: true,
      editar: false,
      excluir: false

    };
  },


  methods: {

    getExcluir(row) {
      this.product = {
        nome: row.nome,
        preco: row.preco,
        quantidade: row.quantidade,
        descricao: row.descricao,
      }
      this.value = row.category_id;
      this.cadastrar = false;
      this.pesquisar = false;
      this.excluir = true;
      this.editar = false;
    },

    getCadastrar() {
      this.cadastrar = true;
      this.pesquisar = false;
      this.limpar();
    },

    getPesquisar(){
      this.cadastrar = false;
      this.pesquisar = true;
      this.editar = false;
      this.excluir = false;
    },

    getEditar(row) {
      this.product = {
        nome: row.nome,
        preco: row.preco,
        quantidade: row.quantidade,
        descricao: row.descricao,
      }
      this.value = row.category_id;
      this.editar = true;
      this.pesquisar = false;
      this.cadastrar = false;
      this.excluir = false;
    },

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
        this.vercadastro()
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

.linhaflex {
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
  background-color: #F4CB68;
  color: white;
  border: none;
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

.b1 {
  background-color: #69F690;
}

.b2 {
  background-color: #F4CB68;
}

.b3 {
  background-color: #FFA882;
}

.cat {
  margin-right: 15px;
}

.qtd {
  margin-left: 20px;
}

.preco {
  margin-right: 51px;
}

.preco2 {
  margin-right: 58px;
}

.titulo {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  border-radius: 5px;
  height: 50px;
  align-items: center;
  background-color: #82D4D1;
  border-radius: 5px;
}

.titulo2 {
  background-color: #F4CB68;
}

.titulo3 {
  background-color: #FFA882;
}

.pesquisar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.ico3 {
  margin-left: 8px;
}


.acoes {
  display: flex;
}

.botoesedit {
  display: flex;
  justify-content: flex-end;
}

</style>