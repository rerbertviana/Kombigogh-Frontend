<template>  
<div class="mv">
    <div class="form">
        <el-row class="titulo cor">USUARIOS</el-row>
        <el-row class="alinhar">
            <el-col :span="24" class="l1c1">
                <i class="fas fa-users fa-fw ico"></i>
                <span class="letras">LISTAR TODOS OS USUÁRIOS</span>
                <a :href="getPDF()" target="_blank" class="blink cor"> GERAR </a>
            </el-col>
        </el-row>
    </div>
</div>
  
</template>

<script>

export default {
  name: "Minhasvendas",
  data() {
    return {
      
    };
},

  
  methods: {
    

    getPDF(){
      return `http://localhost:3333/pdfusers`;
    }
    
  },

};
</script>

<style scoped>

.mv {
    margin-top: 40px;
    margin-right: 60px;
    margin-left: 60px;
    margin-bottom: 60px;
}

.form {
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
}

.alinhar {
  display: flex;
  align-items: center;
}

.l1c1 {
    display: flex;
    align-items: center;
    justify-content: center;
}

.titulo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    border-radius: 5px;
    height: 40px;
    color: white;
}

.cor {
  background-color: #FFB790;
}


.ico {
    margin-right: 15px;
    color: black;
    font-size: 1.2rem;
}

.ico2 {
    margin-left: 15px;
    margin-right: 15px;
    color: black;
    font-size: 1.2rem;
}

.letras {
  margin-right: 15px;
}

.botao {
  margin-left: 15px;
  width: 100px;
  height: 40px;
  color: white;
}

.blink {
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}

.espaco {
  margin-right: 10px;
}

.alinhar {
  display: flex;
  align-items: center;
}

</style>