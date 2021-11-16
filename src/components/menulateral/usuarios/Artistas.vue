<template>
  <div class="meusprodutos">
    <div class="form">
        <el-row v-if="pesquisar"> 
          <el-col :span="24" class="pesquisar">
            <i class="fas fa-paint-brush fa-fw ico"></i>
            <span class="letras"> ARTISTAS </span>
            <el-input placeholder="Nome ou descrição produto" v-model="search" size="large">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button @click="getCadastrar" class="botao">NOVO</el-button>
          </el-col>
        </el-row>
      <div v-if="cadastrar">
        <el-row>
          <el-col :span="24" class="titulo">
            <span class="letras2">CADASTRAR ARTISTA</span>
          </el-col>
        </el-row>
        <el-row class="lin1" :gutter="15">
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-user-alt fa-fw ico"></i>
              <span class="letras nome">NOME</span>
              <el-input placeholder="Nome do artista" v-model="user.nome" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-envelope-open-text fa-fw ico"></i>
              <span class="letras email">EMAIL</span>
              <el-input placeholder="Informe seu e-mail" v-model="user.email" clearable></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="lin2" :gutter="15" >
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-key fa-fw ico"></i>
              <span class="letras">SENHA</span>
              <el-input type="password" placeholder="Senha" class="espaco" v-model="user.senha" clearable></el-input>
              <el-input type="password" placeholder="Confirmação" v-model="user.senha2" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-phone-square fa-fw ico"></i>
              <span class="letras">TELEFONE</span>
              <el-input v-mask="'(##) #####-####'" v-model="user.telefone" placeholder="(  ) xxxxx-xxxx" clearable></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row >
          <div class="botoesedit">
            <el-button  @click="salvar" class="botao b4">SALVAR</el-button>
            <el-button  @click="getPesquisar" class="botao b4">CANCELAR</el-button>
          </div>
        </el-row>
      </div>
      <div v-if="editar" >
        <el-row>
           <el-col :span="24" class="titulo titulo2">
            <span class="letras2">EDITAR ARTISTA</span>
          </el-col>
        </el-row>
        <el-row class="lin1" :gutter="15">
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-user-alt fa-fw ico"></i>
              <span class="letras nome">NOME</span>
              <el-input placeholder="Nome do artista" v-model="user.nome" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-envelope-open-text fa-fw ico"></i>
              <span class="letras email">EMAIL</span>
              <el-input placeholder="Informe seu e-mail" v-model="user.email" clearable></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="lin2" :gutter="15" >
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-key fa-fw ico"></i>
              <span class="letras">SENHA</span>
              <el-input type="password" placeholder="Senha" class="espaco" v-model="user.senha" clearable></el-input>
              <el-input type="password" placeholder="Confirmação" v-model="user.senha2" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-phone-square fa-fw ico"></i>
              <span class="letras">TELEFONE</span>
              <el-input v-mask="'(##) #####-####'" v-model="user.telefone" placeholder="(  ) xxxxx-xxxx" clearable></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row >
          <div class="botoesedit">
            <el-button  @click="salvarEditar" class="botao b2">SALVAR</el-button>
            <el-button  @click="getPesquisar" class="botao b2">CANCELAR</el-button>
          </div>
        </el-row>
      </div>
      <div v-if="excluir" >
        <el-row>
           <el-col :span="24" class="titulo titulo3">
            <span class="letras2">EXCLUIR ARTISTA</span>
          </el-col>
        </el-row>
        <el-row class="lin1" :gutter="15">
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-user-alt fa-fw ico"></i>
              <span class="letras nome">NOME</span>
              <el-input placeholder="Nome do artista" disabled v-model="user.nome" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-envelope-open-text fa-fw ico"></i>
              <span class="letras email">EMAIL</span>
              <el-input placeholder="Informe seu e-mail" disabled v-model="user.email" clearable></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="lin2" :gutter="15" >
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-key fa-fw ico"></i>
              <span class="letras">SENHA</span>
              <el-input type="password" disabled placeholder="Senha" class="espaco" v-model="user.senha" clearable></el-input>
              <el-input type="password" disabled placeholder="Confirmação" v-model="user.senha2" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="linhaflex">
              <i class="fas fa-phone-square fa-fw ico"></i>
              <span class="letras">TELEFONE</span>
              <el-input v-model="user.telefone" disabled placeholder="(  ) xxxxx-xxxx" clearable></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row >
          <div class="botoesedit">
            <el-button  type="text" @click="open" class="botao b3">EXCLUIR</el-button>
            <el-button  class="botao b3">DESATIVAR</el-button>
            <el-button  @click="getPesquisar" class="botao b3">CANCELAR</el-button>
          </div>
        </el-row>
      </div>
    </div>
    <el-row class="tabela">
       <div>
          <el-table :data="users.filter(data => !search || data.nome.toLowerCase().includes(search.toLowerCase()) || data.email.toLowerCase().includes(search.toLowerCase()))" border stripe empty-text="Sem resultados">
            <el-table-column width="95">
              <template slot-scope="scope">
                <v-avatar size="70" rounded>
                  <v-img :src= "getImagem(scope.row)"/>
                </v-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="nome" label="NOME" width="170"></el-table-column>
            <el-table-column prop="email" label="EMAIL" ></el-table-column>
            <el-table-column prop="telefone" label="TELEFONE"></el-table-column>
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
      users: [],
      user: {},
      user2: {},
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
      excluir: false,
      selectedFile: null,

    };
  },


  methods: {

    getExcluir(row) {
      this.user = {
        id: row.id,
        nome: row.nome,
        email: row.email,
        telefone: row.telefone,
        avatar: row.avatar,
      }
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
      this.user = {
        id: row.id,
        nome: row.nome,
        email: row.email,
        avatar: row.avatar,
      }
      this.editar = true;
      this.pesquisar = false;
      this.cadastrar = false;
      this.excluir = false;
    },


    getUsers() {
      return axios.get(`${baseApiurl}/users`).then(res => this.users = res.data);
    },

    getImagem(row) {
      if(!row.avatar) {
        return `http://localhost:3333/files/default2.png`
      }
      return `http://localhost:3333/files/${row.avatar}`
    }, 

    limpar() {
      this.user = {};
    },

    email() {
      this.$message({
        showClose: true,
        message:'Oops, email incorreto.  ',
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

    naoconfere() {
      this.$message({
        showClose: true,
        message:'As senhas não correspondem.',
        type: 'error',
      });
    },

    nomerepetido() {
      this.$message({
        showClose: true,
        message:'Nome ou e-mail existente.',
        type: 'error',
      });
    },

    telefone() {
      this.$message({
        showClose: true,
        message:'Oops, telefone incompleto.',
        type: 'error',
      });
    },

    excluirSucesso() {
      this.$message({
        showClose: true,
        message:'Excluido com sucesso!  ',
        type: 'success',
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
     
      if(!this.user.nome || !this.user.email || !this.user.telefone || !this.user.senha || !this.user.senha2) {
        this.campovazio();
        return false;
      }
      if(this.user.email.indexOf("@") == -1) {
        this.email()
        return false;
      }
      if(this.user.telefone.length != 15) {
        this.telefone()
        return false
      }
      if(this.user.senha && this.user.senha2) {

        if(this.user.senha !== this.user.senha2) {
          this.naoconfere();
          return false;
        }
        else {
          this.user2 = {
            nome: this.user.nome,
            email: this.user.email,
            telefone: this.user.telefone,
            senha: this.user.senha
          }
        }  
      }
      return true;
    },

    salvar() {
      if (this.verificar()) {
        axios.post(`${baseApiurl}/users`, this.user2)
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

    deletarArtista() {
      axios.delete(`${baseApiurl}/users/${this.user.id}`)
    },

    salvarEditar() {
      if (this.verificar()) {
        this.user2 = {
          nome: this.user.nome,
          email: this.user.email,
          senha: this.user.senha,
          confirmacao_senha: this.user.senha2,
          telefone: this.user.telefone,
        }
        axios.put(`${baseApiurl}/users/${this.user.id}`, this.user2)
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

    open() {
      this.$confirm('Tem certeza que deseja excluir esse artista?', 'ATENÇÃO!', {
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCELAR',
        type: 'warning'
      }).then(() => {
        this.deletarArtista()
        this.getPesquisar()
        this.excluirSucesso()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        });          
      });
    }

  },

  mounted() {
   this.getUsers();
  },

  updated() {
    this.getUsers();
  }
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
  margin-right: 22px;
}

.espaco {
  margin-right: 10px;
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

.qtd {
  margin-left: 20px;
}

.email {
  margin-right: 50px;
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

.acoes {
  display: flex;
}

.botoesedit {
  display: flex;
  justify-content: flex-end;
}

</style>