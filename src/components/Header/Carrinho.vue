<template>
    <div class="carrinho">
        <div class="content">
            <el-row class="titulo">
                <span>CARRINHO DE COMPRAS</span>
            </el-row>
            <el-row>
                <el-col class="alinhar" :span="24">
                    <i class="fas fa-user-alt  fa-fw ico"></i>
                    <span class="letras">CLIENTE</span>
                    <el-input placeholder="Nome do cliente" v-model="order.cliente" clearable></el-input>
                    <i class="fas fa-dollar-sign fa-fw ico2"></i>
                    <span class="letras">PAGAMENTO</span>
                    <el-select v-model="order.pagamento" filterable placeholder="SELECIONE" clearable no-match-text="Não encontrado">
                        <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <div v-if="!botao" class="espaco">
            <div class="content">
                <div class="vazio">
                    <v-img  max-height="100" max-width="100" src="http://localhost:3333/files/default3.png" ></v-img>
                    <span class="carrinhovazio">OOPS, CARRINHO VAZIO...</span>
                </div>
            </div>
        </div>
        <div v-if="botao" class="tabela">
            <div class="content">
                <el-row >
                    <el-table :data="orders.filter(data => !search || data.nome.toLowerCase().includes(search.toLowerCase()) || data.email.toLowerCase().includes(search.toLowerCase()))" border stripe empty-text="CARRINHO VAZIO">
                        <el-table-column  type="index" width="50"></el-table-column>
                        <el-table-column label="PRODUTO" width="110">
                            <template slot-scope="scope">
                                <v-avatar size="70" rounded>
                                <v-img :src= "getImagem(scope.row)"/>
                                </v-avatar>
                            </template>
                        </el-table-column>
                        <el-table-column prop="nome" label="NOME" width="170"></el-table-column>
                        <el-table-column prop="descricao" label="DESCRIÇÃO" ></el-table-column>
                        <el-table-column prop="preco" label="PREÇO" width="145"></el-table-column>
                        <el-table-column label="QUANTIDADE" width="155">
                            <template slot-scope="scope">  
                                <el-input-number size="small" v-model="orders[scope.$index].quantidade" controls-position="right" :step="1" :min="1" :max="scope.row.estoque"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column label="AÇÕES" width="155">
                            <template slot-scope="scope">  
                                <el-button @click="removerItem(scope.$index)" class="botao cor1"><i class="fas fa-trash-alt ico3"></i>EXCLUIR</el-button>
                            </template>
                        </el-table-column>
                    </el-table>  
                </el-row>
                <el-row>
                    <el-col class="total">
                        TOTAL = {{total}}
                    </el-col>
                </el-row>
            </div>
            <el-row>
                <el-col :span="24" class="end">
                    <el-button @click="open" class="botao2 cor1">LIMPAR</el-button>
                    <router-link to="/vendas" class="botaolink cor3"><span class="continuar">COMPRAR +</span></router-link>
                     <el-button @click="soma" class="botao2 cor3"> ATUALIZAR </el-button>
                    <el-button @click="open2" class="botao2 cor3"> FINALIZAR </el-button>
                </el-col>
            </el-row>
        </div>
    </div>    
</template>

<script>

import { mapState } from 'vuex'
import axios from "axios";
import { baseApiurl } from "@/global";

