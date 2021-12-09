<template>
    <div class="categorias">
        <div class="form">
            <el-row v-if="pesquisar">
                <el-col :span="24" class="alinhar">
                    <i class="fas fa-paste fa-fw ico"></i>
                    <span class="letras">CATEGORIAS</span>
                    <el-input placeholder="Nome da categoria" v-model="search" size="large">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <el-button @click="getCadastrar" class="botao cor1">NOVO</el-button>
                </el-col>
            </el-row>
            <div v-if="cadastrar">
                <el-row>
                    <el-col :span="24" class="titulo cor1">
                    <span class="letras2">CADASTRAR CATEGORIA</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="alinhar">
                        <span class="letras">NOME</span>
                        <el-input placeholder="Nome do produto" v-model="category.nome" clearable></el-input>
                        <el-button  @click="salvarCategoria" class="botao cor1">SALVAR</el-button>
                        <el-button  @click="cancelar" class="botao cor1">CANCELAR</el-button>
                    </el-col>
                </el-row>
            </div>
            <div v-if="editar">
                <el-row>
                    <el-col :span="24" class="titulo cor4">
                    <span class="letras2">EDITAR CATEGORIA</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="alinhar">
                        <span class="letras">NOME</span>
                        <el-input placeholder="Nome do produto" v-model="category.nome" clearable></el-input>
                        <el-button  @click="salvarEditar" class="botao cor4">SALVAR</el-button>
                        <el-button  @click="cancelar" class="botao cor4">CANCELAR</el-button>
                    </el-col>
                </el-row>
            </div>
            <div v-if="excluir">
                <el-row>
                    <el-col :span="24" class="titulo cor3">
                    <span class="letras2">EXCLUIR CATEGORIA</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="alinhar">
                        <span class="letras">NOME</span>
                        <el-input disabled placeholder="Nome do produto" v-model="category.nome" clearable></el-input>
                        <el-button  @click="open" class="botao cor3">EXCLUIR</el-button>
                        <el-button  @click="cancelar" class="botao cor3">CANCELAR</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-select class="pag" v-model="value" filterable placeholder="N° ITENS POR PÁGINA" clearable no-match-text="Não encontrado">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-row>
            <el-table :data="categorieslist.filter(data => !search || data.nome.toLowerCase().includes(search.toLowerCase()))" border stripe empty-text="Sem resultados">
            <el-table-column prop="nome" label="NOME"></el-table-column>
            <el-table-column label="AÇÕES" width="245"> 
                <template slot-scope="scope">
                <div class="acoes">
                    <el-button @click="getEditar(scope.row)" class="botao cor4">EDITAR</el-button>
                    <el-button @click="getExcluir(scope.row)" class="botao cor3">EXCLUIR</el-button>
                </div>
                </template>
            </el-table-column>
            </el-table>
            <v-pagination color="#82D4D1" class="paginacao" v-model="pageVender" :length="pages6"></v-pagination>
        </el-row>
    </div>
</template>

<script>
import axios from "axios";
import { baseApiurl } from "@/global";
import { mapState } from 'vuex'

