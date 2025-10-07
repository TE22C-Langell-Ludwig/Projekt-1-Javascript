<template>
    
      <h2 class="title"><br>Inventory</h2>
      <div class="searchField">
      <p>Search Field</p>
      <input v-model="searchText" type="text" placeholder="Product Name">
    </div>
    <div class="columns">
        <div class="User column" v-if="isAdmin">
          <h2>Användarhantering</h2>
            <input type="text" v-model="userName" placeholder="Användarnamn" required/>
            <input type="text" v-model="userEmail" placeholder="Email" required/>
            <input type="password" v-model="userPassword" placeholder="Lösenord" required/>
            <p>Admin?</p>
            <input type="checkbox" v-model="userRole">
            <input type="button" @click="addusers" value="Add a user">
            <p v-if="userMessage"></p>
          <ul>
            <li v-for="user in usersList" >user: {{ user.name }} | Admin: {{ user.admin }}</li>
          </ul>
        </div>
        <div class="wares column">
            <p>List of wares</p>
            <ul>
            <li v-for="item in filteredWares">{{ item.name }}, {{ item.quantity }} in stock</li>
            </ul>
        </div>
        <p v-if="addingText"></p>
        <div class="adding column" v-if="isAdmin">
            
            <h1>Adding Area</h1>
            <input v-model="productname" type="text" placeholder="Product Name">
            <input v-model="category" type="text" placeholder="Product Category">
            <input v-model="quantity" type="text" placeholder="Product Quantity">
            <input type="button" @click="additem" value="Add Product">
            <p v-if="produktMessage"> {{ produktMessage }}</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    data(){
        return { itemname: "", category: "", quantity: "", AddedAt: "",warelist: [], searchText: "" , isAdmin:false, addingText:"", usersList:[], userName:"",userEmail:"",userPassword:"",userRole:false}
    },
    mounted(){
      this.updatelist();
      this.getUserRole();
      this.updateusers();
    },
    methods: {
        /*
            method Get all items from db in array

            if item adding is alike anything in array 

            add the count of current to the previous

            else 
            
            just add in normal way 

            const array = Array()

            if (){
            }
            try{
                axios.post("http://localhost:5000/api/products", {
                    name: this.name,
                    category: this.category,
                    quantity: this.quantity,
                });
                this.message = "produkt tillagd";
            } catch {
                this.message = "Någonting gick fel"
            }
        }

        */
        async getUserRole(){
          try{
            this.isAdmin = localStorage.getItem("admin") === "true";
          } catch {
            this.addingText = "Something went wrong you are either not admin or something else happened"
          }
          




        },
        async additem(){
            try{
                await axios.post("http://localhost:5000/api/products", {
                    name: this.productname,
                    category: this.category,
                    quantity: this.quantity,
                });
                this.produktMessage = "Produkt Tillagd";
                this.updatelist();
            } catch {
                this.produktMessage = "Någonting gick fel"
            }
        },
        async updatelist(){
            try {
              const res = await axios.get("http://localhost:5000/api/products");
              this.warelist =res.data;
            } catch (error) {
              console.error("something Went Wrong with updating items")
            }
        },
        async updateusers(){
            try {
              const res = await axios.get("http://localhost:5000/api/users");
              this.usersList =res.data;
            } catch (error) {
              console.error("something Went Wrong with updating users")
            }
        },
        async addusers(){
            try{
                await axios.post("http://localhost:5000/api/users", {
                    name: this.userName,
                    email:this.userEmail,
                    password: this.userPassword,
                    admin: this.userRole,
                });
                this.userMessage = "användare Tillagd";
                this.updateusers();
            } catch {
                this.userMessage = "Någonting gick fel"
            }
        },
    },
    computed: {
        filteredWares() {
            if (!this.searchText) {
                return this.warelist;
            }
            return this.warelist.filter(item =>
                item.name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }
    }
};


</script>



<style>
:root {
  --primary-bg: rgb(189, 183, 107);      
  --secondary-bg: rgb(150, 150, 80);  
  --text-color: #000;
  --title-size: 2.5rem;
  --body-font-size: 1.2rem;
  --input-padding: 8px;
  --container-gap: 2rem;
  --border-radius: 6px;
}

* {
  box-sizing: border-box;
  margin: 0;
  border-radius: 6px;
  font-family: Arial, sans-serif;
  color: var(--text-color);
}

body {
  background-color: var(--primary-bg);
}

#app {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: var(--title-size);
  margin-bottom: 2rem;
  font-weight: bold;
}
.nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.nav a {
  text-decoration: none;
  color: #000000;
  background: #ffffff;
  padding: 6px 12px;
  border-radius: var(--border-radius);
}

.columns {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--container-gap);
}

.column {
  background-color: var(--secondary-bg);
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  padding: 1rem;
  border-radius: var(--border-radius);
}

.column h2 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.column input[type="text"], .column button {
  width: 100%;
  padding: var(--input-padding);
  margin-bottom: 0.5rem;
  border: none;
  border-radius: var(--border-radius);
}
.column input[type="button"]:hover {
  cursor: pointer;
}

.column ul {
  padding-left: 1rem;
  list-style-type: disc;
}
.searchField {
  display: flex;
  justify-content: center;
  flex-direction: column;  
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
  background-color: var(--secondary-bg); 
  width: 30%;
  padding: 10px;
  margin-left: 35%;
} 

.searchField input {
  width: 250px;
  height: 50px;
}
</style>
