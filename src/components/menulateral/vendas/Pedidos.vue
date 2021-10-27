<template>
    <div class="mv">
        <div class="form">
            <el-row class="lin1" :gutter="20" >
                <el-col :span="10">
                    <div class="l1c1">
                        <i class="fas fa-paint-brush fa-fw ico"></i>
                        <span class="titulosheader espacoartista"> ARTISTA </span>
                        <el-select v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                            <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="14">
                    <div class="l1c2">
                        <i class="far fa-calendar-alt fa-fw icodata"></i>
                        <span class="titulosheader dat"> DATA </span>
                        <div class="erro" v-if="visible">
                            <span class="asterisco">*</span>
                        </div>
                        <el-select v-model="value2" filterable placeholder="Mês" class="espaco" clearable no-match-text="Não encontrado">
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
                        <!-- <el-button @click="getFilter" class="b1">FILTRAR</el-button> -->
                        <!-- <el-button @click="getTodos" class="b2">TODOS</el-button> -->
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <div class="l2c1">
                        <i class="fas fa-check fa-fw ico"></i>
                        <span class="titulosheader espacostatus"> STATUS </span>
                        <el-select v-model="value4" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                            <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="14">
                    <div class="l2c2">
                        <i class="fas fa-box-open fa-fw ico"></i>
                        <span class="ped"> PEDIDOS </span>
                        <el-input placeholder="Nome do cliente" v-model="search" size="large">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <el-button @click="getTodos" class="b2">TODOS</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-row class="lin2" v-if="tab1">
            <el-table  :data="orders.filter(data => !search || data.cliente.toLowerCase().includes(search.toLowerCase()))" stripe border style="width: 100%" empty-text="Sem resultados">
                <el-table-column prop="cliente" label="CLIENTE" width="230">
                </el-table-column>
                <el-table-column prop="mes" label="MES">
                </el-table-column>
                <el-table-column prop="ano" label="ANO">
                </el-table-column>
                <el-table-column prop="total" label="TOTAL">
                </el-table-column>
                <el-table-column prop="status" label="STATUS" width="130">
                </el-table-column>
                <el-table-column label="AÇÕES" width="220">
                        <template slot-scope="scope">
                            <el-button @click="getOrder(scope.row)" class="b3 acao"><i class="fas fa-eye fa-fw ico2"></i>VER PEDIDO</el-button>
                        </template>
                </el-table-column> 
            </el-table>
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
            value3: '',
            value4: '',
            input: '',
            orders: [],
            vendas:[],
            pedidos:[],
            options: [],
            tab1: true,
            tab2: false,
            visible: false,
            visible2: false,
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
                }
            ],
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
                }, 
            ],
            options4: [
                {
                    value: 'Estornado',
                    label: 'ESTORNADO'
                }, 
                {
                    value: 'ok',
                    label: 'OK'
                }, 
            ]
        }
    },

    watch: {

        value() {
            this.getController();
        },

        value2() {
            this.getFilter();
        },

        value3() {
            this.getFilter();
        },

        value4() {
            this.getController();
        }
     
    },

    methods: {

        getFilter() {
            if(!this.value2 && this.value3) {
                this.visible = true;
                this.visible2 = false;
            }
            if(this.value2 && !this.value3) {
                this.visible = false;
                this.visible2 = true;
            }
            if(this.value2 && this.value3) {
                this.visible = false;
                this.visible2 = false;
                return this.getController();
            }
            if(!this.value2 && !this.value3) {
                this.visible = false;
                this.visible2 = false;
                return this.getController();
            }
        },

        getOrdersStatus(){
            return axios.get(`${baseApiurl}/orders/status/${this.value4}`).then(res => this.orders = res.data);
        },

        getTodos() {
            this.visible = false;
            this.visible2 = false;
            this.value = '';
            this.value2 = '';
            this.value3 = '';
            this.value4 = '';
            this.getOrders();
        },

        getOrdersData() {
            return axios.get(`${baseApiurl}/orders/${this.value2}/${this.value3}`).then(res => this.orders = res.data);
        },

        getOrdersUsers() {
            return axios.get(`${baseApiurl}/orders/user/${this.value}`).then(res => this.orders = res.data);
        },

        getOrders() {
            return axios.get(`${baseApiurl}/orders`).then(res => this.orders = res.data);
        },

        getOrder(row) {
            this.tab1 = false;
            this.tab2 = true;
            axios.get(`${baseApiurl}/orders/${row.id}`).then(res => this.pedidos = res.data[0]);
            axios.get(`${baseApiurl}/orders/${row.id}`).then(res => this.vendas = res.data[1].produtos);
        },

        getClose() {
            this.tab1 = true;
            this.tab2 = false;
        },

        getUsers() {
            return axios.get(`${baseApiurl}/users`).then(res => this.options = res.data);
        },

        getOrdersUsersStatus() {
            return axios.get(`${baseApiurl}/ordersuserdatastatus/${this.value}/${this.value4}`).then(res => this.orders = res.data);
        },

        getOrdersUsersData() {
            return axios.get(`${baseApiurl}/orders/user/${this.value}/${this.value2}/${this.value3}`).then(res => this.orders = res.data);
        },

        getOrdersUsersDataStatus(){
            return axios.get(`${baseApiurl}/ordersuserdatastatus/${this.value}/${this.value2}/${this.value3}/${this.value4}`).then(res => this.orders = res.data);
        },

        getController() {

            if(this.value && this.value2 && this.value3 && this.value4) {
                this.getOrdersUsersDataStatus();
            }
            if(this.value && !this.value2 && !this.value3 && !this.value4) {
                this.getOrdersUsers();
            }
            if(this.value && !this.value2 && this.value3 && this.value4) {
                this.getOrdersUsersStatus();
            }
            if(this.value && this.value2 && !this.value3 && this.value4) {
                this.getOrdersUsersStatus();
            }
            if(this.value && this.value2 && this.value3 && !this.value4) {
                this.getOrdersUsersData();
            }
            if(this.value && !this.value2 && this.value3 && !this.value4) {
                this.getOrdersUsers();
            }
            if(this.value && this.value2 && !this.value3 && !this.value4) {
                this.getOrdersUsers();
            }
            if(!this.value && this.value2 && this.value3 && this.value4) {
                this.getOrdersDataStatus();
            }
            if(!this.value && !this.value2 && !this.value3 && !this.value4) {
                this.getOrders();
            }
            if(!this.value && !this.value2 && this.value3 && this.value4) {
                this.getOrdersStatus();
            }
            if(!this.value && this.value2 && !this.value3 && this.value4) {
                this.getOrdersStatus();
            }
            if(!this.value && !this.value2 && !this.value3 && this.value4) {
                this.getOrdersStatus();
            }
            if(!this.value && this.value2 && this.value3 && !this.value4) {
                this.getOrdersData();
            }
            if(!this.value && !this.value2 && this.value3 && !this.value4) {
                this.getOrders();
            }
            if(!this.value && this.value2 && !this.value3 && !this.value4) {
                this.getOrders();
            }
            if(this.value && !this.value2 && !this.value3 && this.value4) {
                this.getOrdersUsersStatus();
            } 
        }


    },

    mounted() {
        this.getOrders();
        this.getUsers();
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
}

