<script setup></script>

<template>
  <div class="" id="app">
    <nav class="bar">
      <RouterLink to="/Register">Register page</RouterLink>
      <RouterLink to="/Login">Login page</RouterLink>
      <RouterLink to="/Wares">Warehouse page</RouterLink>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.bar {
  flex-direction: row;
  display: flex;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: x-large;
  gap: 20px;
  width: 45%;
  height: 45px;
  margin-left: 25%;
  margin-right: 25%;
  border: 2px, solid cornflowerblue;
  background-color: aliceblue;
  align-items: center;
  justify-content: space-evenly;
  
}
</style>
