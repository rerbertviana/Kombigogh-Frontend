<template>
    <div class="mv">
        <div class="form">
            <el-row class="lin1" gutter="30">
                <el-col span="12">
                    <div class="l1c1">
                        <i class="far fa-calendar-alt fa-fw ico"></i>
                        <span class="periodo"> PERÍODO </span>
                        <el-select v-model="value" filterable placeholder="Mês" class="espaco">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="value" filterable placeholder="Ano">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col span="12">
                    <div class="l1c2">
                        <i class="fas fa-box fa-fw ico"></i>
                        <span class="meusprodutos"> PRODUTOS </span>
                        <el-input placeholder="Nome do produto" v-model="search" size="large">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </div>
            <el-row class="lin2">
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
    name: 'Minhasvendas',
    data () {
        return {
            search: '',
            value: '',
            input: '',
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
            ]
        }
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

.mv {

    margin-top: 50px;
    margin-right: 60px;
    margin-left: 60px;
    margin-bottom: 60px;
    
    /* background-color: rgba(0, 0, 0, 0.25); */
}

.ico {
    margin-right: 20px;
    color: black;
    font-size: 1.2rem;
}

.periodo {
    font-size: 17px;
    color: black ;
    margin-right: 20px;
}

.meusprodutos {
    font-size: 17px;
    color: black ;
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

.lin2 {
    margin-top: 40px;
}

.espaco {
    margin-right: 15px;
}


</style>