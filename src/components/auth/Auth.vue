<template>
    <div class="auth">
        <div class="tela">
            <div class="conteudo">
                <v-img max-height="300" max-width="300" src="http://localhost:3333/files/default2.png"></v-img>
                <div v-if="visible" @click="troca" class="botao">E-MAIL</div>
                <div v-if="visible" @click="troca" class="botao2 espaco">SENHA</div>
                <div v-if="!visible" class="inputs">
                    <el-input v-model="login.email" name="email" class="inputslogin" placeholder="E-MAIL" clearable></el-input>
                    <el-input v-model="login.senha" name="password" type="password" class="inputslogin espaco" placeholder="SENHA" clearable></el-input>
                </div>
                <a class="end">Esqueceu a senha?</a>
                <button @click="getLogar" class="entrar">ENTRAR</button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import { baseApiurl, userKey } from '@/global'

export default {

    name: 'auth',

    data() {
      return {
        visible: true,
        login: {},
        session: {}
      }
    },

    methods: {

        troca() {
            this.visible = !this.visible;
        },

        sucesso() {
            this.$message({
            showClose: true,
            message:`Seja bem vindo, ${this.session.user.nome}!`,
            type: 'success',
            });
        },

        email() {
            this.$message({
            showClose: true,
            message:'Opps, informe seu e-mail.',
            type: 'error',
            });
        },

        senha() {
            this.$message({
            showClose: true,
            message:'Opps, informe sua senha.',
            type: 'error',
            });
        },

        erroAuth() {
            this.$message({
            showClose: true,
            message:'Oops, email ou senha incorretas.',
            type: 'error',
            });
        },

        verificar() {
            if(!this.login.email) {
                this.email()
                return false;
            }
            if(!this.login.senha) {
                this.senha()
                return false;
            }
            return true
        },

        getLogar() {
            if(this.verificar()) {
                axios.post(`${baseApiurl}/sessions`, this.login)
                .then((res) => {
                    this.session = res.data
                    this.$store.commit('login', this.session);
                    localStorage.setItem(userKey, JSON.stringify(this.session))
                    this.$router.push({ path: '/vendas'})
                    this.sucesso()
                })
                .catch(() => {
                    this.erroAuth();
                })
            }
        },
    }, 
}
</script>

<style scoped>

    .auth {
        display: flex;
        justify-content: center;
        height: 100vh;
        background-image: url(../../assets/Login1.jpg) ;
        background-size: cover;
    }

    .tela {
        margin: 40px;
        padding: 20px;
        width: 420px;
        box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
        background: white;
        border-radius: 20px;
    }

    .conteudo {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .botao {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #82D4D1;
        color: white;
        height: 40px;
        width: 300px;
        border: none;
        border-radius: 5px;
    }

    .botao2 {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        color: #82D4D1;
        height: 40px;
        width: 300px;
        border-style: solid;
        border-radius: 5px;
    }
    
    .espaco {
        margin-top: 15px;
    }

    .inputslogin {
        width: 300px;
    }

    .inputs {
        
        animation: flipInX;
        animation-duration: 1s;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .end {
        margin-top: 10px;
        display: flex;
        width: 300px;
        justify-content: flex-end;
        text-decoration: none;
        color: #82D4D1;
    }

    .entrar {
        width: 150px;
        height: 45px;
        color: white;
        background-color: #F4CB68;
        margin-top: 40px;
        border: none;
        border-radius: 5px;
        text-decoration: none;
    }

    .entrar:hover {
        color: white;
        background-color: #F4CB68;
    }

</style>
