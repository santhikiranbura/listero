<template>
  <div>
    <Header></Header>
    <router-view 
    :db="db" 
    @addList="addList" 
    @deleteList="deleteList"
    @updateItems="updateItems" 
     />
  </div>
</template>
<style scoped>

</style>
<script>
import Header from './components/Header';
if(localStorage.getItem("user")==null){
  localStorage.setItem("guest",JSON.stringify({
        "groceries":[
          {
            "id":1,
            "name": "sugar",
            "quantity": 3,
            "unit": "kg"
          }
        ]
    }));
  localStorage.setItem("user","guest");
}

const user = localStorage.getItem("user");
var db  = JSON.parse(localStorage.getItem(user));
export default {
  name: 'App',
  components: {
    Header,
},
  data(){
    return {
      db:db,
    }
  },
  created(){
    this.db = db
  },
  methods:{
    addList(listname){
        this.db[listname] = [];
        localStorage.setItem(user,JSON.stringify(this.db));
    },
    deleteList(listname){
      if(window.confirm("Do you really want to delete "+listname)){
        delete this.db[listname];
        localStorage.setItem(user,JSON.stringify(this.db));
        this.$router.push("/");
      }
    },
    updateItems(items,listname){
      this.db[listname] = items;
      localStorage.setItem(user,JSON.stringify(this.db));
    }
  }
}
</script>

