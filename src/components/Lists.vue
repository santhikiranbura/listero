<template>
    <div class="h-screen overflow-scroll">
    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div class="grid" >
            <div class="col-12 md:col-6 lg:col-3"  v-for="listname in Object.keys(db)" v-bind:key="listname" >
                <div class="surface-card shadow-1 hover:shadow-4 transition-duration-300 cursor-pointer p-3 border-round"  @click="goToList(listname)">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block capitalize text-black font-medium mb-3">{{ listname }}</span>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-indigo-100 border-round" style="width:2.5rem;height:2.5rem">
                            <i class="pi pi-shopping-bag text-indigo-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-500"><span class="text-green-500 font-medium">{{ db[listname].length }} </span> items</span>
                </div>
            </div>
        </div>
    </div>
    <div class="surface-card p-4 mx-auto mt-4 shadow-2 border-round w-full lg:w-6">
        <div >
            <label for="listname" class="block text-900 font-medium mb-2">List Name</label>
            <InputText id="listname" type="text" v-model="listname" name="listname" placeholder="Enter List Name" class="w-full mb-3" />
            <Button label="Add List" @click="addList()" icon="pi pi-list" class="w-full"></Button>
        </div>
    </div>
    </div>
</template>
<script>
    export default{
        name: "Lists",
        props:{
            db: Object,
            title: String,
            showLists:Boolean
        },
        methods:{
            addList(){
                this.$emit('addList',this.listname);
                this.listname='';
            },
            goToList(listname){
                this.$router.push({ name: 'List', query: { listname: listname } });
                console.log(listname);
            }
        }
    }
</script>