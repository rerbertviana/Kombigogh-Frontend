<template>

    <div class="produtos">
        <el-row class="lin1" gutter="20">
            <el-col span="13">
                <div class="l1c1">
                    <i class="fas fa-box fa-fw ico2"></i>
                    <span class="nome">NOME</span>
                    <el-input placeholder="Please input" v-model="input"></el-input>
                </div>
            </el-col>
            <el-col span="11">
                 <div class="l1c2">
                    <i class="fas fa-coins fa-fw ico espaco3"></i>
                    <span class="preco">PREÇO</span>
                    <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" class="espaco2"></el-input-number>
                    <span class="qtd">QTD</span>
                    <el-input-number v-model="num" @change="handleChange" :min="1" :max="10"></el-input-number>
                </div>
            </el-col>
        </el-row>
        <el-row gutter="20">
            <el-col span="13">
                 <div class="l2c1">
                    <i class="fas fa-pen-alt fa-fw ico"></i>
                    <span class="letras">DESCRIÇÃO</span>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="Please input" v-model="textarea1">
                    </el-input>
                </div>
            </el-col>
            <el-col span="11">
               <div class="l2c2">
                    <i class="fas fa-paste fa-fw ico"></i>
                    <span class="categoria">CATEGORIA</span>
                    <el-select v-model="value" filterable placeholder="Selecione">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button class="b"><span class="vender">SALVAR</span></el-button>
                </div> 
            </el-col>
        </el-row>
        <el-row>
            <div class="espaco">
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

.produtos {
    margin-top: 50px;
    margin-right: 60px;
    margin-left: 60px;
    margin-bottom: 60px;
}

.lin1 {
    margin-bottom: 20px;
}

.l1c1 {
  display: flex;
  align-items: center;
}

.l2c1 {
  display: flex;
  align-items: center;

}

.l1c2 {
    display: flex;
    align-items: center;
}

.l2c2 {
    display: flex;
    align-items: center;

    height: 55px;
}


.ico {
  margin-right: 10px;
  color: black;
  font-size: 1.2rem;
}

.ico2 {
    margin-right: 30px;
    color: black;
    font-size: 1.2rem;
}

.letras {
  margin-right: 20px;
  font-size: 16px;
  color: black ;
}

.nome {
    margin-right: 48px;
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
    margin-right: 35px;
}

.espaco {
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

</style>