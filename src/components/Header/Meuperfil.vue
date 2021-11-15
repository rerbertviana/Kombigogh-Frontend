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
        <input style="display:none" type="file" @change="onFileSelected" ref="fileInput"/>
        <el-button @click="$refs.fileInput.click()" class="botao2 cor1 mt"><i class="fas fa-image fa-fw espaco"/>FOTO</el-button>
        <el-button @click="onUpload" class="botao2 cor1 mt"><i class="fas fa-upload espaco"></i>ATUALIZAR</el-button>
      </div>
    </div>
    <div class="info">
      <el-row class="titulo">MEU PERFIL</el-row>
      <el-row class="linha1" >
        <i class="fas fa-user-alt fa-fw ico"></i>
        <span class="letras nome">NOME</span>
        <el-input placeholder="Digite seu nome" v-model="user.nome" :disabled="edit" clearable></el-input>
      </el-row>
      <el-row class="linha2" >
        <i class="fas fa-envelope-open-text fa-fw ico"></i>
        <span class="letras email">EMAIL</span>
        <el-input placeholder="Informe seu e-mail" v-model="user.email" :disabled="edit" clearable></el-input>
      </el-row>
      <el-row class="linha2" >
        <i class="fas fas fa-phone-square fa-fw ico"></i>
        <span class="letras">TELEFONE</span>
        <el-input v-mask="'(##) #####-####'" placeholder="(  ) xxxxx-xxxx" v-model="user.telefone" :disabled="edit" clearable></el-input>
      </el-row>
      <el-row class="linha2" >
        <i class="fas fa-key fa-fw ico"></i>
        <span class="letras senha">SENHA</span>
        <el-input placeholder="Nova senha" v-model="user.senha" :disabled="edit" class="espaco" type="password" clearable></el-input>
        <el-input placeholder="Confirmação da senha" v-model="user.senha2" :disabled="edit" type="password" clearable></el-input>
      </el-row>
      <el-row>
        <el-col class="beditar" :span="24">
          <el-button @click="getEditar" class="botao cor1" v-if="edit">EDITAR</el-button>
          <el-button @click="getCancelar" class="botao cor3" v-if="!edit">CANCELAR</el-button>
          <el-button @click="getSalvar" class="botao cor2" v-if="!edit">SALVAR</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</div>
  
</template>

<script>

import axios from 'axios'
import { baseApiurl } from '@/global'
import { mapState } from 'vuex'

export default {
  name: "Minhasvendas",
  computed: mapState(['perfilVisible']),

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

    visible() {
      if (this.perfilVisible == true)
      this.$store.commit('togglePerfil')
    },

    getEditar() {
      this.edit = false
    },

    getTelefone(telefone) {
      const arr = telefone.split('')
      arr.splice(0, 0, '(')
      arr.splice(3, 0, ')')
      arr.join('')

      this.user.telefone = arr;
    },

    getCancelar() {
      this.edit = true;
      this.getUser();
      this.cancelaredit();
    },

    nomerepetido() {
      this.$message({
        showClose: true,
        message:'Nome ou e-mail existente.',
        type: 'error',
      });
    },

    cancelaredit() {
      this.$message({
        showClose: true,
        message:'Operação cancelada.',
        type: 'info'
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

    campovazio() {
      this.$message({
        showClose: true,
        message:'Oops, existem campos vazios.  ',
        type: 'error',
      });
    },

    email() {
      this.$message({
        showClose: true,
        message:'Oops, email incorreto.  ',
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

    avatar() {
      this.$message({
        showClose: true,
        message:'Selecione uma imagem.',
        type: 'warning',
      });
    },

    verificar() {
     
      if(!this.user.nome || !this.user.email || !this.user.telefone) {
        this.campovazio();
        return false;
      }
      if(this.user.email.indexOf("@") == -1) {
        this.email()
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
        this.naoconfere();
        return false;
      }
      if(!this.user.senha && this.user.senha2) {
        this.naoconfere();
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
          document.location.reload(true);
        })
        .catch(() => {
          this.nomerepetido();
        })
      }
    },

    getSalvar() {
      this.salvar()
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },

    async onUpload() {
      if (this.selectedFile) {
        const fd = new FormData();
        fd.append('avatar', this.selectedFile)
        await axios.patch(`${baseApiurl}/users/avatar`, 
        fd, {
          headers: {
          'Content-Type': 'multipart/form-data'
          }
        })
        this.sucesso()
        document.location.reload(true);
      }
      else {
        this.avatar()
      }
    },

    
  },

  mounted() {
    this.getUser();
    this.visible();
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
      width: 120px;
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

    .cor3 {
      background-color: #FFA882;
    }

    .espaco {
      margin-right: 10px;
    }

    .mt {
      margin-top: 10px;
    }

</style>