<template>
    <div class="mv">
        <div class="form">
            <el-row v-show="visible">
                <div class="erro1">
                    <el-col :span="14">
                        <span class="erro2"> *obrigatório </span>
                    </el-col>
                </div>
            </el-row>
            <el-row class="lin1" :gutter="25">
                <el-col :span="14">
                    <div class="l1c1">
                        <i class="far fa-calendar-alt fa-fw ico"></i>
                        <span class="periodo"> PERÍODO </span>
                        <el-select v-model="value" filterable clearable no-match-text="..." placeholder="Mês" class="espaco">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="value2" filterable clearable no-match-text="..." placeholder="Ano">
                            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button @click="getFilter" class="b1">FILTRAR</el-button>
                        <el-button @click="getTodos" class="b2">TODOS</el-button>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="l1c2">
                        <i class="fas fa-box fa-fw ico"></i>
                        <span class="meusprodutos"> PRODUTOS </span>
                        <el-input placeholder="Nome do produto" v-model="search" size="large">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </div>
            <el-row class="lin2"> 
                <div>
                    <el-table  :data="orders.filter(data => !search || data.nome.toLowerCase().includes(search.toLowerCase()) )" stripe border style="width: 100%" empty-text="Sem resultados">
                        <el-table-column  prop="nome" label="NOME">
                        </el-table-column>
                        <el-table-column  prop="quantidade" label="QUANTIDADE">
                        </el-table-column>
                        <el-table-column  prop="mes" label="MÊS">
                        </el-table-column>
                        <el-table-column  prop="ano" label="ANO">
                        </el-table-column> 
                    </el-table>
                </div>
            </el-row>
    </div>
</template>

<script>

import axios from 'axios'
import { baseApiurl } from '@/global'

export default {
    name: 'Minhasvendas',
    data () {
        return {
            search: '',
            value: '',
            value2: '',
            input: '',
            options: [
                {
                    value: '0',
                    label: 'Janeiro'
                }, 
                {
                    value: '1',
                    label: 'Fevereiro'
                }, 
                {
                    value: '2',
                    label: 'Março'
                }, 
                {
                    value: '3',
                    label: 'Abril'
                }, 
                {
                    value: '4',
                    label: 'Maio'
                },
                {
                    value: '5',
                    label: 'Junho'
                },
                {
                    value: '6',
                    label: 'Julho'
                },
                {
                    value: '7',
                    label: 'Agosto'
                },
                {
                    value: '8',
                    label: 'Setembro'
                },
                {
                    value: '9',
                    label: 'Outubro'
                },
                {
                    value: '10',
                    label: 'Novembro'
                },
                {
                    value: '11',
                    label: 'Dezembro'
                }
            ],
            options2: [
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
                }, 
            ],
            orders:[],
            visible: false,
        }
    },
    methods: {
        getMinhasvendas() {
            return axios.get(`${baseApiurl}/usersordersproducts`).then(res => this.orders = res.data);
        },

        getTodos() {
            this.getMinhasvendas(),
            this.visible = false;
        },

        getFilter() {
            
            this.visible = true;
            
        },

        getData() {
            return axios.get(`${baseApiurl}/usersordersproducts/${this.value}/${this.value2}`).then(res => this.orders = res.data);
        }
    },  

    mounted() {
        this.getMinhasvendas()
    }
    
}
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
    
    /* background-color: rgba(0, 0, 0, 0.25); */
}

.ico {
    margin-right: 20px;
    color: black;
    font-size: 1.2rem;
}

.periodo {
    font-size: 17px;
    color: black ;
    margin-right: 20px;
}

.meusprodutos {
    font-size: 17px;
    color: black ;
    margin-right: 20px;

}

.lin1 {
    display: flex;
    align-items: center;
}

.l1c1 {
    display: flex;
    align-items: center;
}

.l1c2 {
    display: flex;
    align-items: center;

}

.lin2 {
    margin-top: 40px;
}

.espaco {
    margin-right: 15px;
}

.b1 {
  margin-left: 10px;
  background-color: #82D4D1;
  color: white;
  height: 40px;
  width: 100px;
}

.b2 {
  margin-left: 10px;
  background-color: #69F690;
  color: white;
  height: 40px;
  width: 100px;
}

.erro1 {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    height: 20px;
    
}
.erro2 {
    margin-left: 145px;
    color: red;
    font-size: 0.9rem;
}

</style>