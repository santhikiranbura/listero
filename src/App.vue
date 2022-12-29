<template>
  <div>
    <Header></Header>
    <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px', zIndex:'1'}" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>Are you sure you want to delete {{listname}}?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="()=>{this.displayConfirmation = false}" class="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" @click="deleteNow()" class="p-button-text" autofocus />
            </template>
        </Dialog>
    <router-view 
    :db="db" 
    @addList="addList" 
    @deleteList="deleteList"
    @updateItems="updateItems" 
     />
     <Toast position="bottom-right" class="z-0" :breakpoints="{'920px': {width: '100%', right: '0', left: '0',bottom:'50px'}}" />
    
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
      displayConfirmation: false,
      listname:''
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
      this.listname = listname;
      this.displayConfirmation = true;
    },
    deleteNow(){
      delete this.db[this.listname];
      localStorage.setItem(user,JSON.stringify(this.db));
      this.$toast.add({severity:'success', summary: 'Success', detail:`Successfully deleted ${this.listname}`, life: 3000});
      this.$router.push("/");
      this.displayConfirmation = false;

    },
    updateItems(items,listname){
      this.db[listname] = items;
      localStorage.setItem(user,JSON.stringify(this.db));
    }
  }
}
</script>

