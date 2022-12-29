<template>
    <div class="h-screen"  >
        <div class="list"  >
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
                    :scrollable="true" scrollHeight="400px" 
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                
                >
                    <Column field="name" sortable header="Name" headerStyle="width:250px" bodyStyle="width:250px;word-break:break-all;" ></Column>
                    <Column field="quantity" sortable header="Quantity" headerStyle="width:150px" ></Column>
                    <Column field="unit" header="Unit" headerStyle="width:50px" ></Column>
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
        <form ref="addItemForm">
        <Dialog header="Add New Item" class="z-5" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <div class="grid pt-1">
                <div class="col-12">
                    <div class="grid">
                        <div class="col-8">
                            <div class="p-inputgroup">
                                <InputText   id="listName" v-model="listName" 
                                list="names" placeholder="Sugar" name="listName"  />
                                <datalist id="names" >
                                    <option v-for="name in names" v-bind:key="name">
                                    {{ name }}
                                    </option>
                                </datalist>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="p-inputgroup">
                                <InputNumber v-model="quantity"  name="quantity" type="tel" pattern="[0-9]*"  placeholder="Quantity"    /> 
                            </div>
                        </div>
                        <div class="col-12 units">
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
            </div>   
            <template #footer>
                <Button label="Add" icon="pi pi-plus" @click="addItem()"  />
            </template>
        </Dialog>
    </form>
        <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px', zIndex:'1'}" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>Item Name and Quantity are required</span>
            </div>
            <template #footer>
                <Button label="ok" icon="pi pi-check" @click="()=>{this.displayConfirmation = false}" class="p-button-text" autofocus />
            </template>
        </Dialog>
    </div>
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
                        label: 'New',
                        items:[
                            {
                                label: 'Add Item',
                                icon: 'pi pi-fw pi-plus',
                                command:()=>{
                                    this.displayModal = true
                                }
                            }
                        ]
                    },
                    {
                        label: 'Options',
                        items: [
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-trash',
                                command:()=>{
                                    this.deleteList()
                                },
                            }
                        ]
                    }
                ],
                listName:'',
                quantity: undefined,
                names:names,
                displayModal:false,
                displayConfirmation:false
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
                    this.listName='',
                    this.quantity=undefined,
                    this.$refs.addItemForm.reset(); 
                    this.$toast.add({severity:'success', summary: 'Success', detail:`${item.name} ${item.quantity} ${item.unit} added`, life: 3000});
                }else{
                    this.displayConfirmation = true;
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