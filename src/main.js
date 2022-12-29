import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import Menu from 'primevue/menu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import "primeflex/primeflex.css";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component('InputText',InputText)
app.component('Dropdown',Dropdown)
app.component('InputNumber',InputNumber)
app.component('Toast',Toast)
app.component('Button',Button)
app.component('RadioButton',RadioButton)
app.component('Menu',Menu)
app.component('DataTable',DataTable)
app.component('Column',Column)
app.component('Menubar',Menubar)
app.component('Dialog',Dialog)

app.mount('#app');
