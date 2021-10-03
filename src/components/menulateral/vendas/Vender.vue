<template>

  <div class="vendervue">
    <div class="form">
      <el-row class="lin1" >
        <el-col span="12" >
          <div class="l1c1">
            <i class="fas fa-paint-brush fa-fw ico2"></i>
            <span class="artista">ARTISTA</span>
            <el-select v-model="value" filterable placeholder="Selecione">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col span="12">
          <div class="l1c2">
            <i class="fas fa-paste fa-fw ico2 ico3"></i>
            <span class="categoria">CATEGORIA</span>
            <el-select v-model="value" filterable placeholder="Selecione">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>  
      <el-row class="lin2" >
        <el-col span="18">
          <div class="l2c1">
            <i class="fas fa-box fa-fw ico2"></i>
            <span class="produtos"> PRODUTOS </span>
            <el-input placeholder="Nome do produto" v-model="search" size="large">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </el-col>
        <el-col span="6">
          <div class="l2c2">
            <el-button class="b1"><i class="fas fa-shopping-bag fa-fw ico"></i></el-button>
            <el-button class="b2"><span class="vender">VENDER</span></el-button>
          </div>
        </el-col>
      </el-row>
    </div>
      <el-row class="tabela" >
        <div>
          <el-table  :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.address.toLowerCase().includes(search.toLowerCase()) )" stripe border style="width: 100%">
            <el-table-column  prop="date" label="Date" width="180">
            </el-table-column>
            <el-table-column prop="name" label="Name" width="180">
            </el-table-column>
            <el-table-column prop="address" label="Address">
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </div>
  
    
</template>

<script>
export default {
    name: 'Vender',
    data () {
      return {
        search: '',
        options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value: '',
        input: '',
        tableData: [{
            date: '2016-05-03',
            name: 'Bert',
            address: 'No. 189, Grove St, Los Angeles'
          }, 
          {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, 
          {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }, 
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'Paraná'
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'Paraná'
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'Paraná'
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'Paraná'
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'Paraná'
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'Paraná'
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'Paraná'
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'Paraná'
          }
          ],
      }
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
  flex-wrap: wrap;
  align-items: center;
}

.l1c2 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.l2c1 {
  display: flex;
  align-items: center;

  margin-right: 10px;
}

.l2c2 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  }

.artista {
  margin-right: 85px;
  font-size: 17px;
  color: black ;
}

.categoria {
  margin-right: 90px;
  font-size: 17px;
  color: black ;
}

.produtos {
  margin-right: 63px;
  font-size: 17px;
  color: black;
}

.vender {
  color: white;
}

.b1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #82D4D1;
  
  height: 40px;
  width: 124px;

}

.b2 {
  width: 124px;
  height: 40px;
  background-color: #69F690;
}

.ico {
  color: white;
  font-size: 1.5rem;
}

.ico2 {
  margin-right: 10px;
  color: black;
  font-size: 1.2rem;
}

.ico3 {
  margin-left: 25px;
}

.tabela {
  margin-top: 30px;
}


</style>