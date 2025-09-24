<script setup></script>

<template>
  <div class="" id="app">
    <nav class="bar">
      <RouterLink to="/Register">Register page</RouterLink>
      <RouterLink to="/Login">Login page</RouterLink>
      <RouterLink to="/Wares">Warehouse page</RouterLink>
    </nav>
    <router-view/>
  </div>

</template>

<style scoped>
.bar{
flex-direction: row;
display: flex;
width: 50%;
font-family: Verdana, Geneva, Tahoma, sans-serif;
font-size: x-large;
gap: 20px;
}


</style>
 