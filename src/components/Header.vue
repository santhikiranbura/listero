<template>
    <Menubar class="bg-white"  >
    <template #start>
        <router-link to="/" >
            <img alt="logo" src="../assets/Listero.png" height="40" class="mr-2"> 
        </router-link>
    </template>
    </Menubar>
</template>

<script>
    export default{
        name: 'Header',
        
    }
</script>
