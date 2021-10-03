<template>

  <div class="cadastrar">
    <div class="form">
      <el-row class="lin1" gutter="20">
        <el-col span="10">
          <div class="l1c1">
            <i class="fas fa-box fa-fw ico ico2"></i>
            <span class="nome">NOME</span>
            <el-input placeholder="Please input" v-model="input"></el-input>
          </div>  
        </el-col>
        <el-col span="14" >
          <div class="padrao">
            <i class="fas fa-pen-alt fa-fw ico"></i>
            <span class="letras">DESCRIÇÃO</span>
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="Please input" v-model="textarea1">
            </el-input>
          </div> 
        </el-col>
      </el-row>
      <el-row gutter="20">
          <el-col span="10">
            <div class="padrao">
              <i class="fas fa-paste fa-fw ico"></i>
              <span class="categoria">CATEGORIA</span>
              <el-select v-model="value" filterable placeholder="Selecione">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
              </el-select>
            </div> 
        </el-col>
        <el-col span="11">
          <div class="padrao">
            <i class="fas fa-coins fa-fw ico ico2"></i>
            <span class="preco">PREÇO</span>
            <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" class="espaco2"></el-input-number>
            <span class="letras">QTD</span>
            <el-input-number v-model="num" @change="handleChange" :min="1" :max="10"></el-input-number>  
          </div>
        </el-col>
        <el-col span="3">
          <div class="padrao">
            <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Upload" prepend-icon="mdi-camera" dense>
            </v-file-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div class="bot">
          <el-button class="b"><span class="vender">SALVAR</span></el-button>
        </div>
      </el-row>
    </div>
    <el-row class="tabela">
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

    name: 'produtos',
    data () {
      return {
        rules: [
          value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
        search: '',
        num: 1,
        textarea1: '',
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

.cadastrar {
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

.padrao {
  display: flex;
  align-items: center;
}

.l1c1 {
  display: flex;
  align-items: center;
  margin-right: 8px;
  height: 51px;

}


.ico {
  margin-right: 15px;
  color: black;
  font-size: 1.2rem;
}

.ico2 {
    margin-right: 30px;
}

.letras {
  margin-right: 15px;
  font-size: 16px;
  color: black ;
}

.nome {
  margin-right: 52px;
  font-size: 16px;
  color: black ;
}

.categoria {
    font-size: 16px;
    color: black ;
    margin-right: 15px;
}

.qtd {
    font-size: 16px;
    color: black ;
    margin-right: 10px;
}

.preco {
    font-size: 16px;
    color: black ;
    margin-right: 40px;
}

.tabela {
  margin-top: 30px;
}

.espaco2 {
    margin-right: 20px;
}

.espaco3 {
    margin-right: 30px;
}

.b {
    color: white;
    background-color: #69F690;
    margin-left: 10px;
}

.bot {
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
}
</style>