.ico {
    margin-right: 15px;
    color: black;
    font-size: 1.2rem;
}

.titulosheader {
    font-size: 17px;
    color: black ;
}

.espacoartista {
    margin-right: 53px;
}

.espacostatus {
    margin-right: 60px;
}

.lin1 {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.l1c1 {
    display: flex;
    align-items: center;
}

.l2c1 {
    display: flex;
    align-items: center;
}

.l1c2 {
    display: flex;
    align-items: center;
}

.l2c2 {
    display: flex;
    align-items: center;
}

.lin2 {
    margin-top: 40px;
}

.espaco {
    margin-right: 10px;
}

.b3 {
    margin-left: 10px;
    background-color: #82D4D1;
    color: white;
    height: 50px;
    width: 180px;
}

.acao {
    display: flex;
    align-items: center;
    justify-content: center;
}

.pedido {
    padding: 20px;
    margin-top: 25px;
    box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
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

.ico3 {
    margin-left: 8px;
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

.idpedido {
    display: flex;
    justify-content: center;
}

.titulos {
    display: flex;
    color: white;
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

.conteudo {
    display: flex;
    margin-top: 5px;
    color: gray;
}

.l4 {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.produtos {
    display: flex;
    justify-content: center;
    color: white;
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

.ico2 {
    margin-right: 8px;
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

.asterisco {
    color: red;
    margin-right: 5px;
}

.erro {
    animation: headShake;
    animation-duration: 1s;
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

.dat {
    margin-right: 40px;
}

.icodata {
    color: black;
    font-size: 1.2rem;
    margin-right: 22px;
}

.ped {
    margin-right: 15px;
}

.btodos {
    background-color: red;
}
</style>