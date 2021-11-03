<template>
  <div class="mv">
    <div class="form">
        <el-row class="titulo cor1">PEDIDOS</el-row>
        <el-row class="lin1" :gutter="10">
            <el-col :span="24">
                <div class="l1c1">
                    <span >FILTROS:</span>
                    <i class="fas fa-paint-brush fa-fw ico"></i>
                    <span class="letras">ARTISTA</span>
                    <el-select v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                        <el-option v-for="option in options2" :key="option.id" :label="option.nome" :value="option.id">
                        </el-option>
                    </el-select>
                    <i class="fas fa-paste fa-fw ico"></i>
                    <span class="letras">CATEGORIA</span>
                    <el-select v-model="value2" filterable placeholder="Selecione" clearable class="espaco" no-match-text="Não encontrado" select="getFilter">
                        <el-option v-for="option in options" :key="option.id" :label="option.nome" :value="option.id">
                        </el-option>
                    </el-select>
                    <el-button class="botao cor1"> <a :href="`${baseApiurl}/pdfproducts`"> GERAR </a> </el-button>
                </div>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import { baseApiurl } from "@/global";

export default {
  name: "Minhasvendas",
  data() {
    return {
      value: '',
      value2: '',
      options: [],
      options2: []
    };
  },

  
  methods: {
    
    getCategories() {
        return axios.get(`${baseApiurl}/categories`).then(res => this.options = res.data);
    },

    getUsers() {
        return axios.get(`${baseApiurl}/users`).then(res => this.options2 = res.data);
    },
    
  },

  mounted() {

    this.getCategories()
    this.getUsers()
  },
};
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

.mv {
  margin-top: 50px;
  margin-right: 60px;
  margin-left: 60px;
  margin-bottom: 60px;
}

.lin1 {
  margin-bottom: 20px;
}

.l1c1 {
  display: flex;
  align-items: center;
}

.titulo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    border-radius: 5px;
    height: 40px;
    color: white;
}

.cor1 {
    background-color: #82D4D1;
}

.cor2 {
    background-color: #69F690;
}

.ico {
    margin-left: 15px;
    margin-right: 15px;
    color: black;
    font-size: 1.2rem;
}

.filtros {
    padding: 8px;
    display: flex;
    align-items: center;
    height: 40px;
    border-radius: 5px;
    color: white;
}

.letras {
    margin-right: 15px;
}

.botao {
    margin-left: 15px;
    width: 100px;
    height: 40px;
    color: white;
}


</style>