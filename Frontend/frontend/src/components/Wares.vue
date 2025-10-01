<template>
    <h2 class="title"><br>Warehouse</h2>
    <div class="columns">
        <div class="searching column">
            <h1>Search Field</h1>  
            <input type="text" placeholder="Product Name">
            <input type="text" placeholder="Product Category">
            <input type="text" placeholder="Product Quantity">
            <input type="button" value="Search For Matching Product">
        </div>
        <div class="wares column">
            <p>List of wares</p>
            <ul>
            <li></li>
            <li></li>
            </ul>
        </div>
        <div class="adding column">
            <h1>Adding Area(admin only)</h1>
            <input v-model="name" type="text" placeholder="Product Name">
            <input v-model="category" type="text" placeholder="Product Category">
            <input v-model="quantity" type="text" placeholder="Product Quantity">
            <input type="button" @click="additem" value="Add Product">
            <p v-if="message">{{ message }}</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    data(){
        return { name: "", category: "", quantity: "", AddedAt: "", }
    },
    methods: {
        /*
            method Get all items from db in array

            if item adding is alike anything in array 

            add the count of current to the previous

            else 
            
            just add in normal way 


            async additem(){
            
            axios.fetch("http://localhost:5000/api/products", {
                    name:  this.name,
                    category: this.category,
                    quantity: this.quantity,
                });
            

                
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
        async additem(){
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
    }
};


</script>



<style>
:root {
    --primary-bg: darkkhaki;       /* darkkhaki-like */
    --secondary-bg: #969650;     /* rgb(150, 150, 80) */
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

.column input[type="text"],
.column button {
    width: 100%;
    padding: var(--input-padding);
    margin-bottom: 0.5rem;
    border: none;
    border-radius: var(--border-radius);
}

.column button {
    background-color: #333;
    color: white;
    cursor: pointer;
}

.column ul {
    padding-left: 1rem;
    list-style-type: disc;
}

</style>
