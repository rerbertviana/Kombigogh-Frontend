<template>
  <div class="mv">
    <div class="form">
      <el-row class="lin1" :gutter="25">
        <el-col :span="11">
          <div class="l1c1">
            <i class="far fa-calendar-alt fa-fw ico"></i>
            <span class="periodo"> PERÍODO </span>
            <div class="erro" v-if="visible">
              <span class="asterisco">*</span>
            </div>
            <el-select v-model="value" filterable clearable no-match-text="..." placeholder="Mês" class="espaco">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <div class="erro" v-if="visible2">
              <span class="asterisco">*</span>
            </div>
            <el-select v-model="value2" filterable clearable no-match-text="..." placeholder="Ano">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="13">
          <div class="l1c2">
            <i class="fas fa-box fa-fw ico"></i>
            <span class="meusprodutos"> PRODUTOS </span>
            <el-input placeholder="Nome do produto" v-model="search" size="large">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button @click="getTodos" class="b2">TODOS</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-select v-if="tab1" class="pag" v-model="value3" filterable placeholder="N° ITENS POR PÁGINA" clearable no-match-text="Não encontrado">
      <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-row v-if="tab1">
      <el-table :data="mysaleslist.filter(data => !search || data.nome.toLowerCase().includes(search.toLowerCase()))" stripe border style="width: 100%" empty-text="Sem resultados">
        <el-table-column width="95">
          <template slot-scope="scope">
            <v-avatar size="70" rounded>
              <v-img :src= "getImagem(scope.row)"/>
            </v-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="nome" label="NOME"> </el-table-column>
        <el-table-column prop="quantidade" label="QUANTIDADE" width="130">
        </el-table-column>
        <el-table-column prop="mes" label="MÊS" width="120"> </el-table-column>
        <el-table-column prop="ano" label="ANO" width="100"> </el-table-column>
        <el-table-column label="AÇÕES" width="220">
          <template slot-scope="scope">
            <el-button @click="getOrder(scope.row)" class="b3 acao">
              <i class="fas fa-eye fa-fw ico2"></i>VER PEDIDO</el-button>
          </template>
        </el-table-column>
      </el-table>
      <v-pagination color="#82D4D1" class="paginacao" v-model="pageVender" :length="pages3"></v-pagination>
    </el-row>
    <div class="pedido" v-if="tab2">
      <div class="linhafechar">
        <el-button @click="getClose" class="fechar">FECHAR<i class="fas fa-window-close fa-fw ico3"></i></el-button>
      </div>
      <div class="linhapedido">
        <el-col :span="24" class="idpedido">ID PEDIDO - {{ pedidos.id }}</el-col>
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
          <el-col class="l4">{{ pedidos.cliente }}</el-col>
          <el-col class="l4">{{ pedidos.vendedor }}</el-col>
          <el-col class="l4">{{ pedidos.pagamento }}</el-col>
          <el-col class="l4">{{ pedidos.status }}</el-col>
        </div>
      </el-row>
      <el-row>
        <div class="produtos">
          <el-col :span="24" class="l5">
            <i class="fas fa-dollar-sign ico2"></i>PRODUTOS VENDIDOS
          </el-col>
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
        <el-col :span="5" class="total"> TOTAL = R$ {{ pedidos.total }} </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiurl } from "@/global";
import { mapState } from 'vuex'


