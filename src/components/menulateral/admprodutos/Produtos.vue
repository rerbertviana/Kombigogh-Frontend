<template>
<div class="produtosadm">
  <div v-if="pesquisar" class="form">
      <el-row class="lin1" :gutter="20">
        <el-col :span="13">
          <div class="alinhar">
            <i class="fas fa-paint-brush fa-fw ico"></i>
            <el-select class="espaco" v-model="value" filterable placeholder="ARTISTAS" clearable no-match-text="Não encontrado">
              <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id">
              </el-option>
            </el-select>
            <i class="fas fa-paste fa-fw ico"></i>
            <el-select v-model="value2" filterable placeholder="CATEGORIA" clearable no-match-text="Não encontrado">
              <el-option v-for="item in options2" :key="item.id" :label="item.nome" :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="alinhar">
            <i class="fas fa-box-open fa-fw ico"></i>
            <span class="letras">PRODUTOS</span>
            <el-input placeholder="Nome do produto" v-model="search" size="large">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button @click="getTodos" class="botaoTodos">TODOS</el-button>
          </div>
        </el-col>
      </el-row>
  </div>
  <div v-if="editar">
    <div class="form">
      <el-row>
        <el-col :span="24" class="titulo cor2">
        <span class="letras2">EDITAR PRODUTOS</span>
      </el-col>
      </el-row>
      <el-row class="linha" :gutter="15">
      <el-col :span="12">
        <div class="alinhar">
          <i class="fas fa-box fa-fw ico"></i>
          <span class="letras nome">NOME</span>
          <el-input placeholder="Nome do produto" v-model="product.nome" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="alinhar">
          <i class="fas fa-hand-holding-usd fa-fw ico"></i>
          <span class="letras preco">PREÇO</span>
          <el-input-number size="small" v-model="product.preco" controls-position="right" :step="0.05" :min="0"></el-input-number>
          <i class="fas fa-th-large fa-fw ico qtd"></i>
          <span class="letras">QTD</span>  
          <el-input-number size="small" v-model="product.quantidade" controls-position="right" :step="1" :min="1"></el-input-number>
        </div>
      </el-col>
      </el-row>
      <el-row class="linha" :gutter="15" >
        <el-col :span="12">
          <div class="alinhar">
            <i class="fas fa-pen-alt fa-fw ico"></i>
            <span class="letras">DESCRIÇÃO</span>
            <el-input placeholder="Descrição do produto" v-model="product.descricao" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="alinhar">
            <i class="fas fa-paste fa-fw ico ico2"></i>
            <span class="letras cat">CATEGORIA</span>
            <el-select v-model="value3" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
              <el-option v-for="item in options2" :key="item.id" :label="item.nome" :value="item.id"></el-option>
            </el-select>
            <input style="display:none" type="file" @change="onFileSelected" ref="fileInput"/>
            <el-button class="bavatar cor2" @click="$refs.fileInput.click()"><i class="fas fa-image fa-fw"></i> FOTO</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row >
        <div class="botoesedit">
          <el-button  @click="ativarProduto" v-if="!product.ativo" class="botao cor2">ATIVAR</el-button>
          <el-button  @click="salvarEditar" class="botao cor2">SALVAR</el-button>
          <el-button  @click="cancelar" class="botao cor2">CANCELAR</el-button>
        </div>
      </el-row>
    </div>
  </div>
  <div v-if="excluir">
    <div class="form">
      <el-row>
        <el-col :span="24" class="titulo cor3">
        <span class="letras2">EXCLUIR PRODUTOS</span>
      </el-col>
      </el-row>
      <el-row class="linha" :gutter="15">
      <el-col :span="12">
        <div class="alinhar">
          <i class="fas fa-box fa-fw ico"></i>
          <span class="letras nome">NOME</span>
          <el-input disabled placeholder="Nome do produto" v-model="product.nome" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="alinhar">
          <i class="fas fa-hand-holding-usd fa-fw ico"></i>
          <span class="letras preco">PREÇO</span>
          <el-input-number disabled size="small" v-model="product.preco" controls-position="right" :step="0.05" :min="0"></el-input-number>
          <i class="fas fa-th-large fa-fw ico qtd"></i>
          <span class="letras">QTD</span>  
          <el-input-number disabled size="small" v-model="product.quantidade" controls-position="right" :step="1" :min="1"></el-input-number>
        </div>
      </el-col>
      </el-row>
      <el-row class="linha" :gutter="15" >
        <el-col :span="12">
          <div class="alinhar">
            <i class="fas fa-pen-alt fa-fw ico"></i>
            <span class="letras">DESCRIÇÃO</span>
            <el-input disabled placeholder="Descrição do produto" v-model="product.descricao" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="alinhar">
            <i class="fas fa-paste fa-fw ico ico2"></i>
            <span class="letras cat">CATEGORIA</span>
            <el-select disabled v-model="value3" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
              <el-option v-for="item in options2" :key="item.id" :label="item.nome" :value="item.id"></el-option>
            </el-select>
            <input disabled style="display:none" type="file" @change="onFileSelected" ref="fileInput"/>
            <el-button disabled class="bavatar cor3" @click="$refs.fileInput.click()"><i class="fas fa-image fa-fw"></i> FOTO</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row >
        <div class="botoesedit">
          <el-button @click="open" class="botao cor3">EXCLUIR</el-button>
          <el-button @click="desativarProduto" v-if="product.ativo" class="botao cor3">DESATIVAR</el-button>
          <el-button @click="cancelar" class="botao cor3">CANCELAR</el-button>
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
            <el-table-column prop="descricao" label="DESCRIÇÃO"></el-table-column>
            <el-table-column prop="preco" label="PREÇO" width="130"></el-table-column>
            <el-table-column prop="quantidade" label="QUANTIDADE" width="130"></el-table-column>
            <el-table-column label="STATUS" width="110">
              <template slot-scope="scope">
                <span>{{scope.row.ativo == true ? 'ATIVO' : 'INATIVO'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="AÇÕES" width="245">
              <template slot-scope="scope">
                <div class="acoes">
                  <el-button @click="getEditar(scope.row)" class="botao cor2">EDITAR</el-button>
                  <el-button @click="getExcluir(scope.row)" class="botao cor3">EXCLUIR</el-button>
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
      products: [],
      options: [],
      options2: [],
      product: {},
      product2: {},
      search: "",
      value: "",
      value2: "",
      value3: "",
      editar: false,
      pesquisar: true,
      selectedFile: null,
      excluir: false,
    };
  },

  watch: {
    value() {
      this.getFilter();
    },
    value2() {
      this.getFilter();
    },
  },

  methods: {

    cancelar() {
      this.pesquisar = true;
      this.editar = false;
      this.excluir = false;

      this.$message({
        showClose: true,
        message:'Operação cancelada.',
        type: 'info'
      });
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
      this.value3 = row.category_id;

      this.editar = true;
      this.pesquisar = false;
      this.excluir = false;
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
      this.value3 = row.category_id;

      this.pesquisar = false;
      this.excluir = true;
      this.editar = false;
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

    getProducts() {
      return axios
        .get(`${baseApiurl}/products`)
        .then((res) => (this.products = res.data));
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

    getProductUserCategory() {
      return axios
        .get(`${baseApiurl}/products/${this.value}/${this.value2}`)
        .then((res) => (this.products = res.data));
    },

    getProductsCategory() {
      return axios
        .get(`${baseApiurl}/categoriesproducts/${this.value2}`)
        .then((res) => (this.products = res.data.product));
    },

    getProductUser() {
      return axios
        .get(`${baseApiurl}/products/${this.value}`)
        .then((res) => (this.products = res.data.product));
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

    limpar() {
      this.product = {};
      this.value3 = '';  
    },

    getPesquisar(){
      this.pesquisar = true;
      this.editar = false;
      this.excluir = false;
    },

    sucesso() {
      this.$message({
        showClose: true,
        message:'Salvo com sucesso!  ',
        type: 'success',
      });
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

    verificar() {
     
      if(!this.product.nome || !this.product.preco || !this.product.quantidade || !this.product.descricao || !this.value3) {
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

    salvarEditar() {
      this.product2 = {
        nome: this.product.nome,
        descricao: this.product.descricao,
        preco: this.product.preco,
        quantidade: this.product.quantidade,
      }
      if (this.verificar()) {
        this.onUpload();
        axios.put(`${baseApiurl}/productsprofile/${this.product.id}/${this.value3}`, this.product2)
        .then(() => {
          this.limpar()
          this.getPesquisar()
          document.location.reload(true);
        })
        .catch(() => {
          this.nomerepetido();
        })
      }
    },

    desativarProduto() {
      return axios.post(`${baseApiurl}/products/disable/${this.product.id}`)
      .then(() => {
          this.limpar()
          this.getPesquisar()
          document.location.reload(true);
        })
    },

    open() {
      this.$confirm('Tem certeza que deseja excluir esse produto?', 'ATENÇÃO!', {
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCELAR',
        type: 'warning'
      }).then(() => {
        this.excluirProduto()
        this.getPesquisar()
        document.location.reload(true);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Operação cancelada.'
        });          
      });
    },

    excluirProduto() {
      axios.delete(`${baseApiurl}/products/${this.product.id}`)
    },

    ativarProduto() {
      return axios.post(`${baseApiurl}/products/active/${this.product.id}`)
      .then(() => {
          this.limpar()
          this.getPesquisar()
          document.location.reload(true);
        })
    },

    
  },

  mounted() {
    this.getProducts()
    this.getUsers()
    this.getCategories()
  },

}

</script>

<style scoped>

.produtosadm {
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

.alinhar {
  display: flex;
  align-items: center;
}

.ico {
  margin-right: 10px;
  color: black;
  font-size: 1.2rem;
}

.espaco {
  margin-right: 10px;
}

.botaoTodos {
  margin-left: 10px;
  background-color: #69f690;
  color: white;
  height: 40px;
  width: 100px;
  border: none;
}

.acoes {
  display: flex;
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

.bavatar {
  margin-left: 10px;
  background-color: #F4CB68;
  color: white;
  border: none;
}

.cor1 {
  background-color: #69F690;
}

.cor2 {
  background-color: #F4CB68;
}

.cor3 {
  background-color: #FFA882;
}

.cor4 {
  background-color: #82D4D1;
}

.linha {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.lin1 {
  margin-bottom: 15px;
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

.nome {
  margin-right: 65px;
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

.botoesedit {
  display: flex;
  justify-content: flex-end;
}
</style>