export default {
  name: "carrinhocompras",
  computed: mapState(['perfilVisible', 'orders', 'botao']),

    data() {
        return {
            order: {},
            search: '',
            products: [],
            options: [
                {
                    id: 'DINHEIRO',
                    nome: 'DINHEIRO'
                },
                {
                    id: 'DÉBITO',
                    nome: 'DÉBITO'
                },
                {
                    id: 'CRÉDITO',
                    nome: 'CRÉDITO'
                },
            ],
            total: 0,
        };
    },
    

    methods: {

        soma() {
            if(this.orders.length) {
                let somar = 0;
                for(let i=0; i<this.orders.length; i++) {
                    somar = somar + (this.orders[i].quantidade * this.orders[i].preco) 
                }
                this.total = somar;
            } 
        },

        vazio() {
            this.$message({
                showClose: true,
                message:'Oops, informe o campo "CLIENTE".',
                type: 'error',
            }); 
        },

        vazio2() {
            this.$message({
                showClose: true,
                message:'Oops, selecione o "PAGAMENTO".',
                type: 'error',
            }); 
        },

        naoInteiro() {
            this.$message({
                showClose: true,
                message:'Oops, "QTD" precisa ser um valor inteiro.',
                type: 'error',
            }); 
        },

        verificar() {
            if(!this.order.cliente) {
                this.vazio();
                return false;
            }
            if(!this.order.pagamento) {
                this.vazio2();
                return false;
            }
            return true;
        },

        sucesso() {
            this.$message({
                showClose: true,
                message:'Venda Realizada!',
                type: 'success',
            }); 
        },

        limpar() {
            this.order = {}
        },

        getVender() {
            if(this.verificar()) {
                this.order.cliente = this.order.cliente.toUpperCase();
                this.order.products = this.orders;
                axios
                .post(`${baseApiurl}/orders`, this.order)
                .then(() => {
                    this.sucesso()
                    this.$store.commit('zerarPedidos')
                    this.limpar()
                })
                .catch(() => {
                    this.naoInteiro();
                });
            }
            
        },

        open() {
            this.$confirm('Tem certeza que deseja limpar o carrinho?', 'ATENÇÃO!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'CANCELAR',
                type: 'warning'
            }).then(() => {
                this.getCancelar()
            }).catch(() => {
                this.$message({
                type: 'info',
                message: 'Operação cancelada.'
                });          
            });
        },

        open2() {
            this.$confirm('Tem certeza que deseja finalizar a venda?', 'ATENÇÃO, REVISE OS ITENS!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'CANCELAR',
                type: 'warning'
            }).then(() => {
                this.getVender()
            }).catch(() => {
                this.$message({
                type: 'info',
                message: 'Operação cancelada.'
                });          
            });
        },

        zerado() {
            this.$message({
            showClose: true,
            message:'Carrinho limpo.',
            type: 'success',
            });
        },

        getCancelar() {
            this.$store.commit('zerarPedidos')
            this.zerado()
        },

        visible() {
            if (this.perfilVisible == true)
            this.$store.commit('togglePerfil')
        },

        itemExcluido() {
            this.$message({
            showClose: true,
            message:'Item excluido.',
            type: 'success',
            });
        },

        removerItem(linha) {
            this.$store.commit('removerPedidos', linha)
            this.itemExcluido();
        },

        getImagem(row) {
            if(!row.imagem) {
                return `http://localhost:3333/files/default.jpg`
            }
            return `http://localhost:3333/files/${row.imagem}`
        }, 
        
    },

    mounted() {
        this.visible();
        this.soma();
    },

    updated() {
        this.soma()
    }
}

</script>

<style scoped>

    .tabela {
        margin-top: 30px;
    }

    .carrinho {
        margin: 15px;
        padding: 50px;
        background-color: white;
        box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
        border-radius: 5px; 
    }

    .content {
        padding: 20px;
        box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
        background: white;
        border-radius: 5px;
    }

    .titulo {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        border-radius: 5px;
        height: 50px;
        align-items: center;
        color: white;
        background-color: #82D4D1;
        border-radius: 5px;
    }

    .alinhar{
        display: flex;
        align-items: center;
    }

    .ico {
        margin-right: 10px;
        color: black;
        font-size: 1.2rem;
    }

    .ico2 {
        margin-left: 20px;
        margin-right: 10px;
        color: black;
        font-size: 1.2rem;
    }

    .ico3 {
        margin-right: 10px;
        color: white;
        font-size: 1.2rem;
    }

    .letras {
        margin-right: 15px;
        font-size: 17px;
        color: black;
    }

    .botao {
        color: white;
        border: none;
    }

    .botao2 {
        margin-left: 10px;
        margin-top: 20px;
        width: 150px;
        height: 50px;
        color: white;
        border: none;
    }

    .botaolink {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        margin-top: 20px;
        width: 150px;
        height: 50px;
        color: white;
        text-decoration: none;
        border: none;
        border-radius: 5px;
    }

    .cor1 {
        background-color: #FFA882;
    }

    .cor2 {
        background-color: #69F690;
    }

    .cor3 {
        background-color: #82D4D1;
    }

    .vazio {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .espaco {
        margin-top: 20px;
    }

    .carrinhovazio {
        margin-left: 15px;
    }

    .end {
        display: flex;
        justify-content: flex-end;
    }

    .continuar {
        font-size: 14px;
    }

    .total {
        display: flex;
        margin-top: 10px;
        justify-content: center;
        align-items: center;
        color: white;
        height: 50px;
        width: 160px;
        background-color: #82D4D1;
        border-radius: 5px;
    }

    .tabela {
        margin-top: 20px;
    }
</style>
