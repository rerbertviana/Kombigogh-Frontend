<template>
    <div class="mv">
        <div class="form">
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
            <el-row v-show="visible">
                <div class="erro1">
                    <el-col :span="6" class="l2c1">
                        <span class="erro2" v-show="visible2"> Obrigatório </span>
                    </el-col>
                    <el-col :span="6" class="l2c2" >
                        <span class="erro3" v-show="visible3"> Obrigatório </span>
                    </el-col>
                    
                </div>
            </el-row>
        </div>
            <el-row class="lin2" v-if="tab1"> 
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
                        <el-table-column label="AÇÕES">
                            <template slot-scope="scope">
                                <el-button @click="getOrder(scope.row)" class="b3 acao"><i class="fas fa-eye fa-fw ico2"></i>VER PEDIDO</el-button>
                            </template>
                        </el-table-column> 
                    </el-table>
                </div>
            </el-row>
            <div class="pedido" v-if="tab2" >
                <div class="linhafechar">
                    <el-button @click="getClose" class="fechar">FECHAR<i class="fas fa-window-close fa-fw ico3"></i> </el-button>
                </div>
                <div class="linhapedido">
                    <el-col :span="24" class="idpedido"> ID PEDIDO - {{pedidos.id}} </el-col>
                </div>
                <el-row :gutter="10">
                    <div class="titulos">
                        <el-col class="l3 l3c1">CLIENTE</el-col>
                        <el-col class="l3">VENDEDOR</el-col>
                        <el-col class="l3 l3c4">STATUS</el-col>
                    </div>
                </el-row>
                <el-row :gutter="10">
                    <div class="conteudo">
                        <el-col class="l4">{{pedidos.cliente}}</el-col>
                        <el-col class="l4">{{pedidos.vendedor}}</el-col>
                        <el-col class="l4">{{pedidos.status}}</el-col>
                    </div>
                </el-row>
                <el-row >
                    <div class="produtos">
                        <el-col :span="24" class="l5"> <i class="fas fa-dollar-sign ico2"></i>PRODUTOS VENDIDOS </el-col>
                    </div>
                </el-row>
                <el-row class="vendas">
                    <el-table :data="vendas" border stripe empty-text="Sem resultados">
                        <el-table-column prop="artista" label="ARTISTA"></el-table-column>
                        <el-table-column prop="nome" label="PRODUTO" width="340"></el-table-column>
                        <el-table-column prop="preco" label="PREÇO"></el-table-column>
                        <el-table-column prop="quantidade" label="QUANTIDADE"></el-table-column>
                    </el-table>
                </el-row>
                <el-row>
                    <el-col :span="5" class="total">
                        TOTAL = R$ {{pedidos.total}}
                    </el-col>
                </el-row>          
            </div>

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
            vendas:[],
            pedidos:[],
            orders:[],
            produtovendas:[],
            tab1: true,
            tab2: false,
            tab3: true,
            visible: false,
            visible2: false,
            visible3: false,
        }
    },
    methods: {

        getMinhasvendas() {
            return axios.get(`${baseApiurl}/usersordersproducts`).then(res => this.orders = res.data);
        },

        getTodos() {
            this.getMinhasvendas(),
            this.value = '',
            this.value2 = '',
            this.visible = false;
        },

        getFilter() {
            if (!this.value && this.value2) {
                this.visible = true;
                this.visible2 = true;
                this.visible3 = false;
            }
            if (this.value && !this.value2) {
                this.visible = true;
                this.visible2 = false;
                this.visible3 = true;
            }
            if (!this.value && !this.value2) {
                this.visible = true;
                this.visible2 = true;
                this.visible3 = true;
            }
            if (this.value && this.value2) {
                this.visible = false;
                this.visible2 = false;
                this.visible3 = false;
                return this.getData();
            }
        },

        getData() {
            return axios.get(`${baseApiurl}/usersordersproducts/${this.value}/${this.value2}`).then(res => this.orders = res.data);
        },

        getOrder(row) {
            this.tab1 = false;
            this.tab2 = true;
            axios.get(`${baseApiurl}/orders/${row.pedido}`).then(res => this.pedidos = res.data[0]);
            axios.get(`${baseApiurl}/orders/${row.pedido}`).then(res => this.vendas = res.data[1].produtos);
        },

        getClose() {
            this.tab1 = true;
            this.tab2 = false;
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
    margin-right: 10px;
    color: black;
    font-size: 1.2rem;
}

.ico2 {
    margin-right: 8px;
}

.ico3 {
    margin-left: 8px;
}

.periodo {
    font-size: 17px;
    color: black ;
    margin-right: 10px;
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

.l3 {
    margin-top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;

    background-color: #F4CB68;
}

.l3c1 {
    margin-left: 5px;
    border-radius: 5px 0px 0px 5px;
}

.l3c4 {
    margin-right: 5px;
    border-radius: 0px 5px 5px 0px;
}

.l4 {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.l5 {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #F4CB68 ;
    border-radius: 5px;
}

.idpedido {
    display: flex;
    justify-content: center;
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

.b3 {
    margin-left: 10px;
    background-color: #82D4D1;
    color: white;
    height: 50px;
    width: 180px;
}

.erro1 {
    margin-top: 5px;
    display: flex;
    align-items: center;
    height: 20px;
    animation: headShake;
    animation-duration: 1s;
    
}
.erro2 {
    margin-right: 20px;
    color: red;
    font-size: 0.9rem;   
}

.erro3 {
    margin-left: 10px;
    color: red;
    font-size: 0.9rem;   
}

.l2c1 {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    
}

.l2c2 {
    display: flex;
    justify-content: flex-start;
   
}

.acao {
    display: flex;
    align-items: center;
    justify-content: center;
}

.titulos {
    display: flex;
    color: white;
}

.conteudo {
    display: flex;
    margin-top: 5px;
    color: gray;
}

.pedido {
    padding: 20px;
    margin-top: 25px;
    box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.produtos {
    display: flex;
    justify-content: center;
    color: white;
}

.vendas {
    margin-top: 10px;
}

.total {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    border-radius: 3px;
    color: white;
    background-color: #F4CB68 ;
    height: 40px;
}

.linhapedido {
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    border-radius: 5px 0px 5px 5px;
    background-color: #F4CB68;
    color: white;
}

.linhafechar {
    display: flex;
    justify-content: flex-end;
}

.fechar {
    padding-left: 27px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    height: 35px;
    width: 103px;
    background-color: #F4CB68;
    border-radius: 5px 5px 0px 0px;
    color: white;
}


</style>