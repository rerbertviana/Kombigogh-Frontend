<template>
    <div class="mv">
        <div class="form">
            <el-row class="lin1" :gutter="20" >
                <el-col :span="10">
                    <div class="alinhar">
                        <i class="fas fa-comment-dollar fa-fw ico"></i>
                        <span class="titulosheader espacoartista"> VENDEDOR </span>
                        <el-select v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                            <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="14">
                    <div class="alinhar">
                        <i class="far fa-calendar-alt fa-fw icodata"></i>
                        <span class="titulosheader dat"> PERÍODO </span>
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
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <div class="alinhar">
                        <i class="fas fa-check fa-fw ico"></i>
                        <span class="titulosheader espacostatus"> STATUS </span>
                        <el-select v-model="value4" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                            <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="14">
                    <div class="alinhar">
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
        <el-select v-if="tab1" class="pag" v-model="value5" filterable placeholder="N° ITENS POR PÁGINA" clearable no-match-text="Não encontrado">
            <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-row v-if="tab1">
            <el-table  :data="orderslist.filter(data => !search || data.cliente.toLowerCase().includes(search.toLowerCase()))" stripe border style="width: 100%" empty-text="Sem resultados">
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
                <el-table-column label="AÇÕES" :width="getTamanho()">
                    <template slot-scope="scope">
                        <div class="botoesacao">
                            <el-button @click="getOrder(scope.row)" class="b3 acao"><i class="fas fa-eye fa-fw ico2"></i>VER PEDIDO</el-button>
                            <el-button v-if="botao" @click="open(scope.row)" class="b3 corestornar">ESTORNAR</el-button>
                        </div>
                    </template>
                </el-table-column> 
            </el-table>
            <v-pagination color="#82D4D1" class="paginacao" v-model="pageVender" :length="pages4"></v-pagination>
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
                    <el-col class="l3">PAGAMENTO</el-col>
                    <el-col class="l3 l3c4">STATUS</el-col>
                </div>
            </el-row>
            <el-row :gutter="10">
                <div class="conteudo">
                    <el-col class="l4">{{pedidos.cliente}}</el-col>
                    <el-col class="l4">{{pedidos.vendedor}}</el-col>
                    <el-col class="l4">{{pedidos.pagamento}}</el-col>
                    <el-col class="l4">{{pedidos.status.toUpperCase()}}</el-col>
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
import { mapState } from 'vuex'

