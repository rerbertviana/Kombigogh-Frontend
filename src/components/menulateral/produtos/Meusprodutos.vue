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
              <input style="display:none" type="file" @change="onFileSelected" ref="fileInput"/>
              <el-button class="bavatar b4" @click="$refs.fileInput.click()"><i class="fas fa-image fa-fw"></i> FOTO</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row >
          <div class="botoesedit">
            <el-button  @click="salvar" class="botao b4">SALVAR</el-button>
            <el-button  @click="cancelar" class="botao b4">CANCELAR</el-button>
          </div>
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
              <span class="letras preco">PREÇO</span>
              <el-input-number size="small" v-model="product.preco" controls-position="right" :step="0.05" :min="0"></el-input-number>
              <i class="fas fa-th-large fa-fw ico qtd"></i>
              <span class="letras">QTD</span>  
              <el-input-number size="small" v-model="product.quantidade" controls-position="right" :step="1" :min="0"></el-input-number>
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
              <input style="display:none" type="file" @change="onFileSelected" ref="fileInput"/>
              <el-button class="bavatar b2" @click="$refs.fileInput.click()"><i class="fas fa-image fa-fw"></i> FOTO</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row >
          <div class="botoesedit">
            <el-button  @click="ativarProduto" v-if="!product.ativo" class="botao b2">ATIVAR</el-button>
            <el-button  @click="salvarEditar" class="botao b2">SALVAR</el-button>
            <el-button  @click="cancelar" class="botao b2">CANCELAR</el-button>
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
              <el-input disabled placeholder="Nome do produto" v-model="product.nome" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-hand-holding-usd fa-fw ico"></i>
              <span class="letras preco">PREÇO</span>
              <el-input-number disabled size="small" v-model="product.preco" controls-position="right" :step="0.05" :min="0"></el-input-number>
              <i class="fas fa-th-large fa-fw ico qtd"></i>
              <span class="letras">QTD</span>  
              <el-input-number disabled size="small" v-model="product.quantidade" controls-position="right" :step="1" :min="1"></el-input-number>
            </div>
          </el-col>
        </el-row>
        <el-row class="lin2" :gutter="15" >
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-pen-alt fa-fw ico"></i>
              <span class="letras">DESCRIÇÃO</span>
              <el-input disabled placeholder="Descrição do produto" v-model="product.descricao" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-paste fa-fw ico ico2"></i>
              <span class="letras cat">CATEGORIA</span>
              <el-select disabled v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id"></el-option>
              </el-select>
              <el-button class="bavatar b3" disabled> <i class="fas fa-image fa-fw"></i> FOTO</el-button> 
            </div>
          </el-col>
        </el-row>
        <el-row >
          <div class="botoesedit">
            <el-button @click="desativarProduto" class="botao b3">DESATIVAR</el-button>
            <el-button @click="cancelar" class="botao b3">CANCELAR</el-button>
          </div>
        </el-row>
      </div>
    </div>
    <el-select class="pag" v-model="value3" filterable placeholder="N° ITENS POR PÁGINA" clearable no-match-text="Não encontrado">
        <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-row class="tabela">
      <el-table :data="myproductslist.filter(data => !search || data.nome.toLowerCase().includes(search.toLowerCase()) || data.descricao.toLowerCase().includes(search.toLowerCase()))" border stripe empty-text="Sem resultados">
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
        <el-table-column label="STATUS" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.ativo == true ? 'ATIVO' : 'INATIVO'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="AÇÕES" width="245">
          <template slot-scope="scope">
            <div class="acoes">
              <el-button @click="getEditar(scope.row)" class="botao b2">EDITAR</el-button>
              <el-button @click="getExcluir(scope.row)" class="botao b3">EXCLUIR</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <v-pagination color="#82D4D1" class="paginacao" v-model="pageVender" :length="pages5"></v-pagination>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiurl } from "@/global";
import { mapState } from 'vuex'


