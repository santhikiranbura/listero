<template>
    <div class="h-screen"  >
        <div class="list" style="padding-bottom: 100px;" >
            <div class="surface-section px-4 py-5 md:px-6 lg:px-8 ">
                <div class="flex align-items-start mb-4 justify-content-between flex-row">
                    <div>
                        <div class="font-medium text-3xl capitalize text-900">{{ listname }}</div>
                        <div class="flex align-items-center text-700 flex-wrap">
                            <div class="mr-5 flex align-items-center mt-3">
                                <i class="pi pi-shopping-bag mr-2"></i>
                                <span>{{ items.length }} items</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 lg:mt-0">
                        <Button type="button"  class="p-button-outlined p-button-rounded " icon="pi pi-fw pi-cog" @click="toggle" />
                        <Menu ref="menu" :model="menuOptions" :popup="true" />
                    </div>
                </div>
                <DataTable
                    :value="items"
                    dataKey="id"
                    :paginator="true"
                    :rows="7"
                    :paginatorTemplate="{
                        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                        '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                        '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                        default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown'
                    }"
                    responsiveLayout="scroll"
                    :scrollable="true" scrollHeight="400px" :loading="loading"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                
                >
                    <Column field="name" sortable header="Name" header-style="width:26rem"></Column>
                    <Column field="quantity" sortable header="Quantity" headerStyle="width:2rem"></Column>
                    <Column field="unit" header="Unit" headerStyle="width:2rem"></Column>
                    <Column headerStyle="width: 2em"  bodyStyle="text-align: center">
                        <template #body="{data}">
                            <Button class="p-button-danger p-button-rounded" @click="deleteItem(data.id)" type="button" icon="pi pi-fw pi-trash"></Button>
                        </template>
                    </Column>

                    <template #paginatorstart>
                        <Button type="button" icon="pi pi-refresh" class="p-button-text" />
                    </template>
                    <template #paginatorend>
                        <Button type="button" icon="pi pi-cloud" class="p-button-text" />
                    </template>
                </DataTable>
            </div>
        </div>

        <div class="bottom-0 fixed z-5 pt-2 w-full bg-indigo-100 shadow-2">
            <div class="grid p-fluid  surface-card mx-auto  w-full lg:w-6">
                <div class="col-9 bg-indigo-100">
                    <div class="grid ">
                        <div class="col-8">
                            <div class="p-inputgroup">
                            <InputText autofocus="true" id="listName" v-model="listName" :model-value="listNameValue" list="names" placeholder="Sugar" name="listName" type="text" />
                            <datalist id="names" >
                                <option v-for="name in names" v-bind:key="name">
                                {{ name }}
                                </option>
                            </datalist>
                            </div>
                        </div>
                        <div class="col-4 -ml-2">
                            <div class="p-inputgroup">
                            <InputNumber v-model="quantity"  :model-value="listQuantityValue"  name="quantity" type="tel" min="1" pattern="\d*"  placeholder="0" /> 
                            </div>
                        </div>
                        <div class="col-12 -my-2 units">
                            <RadioButton v-model="unit"  input-id="kg" name="unit" value="kg" />
                            <label for="kg">kg</label>
                            <RadioButton v-model="unit" input-id="gm" name="unit" value="gm" />
                            <label for="gm">gm</label>
                            <RadioButton v-model="unit" input-id="l" name="unit" value="l" />
                            <label for="l">l</label>
                            <RadioButton v-model="unit" input-id="ml" name="unit" value="ml" />
                            <label for="ml">ml</label>
                            <RadioButton v-model="unit" input-id="item" name="unit" value="item" />
                            <label for="item">item</label>
                        </div>
                    </div>
                </div>
                <div class="col-3 text-center bg-indigo-100 pt-4 pr-2 pl-0 b">
                    <Button icon="pi pi-plus" class="p-button-rounded p-button-raised"  @click="addItem()">
                    </Button>
                </div>
            </div>
        </div>
    </div>
    <Toast position="bottom-right" class="mb-7" :breakpoints="{'920px': {width: '100%', right: '0', left: '0',bottom:'50px'}}" />
</template>
<style  scoped>

</style>
<script>
import { uuid } from 'vue-uuid'; 
import names from '../assets/data.json';
    export default{
        name:'List',
        props:{
            db:Object
        },
        data(){
            return{
                listname: this.$route.query.listname,
                unit:'kg',
                items:[],
                menuOptions: [
                    {
                        label: 'Options',
                        items: [{label: 'Delete', icon: 'pi pi-fw pi-trash', command:()=>{
                            this.deleteList()
                        } }]
                    }
                ],
                names:names
            }
        },
        created(){
            if(this.db!=null){
                this.items = this.db[this.listname];
            }
        },
        methods:{
            addItem(){
                if(this.listName && this.quantity){
                    const item = {
                        "name":this.listName,
                        "quantity": this.quantity,
                        "unit": this.unit,
                        "id":uuid.v4()
                    };
                    this.items.push(item);
                    this.updateItems();
                    this.$emit("update:listNameValue",'')
                    this.$emit("update:listQuantityValue",'')
                }else{
                    alert("Name and quantity are must");
                }
            },
            updateItems(){
                this.$emit("updateItems",this.items,this.listname)
            },
            deleteItem(id){
                this.items = this.items.filter((item)=>{
                    return item.id!=id;
                });
                console.log(this.items);
                this.updateItems();
            },
            deleteList(){
                this.$emit("deleteList",this.listname)
            },
            toggle(event) {
                this.$refs.menu.toggle(event);
            }

        }
    }
</script>