<template>

  <div class="vendervue">
    <div class="form">
      <el-row class="lin1" :gutter="10" >
        <el-col :span="9" >
          <div class="l1c1">
            <i class="fas fa-paint-brush fa-fw ico"></i>
            <span class="artista">ARTISTA</span>
            <el-select v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
              <el-option v-for="option in options2" :key="option.id" :label="option.nome" :value="option.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="l1c2">
            <i class="fas fa-paste fa-fw ico2"></i>
            <span class="categoria">CATEGORIA</span>
            <el-select v-model="value2" filterable placeholder="Selecione" clearable class="espaco" no-match-text="Não encontrado" select="getFilter">
              <el-option v-for="option in options" :key="option.id" :label="option.nome" :value="option.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="l1c3">
            <el-button @click="getFilter" class="b3">FILTRAR</el-button>
            <el-button @click="getTodos" class="b2">TODOS</el-button>
          </div>
        </el-col>
      </el-row>  
      <el-row class="lin2" >
        <el-col :span="18">
          <div class="l2c1">
            <i class="fas fa-box fa-fw ico"></i>
            <span class="produtos"> PRODUTOS </span>
            <el-input placeholder="Nome do produto" v-model="search" size="large">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="l2c2">
            <el-button class="b1"><i class="fas fa-shopping-bag fa-fw ico1"></i></el-button>
            <el-button class="b2">VENDER</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
      <el-row class="tabela" >
        <div>
          <el-table :data="products.filter(data => !search || data.nome.toLowerCase().includes(search.toLowerCase()) || data.descricao.toLowerCase().includes(search.toLowerCase()))" border stripe empty-text="Sem resultados">
            <el-table-column prop="nome" label="NOME">
            </el-table-column>
            <el-table-column prop="descricao" label="DESCRIÇÃO">
            </el-table-column>
            <el-table-column prop="preco" label="PREÇO">
            </el-table-column>
            <el-table-column prop="quantidade" label="QUANTIDADE">
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
    name: 'Vender',
    data () {
      return {
        search: '',
        options: [],
        options2:[],
        value: '',
        input: '',
        value2: '',
        products: []
      }
    },
    methods: {

      getFilter() {
        if(!this.value) {
          this.getProductsCategory()
        }
        if(!this.value2) {
          this.getProductUser()
        }
        if(this.value && this.value2) {
          this.getProductUserCategory()
        }
        if(!this.value && !this.value2) {
          this.getProducts()
        }
      },

      getTodos() {
        this.getProducts();
        this.value = '';
        this.value2 = '';
      },
     
      getProductUserCategory() {
        return axios.get(`${baseApiurl}/products/${this.value}/${this.value2}`).then(res => this.products = res.data);
      },

      getProductsCategory() {
        return axios.get(`${baseApiurl}/categoriesproducts/${this.value2}`).then(res => this.products = res.data.product);
      },

      getProductUser() {
        return axios.get(`${baseApiurl}/products/${this.value}`).then(res => this.products = res.data.product);
      },

      getProducts() {
        return axios.get(`${baseApiurl}/products`).then(res => this.products = res.data);
      },

      getCategories() {
        return axios.get(`${baseApiurl}/categories`).then(res => this.options = res.data);
        // console.log(this.value);
      },

      getUsers() {
        return axios.get(`${baseApiurl}/users`).then(res => this.options2 = res.data);
      },

     

      
    },
    mounted() {
      this.getProducts()
      this.getCategories()
      this.getUsers()
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

.vendervue {
  margin-top: 50px;
  margin-right: 60px;
  margin-left: 60px;
  margin-bottom: 60px;
    /* background-color: rgba(0, 0, 0, 0.25); */
}

.lin1 {
  margin-bottom: 20px;
}

.lin2 {
  margin-bottom: 40px;
}

.l1c1 {
  display: flex;
  align-items: center;
}

.l1c2 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 5px;
}

.l1c3 {
  display: flex;
  justify-content: flex-end;
}

.l2c1 {
  display: flex;
  align-items: center;
}

.l2c2 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.artista {
  margin-right: 62px;
  font-size: 17px;
  color: black ;
}

.categoria {
  margin-right: 15px;
  margin-left: 10px;
  font-size: 17px;
  color: black ;
}

.produtos {
  margin-right: 35px;
  font-size: 17px;
  color: black;
}


.b1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #82D4D1;
  width: 115px;
  height: 40px;
}

.b2 {
  width: 115px;
  height: 40px;
  background-color: #69F690;
  color: white;
}

.b3 {
  width: 115px;
  height: 40px;
  background-color: #82D4D1;
  color: white;
}


.ico {
  margin-right: 15px;
  color: black;
  font-size: 1.2rem;
}

.ico1 {
  color: white;
  font-size: 1.5rem;
}

.ico2 {
  margin-left: 10px;
}

.tabela {
  margin-top: 30px;
}

.espaco {
  margin-right: 0px;
}


</style>