export default {
    name: "produtos",
    computed: mapState(['categorieslist', 'pages6']),

    data() {
        return {
        categories: [],
        category: {},
        search: "",
        value: "",
        pesquisar: true,
        cadastrar: false,
        editar: false,
        excluir: false,
        pageVender: 1,
        options3: [
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
    };
},

    watch: {
        value() {
            this.setFiltro()
        },
    },

    methods: {

        setFiltro() {
            if(this.value == '') {
                this.$store.commit('setFiltro', 5)
                this.getCategories()
            } else {
                this.$store.commit('setFiltro', this.value)
                this.getCategories()
            }
        },

        sucesso() {
            this.$message({
                showClose: true,
                message:'Salvo com sucesso!  ',
                type: 'success',
            });
        },

        excluirSucesso() {
            this.$message({
                showClose: true,
                message:'Excluido com sucesso!  ',
                type: 'success',
            });
        },

        cancelar() {
        this.pesquisar = true;
        this.cadastrar = false;
        this.editar = false;
        this.excluir = false;

        this.$message({
            showClose: true,
            message:'Operação cancelada.',
            type: 'info'
        });
        },

        async getCategories() {
            await axios
                .get(`${baseApiurl}/categories`)
                .then((res) => (this.categories = res.data));
            
            this.$store.commit('getCategories', this.categories);
            if(this.pages6 < this.pageVender) {
                this.pageVender = 1
            }
            this.$store.commit('getCategoriesList', this.pageVender);
        },

        getCadastrar() {
            this.pesquisar = false;
            this.cadastrar = true;
            this.category = {}
            this.search = '';
        },

        getEditar(row) {
            this.category.id = row.id
            this.category.nome = row.nome

            this.pesquisar = false;
            this.cadastrar = false;
            this.excluir = false;
            this.editar = true;
        },

        getExcluir(row) {
            this.category.id = row.id
            this.category.nome = row.nome

            this.pesquisar = false;
            this.cadastrar = false;
            this.excluir = true;
            this.editar = false;
        },

        limpar() {
            this.category = {}
        },

        pesquisa() {
            this.pesquisar = true
            this.cadastrar = false
            this.excluir = false
            this.editar = false
        },

        campovazio() {
            this.$message({
                showClose: true,
                message:'Oops, existem campos vazios.  ',
                type: 'error',
            });
        },

        verificar() {
            if(!this.category.nome) {
                this.campovazio()
                return false
            }
            return true;
        },

        salvarCategoria() {
            if(this.verificar()) {
                this.category.nome = this.category.nome.toUpperCase();
                axios
                .post(`${baseApiurl}/categories`, this.category)
                .then(() => {
                    this.limpar()
                    this.pesquisa()
                    this.sucesso()
                })
                .catch(() => {
                    this.nomerepetido()
                })
            }  
        },

        nomerepetido() {
            this.$message({
                showClose: true,
                message:'Oops, já existe uma categoria com esse nome.  ',
                type: 'error',
            });
        },

        salvarEditar() {
            if(this.verificar()) {
                this.category.nome = this.category.nome.toUpperCase();
                this.category2 = {
                    nome: this.category.nome
                }
                axios
                .put(`${baseApiurl}/categories/${this.category.id}`, this.category2)
                .then(() => {
                    this.limpar()
                    this.pesquisa()
                    this.sucesso()
                })
                .catch(() => {
                    this.nomerepetido()
                })
            }
        },

        excluirCategoria() {
            axios
            .delete(`${baseApiurl}/categories/${this.category.id}`)
            .then(() => {
                this.limpar()
                this.pesquisa()
                this.excluirSucesso()
            })
        },

        open() {
            this.$confirm('Certeza que deseja excluir essa categoria?', 'ATENÇÃO!', {
                confirmButtonText: 'OK',
                cancelButtonText: 'CANCELAR',
                type: 'warning'
            }).then(() => {
                this.excluirCategoria()
            }).catch(() => {
                this.$message({
                type: 'info',
                message: 'Operação cancelada.'
                });  
                this.pesquisa()        
            });
        },
    },

    mounted() {
        this.setFiltro()
    },

    updated() {
        this.getCategories()
    }

}
</script>

<style scoped>

    .categorias {
        margin-top: 40px;
        margin-right: 60px;
        margin-left: 60px;
        margin-bottom: 60px;
    }

    .form {
        padding-top: 30px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;

        border-radius: 10px;
        box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
    }

    .alinhar {
        display: flex;
        align-items: center;
    }

    .botao {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 8px;
        width: 100px;
        height: 40px;
        color: white;
        border: none;
    }

    .cor1 {
        background-color: #82D4D1;  
    }

    .cor2 {
        background-color: #69F690;  
    }

    .cor3 {
        background-color: #FFA882;  
    }

    .cor4 {
        background-color: #F4CB68;  
    }


    .ico {
        margin-right: 10px;
        color: black;
        font-size: 1.2rem;
    }

    .letras {
        margin-right: 15px;
        font-size: 17px;
        color: black;
    }

    .letras2 {
        margin-right: 15px;
        font-size: 17px;
        color: white;
    }

    .titulo {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        border-radius: 5px;
        height: 50px;
        align-items: center;
        border-radius: 5px;
    }

    .acoes {
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