export default {
  name: "produtos",
  computed: mapState(['pages5', 'myproductslist']),

  data() {
    return {
      fileList: [],
      products: [],
      product:{},
      options: [],
      options2: [],
      search: "",
      value: "",
      value3: '',
      input: "",
      input2: "",
      pageVender: 1,
      cadastrar: false,
      pesquisar: true,
      editar: false,
      excluir: false,
      selectedFile: null,
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
    value3() {
      this.setFiltro()
    },
    pageVender() {
      this.$store.commit('getMyProductList', this.pageVender);
    }
  },

  methods: {

    setFiltro() {
      if(this.value3 == '') {
        this.$store.commit('setFiltro', 5)
        this.getMyproducts()
      } else {
        this.$store.commit('setFiltro', this.value3)
        this.getMyproducts()
      }
    },

    getExcluir(row) {
      this.product = {
        id: row.id,
        nome: row.nome,
        preco: row.preco,
        quantidade: row.quantidade,
        descricao: row.descricao,
        ativo: row.ativo
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
      this.search = '';
      this.limpar();
    },

    cancelar() {
      this.cadastrar = false;
      this.pesquisar = true;
      this.editar = false;
      this.excluir = false;

      this.$message({
        showClose: true,
        message:'Operação cancelada.',
        type: 'info'
      });
    },

    getPesquisar(){
      this.cadastrar = false;
      this.pesquisar = true;
      this.editar = false;
      this.excluir = false;
    },

    getEditar(row) {
      this.product = {
        id: row.id,
        nome: row.nome,
        preco: row.preco,
        quantidade: row.quantidade,
        descricao: row.descricao,
        ativo: row.ativo
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

    async getMyproducts() {
      await axios
        .get(`${baseApiurl}/usersproducts`)
        .then((res) => (this.products = res.data.product));

      this.$store.commit('getMyProducts', this.products);
      if(this.pages5 < this.pageVender) {
        this.pageVender = 1
      }
      this.$store.commit('getMyProductList', this.pageVender);
    },

    getImagem(row) {
      if(!row.imagem) {
        return `http://localhost:3333/files/default.jpg`
      }
      return `http://localhost:3333/files/${row.imagem}`
    }, 

    limpar() {
      this.product = {};
      this.value = '';  
    },
    
    naonumero() {
      this.$message({
        showClose: true,
        message:'Oops, "preço" precisa ser um valor numérico.  ',
        type: 'error',
      });
    },

    naointeiro() {
      this.$message({
        showClose: true,
        message:'Oops, "QTD" precisa ser um valor inteiro.  ',
        type: 'error',
      });
    },

    campovazio() {
      this.$message({
        showClose: true,
        message:'Oops, existem campos vazios.  ',
        type: 'error',
      });
    },
    
    nomerepetido() {
      this.$message({
        showClose: true,
        message:'Oops, já existe produto com esse nome.  ',
        type: 'error',
      });
    },

    sucesso() {
      this.$message({
        showClose: true,
        message:'Salvo com sucesso!  ',
        type: 'success',
      });
    },

    verificar() {
     
      if(!this.product.nome || !this.product.preco || !this.product.descricao || !this.value) {
        this.campovazio();
        return false;
      }
      if(!Number.isInteger(this.product.quantidade)) {
        this.naointeiro();
        return false;
      }
      if(Number.isNaN(this.product.preco)){
        this.naonumero();
        return false;
      }
      return true;
    },

    reload() {
      document.location.reload(true);
    },

    salvar() {
      if (this.verificar()) {
        axios.post(`${baseApiurl}/products/${this.value}`, this.product)
        .then((res) => {
          this.product = res.data
          this.onUpload()
          this.limpar()
          this.getPesquisar()
          this.sucesso()
        })
        .catch(() => {
          this.nomerepetido();
        })
      }
    },

    salvarEditar() {
       this.product2 = {
        nome: this.product.nome,
        descricao: this.product.descricao,
        preco: this.product.preco,
        quantidade: this.product.quantidade
      }
      if (this.verificar()) {
        this.onUpload();
        axios.put(`${baseApiurl}/productsprofile/${this.product.id}/${this.value}`, this.product2)
        .then(() => {
          this.limpar()
          this.getPesquisar()
          this.sucesso()
        })
        .catch(() => {
          this.nomerepetido();
        })
      }
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },

    async onUpload() {
      if (this.selectedFile) {
        const fd = new FormData();
        fd.append('imagem', this.selectedFile)
        await axios.patch(`${baseApiurl}/products/avatar/${this.product.id}`, 
        fd, {
          headers: {
          'Content-Type': 'multipart/form-data'
          }
        })
      }
      this.selectedFile = null;
    },

    isDisable() {
      this.$message({
        showClose: true,
        message:'Produto já está inativo.',
        type: 'info',
      });
    },

    desativarProduto() {
      if(this.product.ativo === false) {
        this.isDisable()
      }
      else {
        return axios.post(`${baseApiurl}/products/disable/${this.product.id}`)
        .then(() => {
          this.limpar()
          this.getPesquisar()
          this.sucesso()
        })
      }
    },

    ativarProduto() {
      return axios.post(`${baseApiurl}/products/active/${this.product.id}`)
      .then(() => {
          this.limpar()
          this.getPesquisar()
          this.sucesso()
        })
    },

  },

  mounted() {
    this.getCategories();
    this.setFiltro();
  },

  updated() {
    this.getMyproducts()
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
  margin-left: 10px;
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

.b4 {
  background-color: #82D4D1;
}

.cat {
  margin-right: 15px;
}

.qtd {
  margin-left: 20px;
}

.preco {
  margin-right: 57px;
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

.paginacao {
  margin-top: 15px;
}

.pag {
  margin-top: 15px;
  margin-bottom: 15px;
  width: 210px;
}

.form2 {
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;

  border-radius: 10px;
  box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
}

</style>