<template> 
<div class="meuperfil">
    <!-- add forma de pagamento em vendas 
    colocar visible meu perfil na store -->
  <div class="content">
    <div class="avatar">
      <div class="end">
        <v-avatar rounded size="310">
          <v-img :src="getImagem()" />
        </v-avatar>
      </div>
      <div class="end">
        <el-button @click="getEditar" class="botao2 cor1 mt"><i class="fas fa-image fa-fw espaco"/>FOTO</el-button>
        <el-button @click="getEditar" class="botao2 cor1 mt"><i class="fas fa-upload espaco"></i>UPLOAD</el-button>
      </div>
    </div>
    <div class="info">
      <el-row class="titulo">MEU PERFIL</el-row>
      <el-row class="linha1" >
        <i class="fas fa-user-alt fa-fw ico"></i>
        <span class="letras nome">NOME</span>
        <el-input placeholder="Nome do artista" v-model="user.nome" :disabled="edit" clearable></el-input>
      </el-row>
      <el-row class="linha2" >
        <i class="fas fa-envelope-open-text fa-fw ico"></i>
        <span class="letras email">EMAIL</span>
        <el-input placeholder="Nome do artista" v-model="user.email" :disabled="edit" clearable></el-input>
      </el-row>
      <el-row class="linha2" >
        <i class="fas fas fa-phone-square fa-fw ico"></i>
        <span class="letras">TELEFONE</span>
        <el-input placeholder="Nome do artista" v-model="user.telefone" :disabled="edit" clearable></el-input>
      </el-row>
      <el-row class="linha2" >
        <i class="fas fa-key fa-fw ico"></i>
        <span class="letras senha">SENHA</span>
        <el-input placeholder="Nova senha" v-model="user.senha" :disabled="edit" class="espaco" clearable></el-input>
        <el-input placeholder="Confirmação da senha" v-model="user.senha2" :disabled="edit" clearable></el-input>
      </el-row>
      <!-- <el-row class="linha2" >
        <el-col :span ="12">
          <i class="fas fa-camera-retro fa-fw ico"></i>
          <span class="letras">AVATAR</span>
        </el-col>
        <el-col :span ="12" class="end">
          <el-button @click="getEditar" class="botao cor1">FOTO</el-button>
          <el-button @click="getSalvar" class="botao cor2">UPLOAD</el-button>
        </el-col>
      </el-row> -->
      <el-row class="beditar">
        <el-button @click="getEditar" class="botao cor1">ALTERAR</el-button>
        <el-button @click="getSalvar" class="botao cor2" :disabled="edit">SALVAR</el-button>
      </el-row>
    </div>
  </div>
</div>
  
</template>

<script>

import axios from 'axios'
import { baseApiurl } from '@/global'

export default {
  name: "Minhasvendas",
  data() {
    return {
      user: {},
      user2: {},
      edit: true,
    };
},

  
  methods: {

    getUser() {
      return axios.get(`${baseApiurl}/profile`).then(res => this.user = res.data);
    },

    getImagem() {
      if(!this.user.avatar) {
          return `http://localhost:3333/files/default2.png`
      }
        return `http://localhost:3333/files/${this.user.avatar}`
    },

    getEditar() {
      this.edit = false
    },

    nomerepetido() {
      this.$message({
        showClose: true,
        message:'Nome ou e-mail existente.',
        type: 'error',
      });
    },

    sucesso() {
      this.$message({
        showClose: true,
        message:'Salvo com sucesso!  ',
        type: 'success',
      });
      this.getUser();
    },

    naointeiro() {
      this.$message({
        showClose: true,
        message:'"telefone" precisa ser um valor inteiro',
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

    semconfirmacao() {
      this.$message({
        showClose: true,
        message:'Por favor, digite a confirmação da senha.',
        type: 'error',
      });
    },

    semsenha() {
      this.$message({
        showClose: true,
        message:'Por favor, digite a nova senha.',
        type: 'error',
      });
    },

    naoconfere() {
      this.$message({
        showClose: true,
        message:'As senhas não conferem.',
        type: 'error',
      });
    },

    verificar() {
     
      if(!this.user.nome || !this.user.email || !this.user.telefone) {
        this.campovazio();
        return false;
      }
      if(this.user.telefone % 1 !== 0) {
        this.naointeiro();
        return false;
      }
      if(!this.user.senha && !this.user.senha2) {
        this.user2 = {
          nome: this.user.nome,
          email: this.user.email,
          telefone: this.user.telefone
        }
      }
      if(this.user.senha && !this.user.senha2) {
        this.semconfirmacao();
        return false;
      }
      if(!this.user.senha && this.user.senha2) {
        this.semsenha();
        return false;
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
            senha: this.user.senha,
            confirmacao_senha: this.user.senha2
          }
        }
        
      }
      return true;
    },

    salvar() {

      if (this.verificar()) {
        axios.put(`${baseApiurl}/profile/`, this.user2)
        .then(() => {
          this.sucesso()
          this.edit = true
        })
        .catch(() => {
          this.nomerepetido();
        })
      }
    },

    getSalvar() {
      this.salvar()
    }
  },

  mounted() {
    this.getUser();
  },

};
</script>

<style scoped>

    .meuperfil {
        margin: 15px;
        padding: 50px;
        background-color: white;
        box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
        border-radius: 5px; 
    }

    .avatar {
      grid-area: avatar;
      background-color: white;
    }

    .info {
      grid-area: info;
      background-color: white;
    }

    .content {
      padding: 20px;
      display: grid;
      grid-template-columns: 310px 1fr;
      grid-template-rows: 360px;
      grid-template-areas: "avatar info";
      box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
      background: white;
      border-radius: 5px;
      gap: 10px;
    }

    .linha1 {
      display: flex;
      align-items: center;
      padding: 20px;
      padding-right: 0px;
    }

    .linha2 {
      display: flex;
      align-items: center;
      padding-left: 20px;
      padding-bottom: 25px;
    }

    .ico {
      margin-right: 15px;
      color: black;
      font-size: 1.2rem;
    }

    .letras {
      margin-right: 15px;
      font-size: 17px;
      color: black;
    }

    .end {
      display: flex;
      justify-content: flex-end;
    }

    .titulo {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 1.2rem;
      height: 40px;
      background-color: #82D4D1;
      border-radius: 5px 5px 0px 0px;
    }

    .nome {
      margin-right: 53px;
    }

    .email {
      margin-right: 52px;
    }

    .senha {
      margin-right: 45px;
    }

    .beditar {
      display: flex;
      justify-content: flex-end;
    }

    .botao {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      height: 40px;
      width: 100px;
      border: 0px;
    }

    .botao2 {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      height: 40px;
      width: 200px;
      border: 0px;
    }

    .cor1 {
      background-color: #82D4D1;
    }

    .cor2 {
      background-color: #69F690;
    }

    .espaco {
      margin-right: 10px;
    }
    

    .mt {
      margin-top: 10px;
    }




</style>