export default {
    name: 'Minhasvendas',
    computed: mapState([ 'orderslist', 'pages4' ]),

    data () {
        return {
            search: '',
            value: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            input: '',
            orders: [],
            vendas:[],
            pedidos:[],
            options: [],
            pageVender: 1,
            tab1: true,
            tab2: false,
            visible: false,
            visible2: false,
            user: {},
            botao: false,
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
            ],
            options5: [
                {
                    value: 5,
                    label: '05'
                },
                {
                    value: 10,
                    label: '10'
                },
                {
                    value: 15,
                    label: '15'
                },
            ],
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
        },

        value5() {
            this.setFiltro()
        },

        pageVender() {
            this.$store.commit('getOrdersList', this.pageVender);
        },
     
    },

    methods: {

        setFiltro() {
            if(this.value5 == '') {
                this.$store.commit('setFiltro', 5)
                this.getController()
            } else {
                this.$store.commit('setFiltro', this.value5)
                this.getController()
            }
        },

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

        async getOrdersStatus(){
            await axios
                .get(`${baseApiurl}/orders/status/${this.value4}`)
                .then(res => this.orders = res.data);

            this.$store.commit('getOrders', this.orders);
            if(this.pages4 < this.pageVender) {
                this.pageVender = 1
            }
            this.$store.commit('getOrdersList', this.pageVender);
        },

        getTodos() {
            this.visible = false;
            this.visible2 = false;
            this.value = '';
            this.value2 = '';
            this.value3 = '';
            this.value4 = '';
            this.search = '';
            this.getOrders();
        },

        async getOrdersData() {
            await axios
                .get(`${baseApiurl}/orders/${this.value2}/${this.value3}`)
                .then(res => this.orders = res.data);

            this.$store.commit('getOrders', this.orders);
            if(this.pages4 < this.pageVender) {
                this.pageVender = 1
            }
            this.$store.commit('getOrdersList', this.pageVender);
        },

        async getOrdersUsers() {
            await axios
                .get(`${baseApiurl}/orders/user/${this.value}`)
                .then(res => this.orders = res.data);

            this.$store.commit('getOrders', this.orders);
            if(this.pages4 < this.pageVender) {
                this.pageVender = 1
            }
            this.$store.commit('getOrdersList', this.pageVender);
        },

        async getOrders() {
            await axios
                .get(`${baseApiurl}/orders`)
                .then(res => this.orders = res.data);

            this.$store.commit('getOrders', this.orders);
            if(this.pages4 < this.pageVender) {
                this.pageVender = 1
            }
            this.$store.commit('getOrdersList', this.pageVender);
        },

        getOrder(row) {
            this.tab1 = false;
            this.tab2 = true;
            axios.get(`${baseApiurl}/orders/${row.id}`).then(res => this.pedidos = res.data[0]);
            axios.get(`${baseApiurl}/orders/${row.id}`).then(res => this.vendas = res.data[1].produtos);
        },

        estornado() {
            this.$message({
                showClose: true,
                message:'Pedido estornado.',
                type: 'success',
            });
        },

        getClose() {
            this.tab1 = true;
            this.tab2 = false;
        },

        getUsers() {
            return axios.get(`${baseApiurl}/users/adm`).then(res => this.options = res.data);
        },

        async getOrdersUsersStatus() {
            await axios
                .get(`${baseApiurl}/ordersuserdatastatus/${this.value}/${this.value4}`)
                .then(res => this.orders = res.data);

            this.$store.commit('getOrders', this.orders);
            if(this.pages4 < this.pageVender) {
                this.pageVender = 1
            }
            this.$store.commit('getOrdersList', this.pageVender);
        },

        async getOrdersUsersData() {
            await axios
                .get(`${baseApiurl}/orders/user/${this.value}/${this.value2}/${this.value3}`)
                .then(res => this.orders = res.data);

            this.$store.commit('getOrders', this.orders);
            if(this.pages4 < this.pageVender) {
                this.pageVender = 1
            }
            this.$store.commit('getOrdersList', this.pageVender);
        },

        async getOrdersUsersDataStatus(){
            await axios
                .get(`${baseApiurl}/ordersuserdatastatus/${this.value}/${this.value2}/${this.value3}/${this.value4}`)
                .then(res => this.orders = res.data);

            this.$store.commit('getOrders', this.orders);
            if(this.pages4 < this.pageVender) {
                this.pageVender = 1
            }
            this.$store.commit('getOrdersList', this.pageVender);
        },

        async getOrdersDataStatus(){
            await axios
                .get(`${baseApiurl}/ordersdatastatus/${this.value2}/${this.value3}/${this.value4}`)
                .then(res => this.orders = res.data);

            this.$store.commit('getOrders', this.orders);
            if(this.pages4 < this.pageVender) {
                this.pageVender = 1
            }
            this.$store.commit('getOrdersList', this.pageVender);
        },

        getController() {

            if(this.value && this.value2 && this.value3 && this.value4) {
                this.getOrdersUsersDataStatus();
            }
            if(this.value && !this.value2 && !this.value3 && !this.value4) {
                this.getOrdersUsers();
            }
            if(this.value && this.value2 && this.value3 && !this.value4) {
                this.getOrdersUsersData();
            }
            if(this.value && !this.value2 && this.value3 && !this.value4) {
                this.getOrdersUsers();
            }
            if(!this.value && this.value2 && this.value3 && this.value4) {
                this.getOrdersDataStatus();
            }
            if(!this.value && !this.value2 && !this.value3 && !this.value4) {
                this.getOrders();
            }
            if(!this.value && !this.value2 && !this.value3 && this.value4) {
                this.getOrdersStatus();
            }
            if(!this.value && this.value2 && this.value3 && !this.value4) {
                this.getOrdersData();
            }
            if(this.value && !this.value2 && !this.value3 && this.value4) {
                this.getOrdersUsersStatus();
            } 
        },

        getUser() {
            return axios.get(`${baseApiurl}/profile`).then(res => this.user = res.data);
        },

        jaEstornado() {
            this.$message({
                showClose: true,
                message:'Pedido já estornado.',
                type: 'info',
            });
        },

        getEstornar(row){
            axios.post(`${baseApiurl}/orders/${row.id}`)
            .then(() => {
                this.estornado()
                this.getOrders()
            })
            .catch(() => {
                this.jaEstornado()
            })
        },

        open(row) {
            this.$confirm('Tem certeza que deseja estornar esse pedido?', 'ATENÇÃO!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'CANCELAR',
                type: 'warning'
            }).then(() => {
                this.getEstornar(row);
            }).catch(() => {
                this.$message({
                type: 'info',
                message: 'Operação cancelada.'
                });          
            });
        },

        getTamanho() {
            if(this.user.nome == 'ADM') {
                this.botao = true
                return '330'
            }
            else {
                return '180'
            }     
        }
    },

    mounted() {
        this.setFiltro();
        this.getUsers();
        this.getUser();
        this.getTamanho();
    },
    
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
        margin-right: 23px;
    }

    .espacostatus {
        margin-right: 60px;
    }

    .lin1 {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .alinhar {
        display: flex;
        align-items: center;
    }

    .espaco {
        margin-right: 10px;
    }

    .b3 {
        margin-left: 10px;
        background-color: #82D4D1;
        color: white;
        height: 50px;
        width: 140px;
        border: none;
    }

    .corestornar{
        background-color: #FFA882;
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
        background-color: #82D4D1;
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
        background-color: #82D4D1;
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

        background-color: #82D4D1;
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
        background-color: #82D4D1 ;
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
        background-color: #82D4D1 ;
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
    border: none;
    }

    .b2 {
    margin-left: 10px;
    background-color: #82d4d1;
    color: white;
    height: 40px;
    width: 100px;
    border: none;
    }

    .dat {
        margin-right: 16px;
    }

    .icodata {
        color: black;
        font-size: 1.2rem;
        margin-right: 19px;
    }

    .ped {
        margin-right: 23px;
    }

    .botoesacao {
        display: flex;
    }

    .paginacao {
        margin-top: 15px;
    }   

    .pag {
        margin-top: 15px;
        margin-bottom: 15px;
        width: 210px;
    }


</style>