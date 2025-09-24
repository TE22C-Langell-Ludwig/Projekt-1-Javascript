<template>
   <div>
    <h2>Register account</h2>
    <input v-model="email" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <button @click="register">Register</button>
    <div v-if="qr">
      <h3>Scan in Google Authenticator</h3>
      <img :src="qr" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default{
  data(){
    return {email: "", password: "", qr: null};
  },
  methods: {
    async register(){
      const res =await
      axios.post("http://localhost:5000/api/register", {
        email: this.email,
        password: this.password

      });
      this.qr = res.data.qr;
    }
  }
};
</script>