export default {
  name: "Minhasvendas",
  computed: mapState([ 'mysaleslist', 'pages3' ]),

  data() {
    return {
      search: "",
      value: "",
      value2: "",
      value3: "",
      pageVender: 1,
      input: "",
      options: [
        {
          value: "0",
          label: "JANEIRO",
        },
        {
          value: "1",
          label: "FEVEREIRO",
        },
        {
          value: "2",
          label: "MARÇO",
        },
        {
          value: "3",
          label: "ABRIL",
        },
        {
          value: "4",
          label: "MAIO",
        },
        {
          value: "5",
          label: "JUNHO",
        },
        {
          value: "6",
          label: "JULHO",
        },
        {
          value: "7",
          label: "AGOSTO",
        },
        {
          value: "8",
          label: "SETEMBRO",
        },
        {
          value: "9",
          label: "OUTUBRO",
        },
        {
          value: "10",
          label: "NOVEMBRO",
        },
        {
          value: "11",
          label: "DEZEMBRO",
        },
      ],
      options2: [
        {
          value: "2020",
          label: "2020",
        },
        {
          value: "2021",
          label: "2021",
        },
        {
          value: "2022",
          label: "2022",
        },
        {
          value: "2023",
          label: "2023",
        },
      ],
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
      vendas: [],
      pedidos: [],
      orders: [],
      produtovendas: [],
      tab1: true,
      tab2: false,
      tab3: true,
      visible: false,
      visible2: false,
    };
  },

  watch: {
    value() {
      this.getFilter();
    },

    value2() {
      this.getFilter();
    },

    pageVender() {
      this.$store.commit('getMySalesList', this.pageVender);
    },

    value3() {
      this.setFiltro()
    },

  },
  methods: {

    setFiltro() {
      if(this.value3 == '') {
        this.$store.commit('setFiltro', 5)
        this.getFilter()
      } else {
        this.$store.commit('setFiltro', this.value3)
        this.getFilter()
      }
    },

    async getMinhasvendas() {
      await axios
        .get(`${baseApiurl}/usersordersproducts`)
        .then((res) => (this.orders = res.data));

      this.$store.commit('getMySales', this.orders);
      if(this.pages3 < this.pageVender) {
        this.pageVender = 1
      }
      this.$store.commit('getMySalesList', this.pageVender);
    },

    async getOrdersData() {
      await axios
        .get(`${baseApiurl}/usersordersproducts/${this.value}/${this.value2}`)
        .then((res) => (this.orders = res.data));
      
      this.$store.commit('getMySales', this.orders);
      if(this.pages3 < this.pageVender) {
        this.pageVender = 1
      }
      this.$store.commit('getMySalesList', this.pageVender);
    },

    getTodos() {
      this.getMinhasvendas(),
        (this.value = ""),
        (this.value2 = ""),
        (this.visible = false);
      this.visible2 = false;
      this.search = '';
    },

    getFilter() {
      if (!this.value && this.value2) {
        this.visible = true;
        this.visible2 = false;
      }
      if (this.value && !this.value2) {
        this.visible = false;
        this.visible2 = true;
      }
      if (this.value && this.value2) {
        this.visible = false;
        this.visible2 = false;
        return this.getOrdersData();
      }
      if (!this.value && !this.value2) {
        this.visible = false;
        this.visible2 = false;
        return this.getMinhasvendas();
      }
    },

    getOrder(row) {
      this.tab1 = false;
      this.tab2 = true;
      axios
        .get(`${baseApiurl}/orders/${row.pedido}`)
        .then((res) => (this.pedidos = res.data[0]));
      axios
        .get(`${baseApiurl}/orders/${row.pedido}`)
        .then((res) => (this.vendas = res.data[1].produtos));
    },

    getClose() {
      this.tab1 = true;
      this.tab2 = false;
    },

    getImagem(row) {
      if(!row.imagem) {
        return `http://localhost:3333/files/default.jpg`
      }
      return `http://localhost:3333/files/${row.imagem}`
    },   
    
  },

  mounted() {
    this.setFiltro();
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
  margin-bottom: 60px;
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
  color: black;
  margin-right: 10px;
}

.meusprodutos {
  font-size: 17px;
  color: black;
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
  background-color: #82D4D1;
  border-radius: 5px;
}

.idpedido {
  display: flex;
  justify-content: center;
}

.espaco {
  margin-right: 15px;
}

.b1 {
  margin-left: 10px;
  background-color: #82d4d1;
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

.b3 {
  margin-left: 10px;
  background-color: #82d4d1;
  color: white;
  height: 50px;
  width: 180px;
  border: none;
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
  background-color: #82D4D1;
  height: 40px;
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

.asterisco {
  color: red;
  margin-right: 5px;
}

.erro {
  animation: headShake;
  animation-duration: 1s;
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