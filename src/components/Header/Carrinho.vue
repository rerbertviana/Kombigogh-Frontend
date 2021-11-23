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
        <el-row class="tabela">
            <el-table :data="orders.filter(data => !search || data.nome.toLowerCase().includes(search.toLowerCase()) || data.email.toLowerCase().includes(search.toLowerCase()))" border stripe empty-text="CARRINHO VAZIO">
                <el-table-column width="95">
                    <template slot-scope="scope">
                        <v-avatar size="70" rounded>
                        <v-img :src= "getImagem(scope.row)"/>
                        </v-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="nome" label="NOME" width="170"></el-table-column>
                <el-table-column prop="descricao" label="DESCRIÇÃO" ></el-table-column>
                <el-table-column prop="preco" label="PREÇO" width="145"></el-table-column>
                <el-table-column label="QUANTIDADE  " width="245">
                    <template slot-scope="scope">
                        <el-input-number size="small" controls-position="right" :step="1" :min="1" :max=scope.row.quantidade></el-input-number>
                    </template>
                </el-table-column>
            </el-table>  
        </el-row>
    </div>    
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: "carrinhocompras",
  computed: mapState(['perfilVisible', 'orders']),

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
        ]
    };
  },

  methods: {

    visible() {
      if (this.perfilVisible == true)
      this.$store.commit('togglePerfil')
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
  },
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

    .letras {
        margin-right: 15px;
        font-size: 17px;
        color: black;
    }
</style>
