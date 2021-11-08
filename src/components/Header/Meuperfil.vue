<template> 
<div class="meuperfil">
    <!-- add forma de pagamento em vendas 
    colocar visible meu perfil na store -->
  <div class="content">
    <div class="avatar">
        <v-avatar rounded size="290">
          <v-img :src="getImagem()" />
        </v-avatar>
    </div>
    <div class="info">
      <el-row class="titulo">MEU PERFIL</el-row>
      <el-row class="linha1" >
        <i class="fas fa-user-alt fa-fw ico"></i>
        <span class="letras">NOME</span>
        <el-input placeholder="Nome do artista" v-model="user.nome" :disabled="edit" clearable></el-input>
      </el-row>
      <el-row class="linha2" >
        <i class="fas fa-envelope-open-text fa-fw ico"></i>
        <span class="letras">EMAIL</span>
        <el-input placeholder="Nome do artista" v-model="user.email" :disabled="edit" clearable></el-input>
      </el-row>
      <el-row class="linha2" >
        <i class="fas fas fa-phone-square fa-fw ico"></i>
        <span class="letras">TELEFONE</span>
        <el-input placeholder="Nome do artista" v-model="user.telefone" :disabled="edit" clearable></el-input>
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
      edit: true,
    };
},

  
  methods: {

    getUser() {
      return axios.get(`${baseApiurl}/profile`).then(res => this.user = res.data);
    },

    getImagem() {
      if(!this.user.avatar) {
          return `http://localhost:3333/files/default.jpg`
      }
        return `http://localhost:3333/files/${this.user.avatar}`
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
      border-radius: 5px 0px 0px 5px;
    }

    .info {
      grid-area: info;
      background-color: white;
      border-radius: 0px 0px 5px 0px;
    }

    .content {
      display: grid;
      grid-template-columns: 300px 1fr;
      grid-template-rows: 300px;
      grid-template-areas: "avatar info";
      box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
      color: white;
      border-radius: 5px;
    }

    .linha1 {
      display: flex;
      align-items: center;
      padding: 20px;
    }

    .linha2 {
      display: flex;
      align-items: center;
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 20px;
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

    .end2{
      display: flex;
      padding-right: 39px;
      justify-content: flex-end;
    }

    .end3 {
      padding-right: 37px;
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
      border-radius: 0px 5px 0px 0px;
    }


</style>