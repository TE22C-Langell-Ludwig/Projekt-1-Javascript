<template>
   <div class="register">
    <h2>Register account</h2>
    <input v-model="name" placeholder="Name">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <p>Are you admin?</p>
    <input v-model="admin" type="checkbox" class="admincheck">
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
    return {name: "", password: "", admin:false, qr: null};
  },
  methods: {
    async register(){
      const res =await
      axios.post("http://localhost:5000/api/register", {
        name: this.name,
        email: this.email,
        password: this.password,
        admin: this.admin
      });
      this.qr = res.data.qr;
    }
  }
};
</script>
<style>
.register{
     display: flex;
    flex-direction: column;
    width: 25%;
    background-color: darkkhaki;
    align-content: space-around;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;  
    margin-left: 35%;
    margin-right: 40%;
}
.admincheck{
  width: 10%;


}
body{
  background-color: darkkhaki;
  width: 100%; 
  height: auto;
}
input{

  
}

</style>