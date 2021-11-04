<template>
<div>
  <div class="mv">
    <div class="form">
        <el-row class="titulo cor1">PRODUTOS</el-row>
        <el-row class="lin1">
            <el-col :span="2">
                <div class="alinhar">
                    FILTROS:
                </div>
            </el-col>
            <el-col :span="22">
              <div class="l1c2">
                <i class="fas fa-paint-brush fa-fw ico"></i>
                <span class="letras">ARTISTA</span>
                <el-select v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                    <el-option v-for="option in options" :key="option.id" :label="option.nome" :value="option.id">
                    </el-option>
                </el-select>
                <i class="fas fa-paste fa-fw ico"></i>
                <span class="letras">CATEGORIA</span>
                <el-select v-model="value2" filterable placeholder="Selecione" clearable class="espaco" no-match-text="Não encontrado" select="getFilter">
                    <el-option v-for="option in options2" :key="option.id" :label="option.nome" :value="option.id">
                    </el-option>
                </el-select>
                <div class="blink cor1"><a :href="getPDF()" target="_blank"> GERAR </a></div>
            </div>
            </el-col>
        </el-row>
    </div>
  </div>
  <div class="mv2">
    <div class="form form2">
      <el-row class="titulo cor3 mt">VENDAS</el-row>
      <el-row class="lin1">
          <el-col :span="2">
              <div class="alinhar">
                  FILTROS:
              </div>
          </el-col>
          <el-col :span="19">
            <div class="l1c2">
              <i class="fas fa-paint-brush fa-fw ico"></i>
              <span class="letras">ARTISTA</span>
              <el-select v-model="value3" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id">
                </el-option>
              </el-select>
              <i class="far fa-calendar-alt fa-fw ico"></i>
              <span class="letras"> PERÍODO </span>
              <div class="erro" v-if="visible">
              <span class="asterisco">*</span>
              </div>
              <el-select v-model="value4" filterable placeholder="Mês" clearable no-match-text="Não encontrado" class="espaco">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <div class="erro" v-if="visible2">
                <span class="asterisco">*</span>
              </div>
              <el-select v-model="value5" filterable placeholder="Ano" clearable no-match-text="Não encontrado">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="blink cor3"><a :href="getPDF()" target="_blank"> GERAR </a></div>
          </el-col>
      </el-row>
    </div>
  </div>
  <div class="mv2">
    <div class="form form2">
      <el-row class="titulo cor2 mt">PEDIDOS</el-row>
      <el-row class="lin1">
          <el-col :span="2">
              <div class="alinhar">
                  FILTROS:
              </div>
          </el-col>
          <el-col :span="22">
            <div class="l1c2">
              <i class="fas fa-comment-dollar fa-fw ico"></i>
                <span class="letras"> VENDEDOR </span>
                <el-select v-model="value3" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                  <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id">
                  </el-option>
                </el-select>
                <i class="far fa-calendar-alt fa-fw ico"></i>
                <span class="letras"> PERÍODO </span>
                <div class="erro" v-if="visible">
                <span class="asterisco">*</span>
                </div>
                <el-select v-model="value4" filterable placeholder="Mês" clearable no-match-text="Não encontrado" class="espaco">
                  <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div class="erro" v-if="visible2">
                  <span class="asterisco">*</span>
                </div>
                <el-select v-model="value5" filterable placeholder="Ano" clearable no-match-text="Não encontrado">
                  <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <i class="fas fa-check fa-fw ico"></i>
                <span class="letras"> STATUS </span>
                <el-select v-model="value6" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                  <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
            </div>
          </el-col>
      </el-row>
      <el-row class="lin1 lin3">
        <div class="blink cor2"><a :href="getPDF()" target="_blank"> GERAR </a></div>
      </el-row>
    </div>
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
      options2: [],
      options3: [
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
      options4: [
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
    options5: [
      {
        value: 'Estornado',
        label: 'ESTORNADO'
      }, 
      {
        value: 'ok',
        label: 'OK'
      }]
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
  margin-bottom: 20px;
}

.mv2 {
  margin-right: 60px;
  margin-left: 60px;
  margin-bottom: 20px;
}

.form2 {
  padding-top: 10px;
}

.lin1 {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.lin3 {
  justify-content: flex-end;
}

.alinhar {
  display: flex;
  align-items: center;
}

.l1c2 {
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

.mt {
  margin-top: 30px;
}

.cor1 {
    background-color: #82D4D1;
}

.cor2 {
    background-color: #69F690;
}

.cor3 {
  background-color: #F4CB68;
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

.blink {
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  color: white;
  border-radius: 5px;
}

.blink a{
  text-decoration: none;
  color: white;
}

.espaco {
  margin-right: 5px;
}



</style>