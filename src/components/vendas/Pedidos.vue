<template>
    <div class="mv">
        <el-row class="lin1" >
            <el-col span="4">
                <div class="l2c1">
                    <i class="fas fa-box-open fa-fw ico"></i>
                    <span class="pedidos"> PEDIDOS </span>
                </div>
            </el-col>
            <el-col span="21">
                <div class="l1c2">
                    <el-input placeholder="Nome do produto" v-model="search" size="large">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </el-col>
        </el-row>
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

.pedidos {
    font-size: 20px;
    color: black ;
    
}

.lin1 {
    display: flex;
    align-items: center;
}

.l2c1 {
    display: flex;
    align-items: center;
    
}



.lin2 {
    margin-top: 40px;
}



</style>