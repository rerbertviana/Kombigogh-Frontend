<template>

    <div class="produtos">
      <div class="form">
        <el-row class="lin1" :gutter="20">
            <el-col :span="8">
                <div class="l1c1">
                    <i class="fas fa-paint-brush fa-fw ico"></i>
                    <span class="letras">ARTISTA</span>
                    <el-select v-model="value" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                        <el-option v-for="item in options" :key="item.id" :label="item.nome" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="l1c1">
                    <i class="fas fa-paste fa-fw ico"></i>
                    <span class="letras">CATEGORIA</span>
                    <el-select v-model="value2" filterable placeholder="Selecione" clearable no-match-text="Não encontrado">
                        <el-option v-for="item in options2" :key="item.id" :label="item.nome" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="l1c1">
                    <i class="fas fa-box-open fa-fw ico"></i>
                    <span class="letras2">PRODUTOS</span>
                    <el-input placeholder="Produto" v-model="search" size="large">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </el-col>
        </el-row>
      </div>
     <el-row class="tabela">
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

    name: 'produtos',
    data () {
      return {
        products: [],
        options: [],
        options2: [],
        search: '',
        value: '',
        value2:'',
        input: '',
        
      }
    },

    watch: {
      value() {
        this.getFilter()
      },
      value2() {
        this.getFilter()
      }
    },

    methods: {

      getFilter() {
        if(!this.value && this.value2) {
          return this.getProductsCategory()
        }
        if(!this.value2 && this.value) {
          return this.getProductUser()
        }
        if(this.value && this.value2) {
          return this.getProductUserCategory()
        }
        if(!this.value && !this.value2) {
          return this.getProducts()
        }
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

      getUsers() {
        return axios.get(`${baseApiurl}/users`).then(res => this.options = res.data);
      },

      getCategories() {
        return axios.get(`${baseApiurl}/categories`).then(res => this.options2 = res.data);
      },

    },

    mounted() {
      this.getProducts();
      this.getUsers();
      this.getCategories();
    }

}
    
</script>

<style scoped>

.produtos {
    margin-top: 50px;
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

.lin1 {
    margin-bottom: 20px;
}

.l1c1 {
  display: flex;
  align-items: center;
}

.ico {
  margin-right: 10px;
  color: black;
  font-size: 1.2rem;
}

.letras {
  margin-right: 15px;
  font-size: 17px;
  color: black ;
}

.letras2 {
  margin-right: 20px;
  font-size: 17px;
  color: black ;
}

.tabela {
  margin-top: 30px;
}

</style>