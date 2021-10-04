<template>

    <div class="produtos">
      <div class="form">
        <el-row class="lin1" :gutter="20">
            <el-col :span="8">
                <div class="l1c1">
                    <i class="fas fa-paint-brush fa-fw ico"></i>
                    <span class="letras">ARTISTA</span>
                    <el-select v-model="value" filterable placeholder="Selecione">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="l1c1">
                    <i class="fas fa-paste fa-fw ico"></i>
                    <span class="letras">CATEGORIA</span>
                    <el-select v-model="value" filterable placeholder="Selecione">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
          <el-table  :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.address.toLowerCase().includes(search.toLowerCase()) )" stripe border style="width: 100%">
              <el-table-column  prop="date" label="Date" width="180">
              </el-table-column>
              <el-table-column prop="name" label="Name" width="180">
              </el-table-column>
              <el-table-column prop="address" label="Address">
              </el-table-column>
          </el-table>
      </el-row>
    </div>
    
</template>

<script>
export default {

    name: 'produtos',
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