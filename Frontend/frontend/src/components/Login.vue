<template>
    <div>
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
                this.message = "inlogning lyckades token: " + res.data.token;
            } catch {
                this.message = "felaktiga uppgifter eller 2FA-kod"
            }
        }
    }
};
</script>