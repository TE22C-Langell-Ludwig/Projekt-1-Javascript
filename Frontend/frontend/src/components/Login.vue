<template>
    <div class="login">
        <h2>Log in</h2>
        <input v-model="email" placeholder="email">
        <input v-model="password" type="password" placeholder="Password"> 
        <input v-model="token" placeholder="2FA code">
        <button @click="login">Log in</button>
        <p v-if="message">{{ message }}</p>
    </div>
</template>
<script>

import axios from 'axios';
export default{
    data(){
        return { email: "", password: "", token: "", message: "", }
    },
    methods: {
        async login(){
            try{
                const res = await
               axios.post("http://localhost:5000/api/login", {
                    email: this.email,
                    password: this.password,
                    token: this.token

                });
                this.message = "inloggning lyckades";
                localStorage.setItem("admin", res.data.admin);
            } catch {
                this.message = "felaktiga uppgifter eller 2FA-kod"
            }
        }
    }
};
</script>
<style>
.login{
    display: flex;
    flex-direction: column;
    width: 25%;
    height: 30%;
    background-color: darkkhaki;
    align-content: space-around;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;  
    margin-left: 35%;
    margin-right: 40%;
    font-size: 250%;
}
html{
    height: auto;
}
div{
    height: auto;
}
input{
    margin: 5px;
}
button{
    margin-top: 3px;
}
button:hover {
    cursor: pointer;
}
</style>