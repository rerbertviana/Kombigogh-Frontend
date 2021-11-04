<template>  
<div class="mv">
    <div class="form">
        <el-row class="titulo cor">PRODUTOS</el-row>
        <el-row class="linha">
            <el-col :span="10">
                <i class="fas fa-paint-brush fa-fw ico"></i>
                <span class="letras">ARTISTA</span>
                <el-select v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id">
                </el-option>
                </el-select>
            </el-col>
            <el-col :span="10" class="alinhamento">
                <i class="fas fa-paste fa-fw ico"></i>
                <span class="letras">CATEGORIA</span>
                <el-select v-model="value2" filterable placeholder="Selecione" clearable no-match-text="Não encontrado" select="getFilter">
                    <el-option v-for="option in options2" :key="option.id" :label="option.nome" :value="option.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" class="alinhamento">
                <div class="blink cor"><a :href="getPDF()" target="_blank"> GERAR </a></div>
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
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      options: [],
      options2: [
      {
        value: '0',
        label: 'JANEIRO'
      }, 
      {
        value: '1',
        label: 'FEVEREIRO'
      }, 
      {
        value: '2',
        label: 'MARÇO'
      }, 
      {
        value: '3',
        label: 'ABRIL'
      }, 
      {
        value: '4',
        label: 'MAIO'
      },
      {
        value: '5',
        label: 'JUNHO'
      },
      {
        value: '6',
        label: 'JULHO'
      },
      {
        value: '7',
        label: 'AGOSTO'
      },
      {
        value: '8',
        label: 'SETEMBRO'
      },
      {
        value: '9',
        label: 'OUTUBRO'
      },
      {
        value: '10',
        label: 'NOVEMBRO'
      },
      {
        value: '11',
        label: 'DEZEMBRO'
      }],
      options3: [
      {
        value: '2020',
        label: '2020'
      }, 
      {
        value: '2021',
        label: '2021'
      }, 
      {
        value: '2022',
        label: '2022'
      }, 
      {
        value: '2023',
        label: '2023'
      }],
    };
},

  
  methods: {

    getCategories(){
      return axios.get(`${baseApiurl}/categories`).then(res => this.options2 = res.data);
    },
    
    getUsers(){
      return axios.get(`${baseApiurl}/users`).then(res => this.options = res.data);
    },

    getPDF(){
      
      if(!this.value && !this.value2) {
        return `http://localhost:3333/pdfproducts`;
      }
      if(this.value && !this.value2) {
        return `http://localhost:3333/pdfproducts/user/${this.value}`;
      }
      if(!this.value && this.value2) {
        return `http://localhost:3333/pdfproducts/category/${this.value2}`;
      }
      if(this.value && this.value2) {
        return `http://localhost:3333/pdfproducts/${this.value}/${this.value2}`;
      }
      
    }
    
  },

  mounted() {
    this.getUsers()
    this.getCategories()
  },
};
</script>

<style scoped>

.mv {
    margin-top: 40px;
    margin-right: 60px;
    margin-left: 60px;
    margin-bottom: 60px;
}

.form {
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
}

.alinhar {
  display: flex;
  align-items: center;
}

.linha {
    display: flex;
    align-items: center;
}

.alinhamento {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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

.cor {
  background-color: #F4CB68;
}

.ico {
    margin-right: 15px;
    color: black;
    font-size: 1.2rem;
}

.ico2 {
    margin-left: 15px;
    margin-right: 15px;
    color: black;
    font-size: 1.2rem;
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

.blink {
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  color: white;
  border-radius: 5px;
}

.blink a{
  text-decoration: none;
  color: white;
}

.espaco {
  margin-right: 10px;
}

</style>