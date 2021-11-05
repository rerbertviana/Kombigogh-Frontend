<template>  
<div class="mv">
    <div class="form">
        <el-row class="titulo cor">VENDAS</el-row>
        <el-row>
            <el-col :span="24">
            <div class="l1c1">
                <i class="fas fa-paint-brush fa-fw ico"></i>
                <span class="letras">ARTISTA</span>
                <div class="erro" v-if="visible3">
                  <span class="asterisco">*</span>
                </div>
                <el-select v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id">
                </el-option>
                </el-select>
                <i class="far fa-calendar-alt fa-fw ico2"></i>
                <span class="letras"> PERÍODO </span>
                <div class="erro" v-if="visible">
                  <span class="asterisco">*</span>
                </div>
                <el-select v-model="value2" filterable placeholder="Mês" clearable no-match-text="Não encontrado" class="espaco">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
                </el-select>
                <div class="erro" v-if="visible2">
                  <span class="asterisco">*</span>
                </div>
                <el-select v-model="value3" filterable placeholder="Ano" clearable no-match-text="Não encontrado">
                    <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
                </el-select>
                <a :href="getPDF()" target="_blank" class="blink cor"> GERAR </a>
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
      value3: '',
      visible: false,
      visible2: false,
      visible3: true,
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

  watch: {
    value(){
      this.getFilter2();
    },
    value2() {
      this.getFilter();
    },
    value3() {
      this.getFilter();
    },
  },
  
  methods: {

    getFilter() {
      if (!this.value2 && this.value3) {
        this.visible = true;
        this.visible2 = false;
      }
      if (this.value2 && !this.value3) {
        this.visible = false;
        this.visible2 = true;
      }
      if (this.value2 && this.value3) {
        this.visible = false;
        this.visible2 = false;
      }
      if (!this.value2 && !this.value3) {
        this.visible = false;
        this.visible2 = false;
      }
    },

    getFilter2() {
      if(!this.value) {
        this.visible3 = true;
      }
      if(this.value) {
        this.visible3 = false;
      }
    },
    
    getUsers(){
      return axios.get(`${baseApiurl}/users`).then(res => this.options = res.data);
    },

    getPDF(){
      
      if(this.value && this.value2 && this.value3) {
        return `http://localhost:3333/pdfordersproducts/${this.value}/${this.value2}/${this.value3}`;
      }
      if(this.value && !this.value2 && !this.value3) {
        return `http://localhost:3333/pdfordersproducts/${this.value}`;
      }      
    }
    
  },

  mounted() {
    this.getUsers()
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

.l1c1 {
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
  background-color: #82D4D1;
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
  width: 120px;
  height: 40px;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}


.espaco {
  margin-right: 10px;
}

.asterisco {
  color: red;
  margin-right: 5px;
}

.erro {
  animation: headShake;
  animation-duration: 1s;
}

</style>