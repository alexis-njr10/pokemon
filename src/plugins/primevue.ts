import app from '../app';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Skeleton from 'primevue/skeleton';
import DataTable from 'primevue/datatable';
import Select from 'primevue/select';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Dialog from 'primevue/dialog';
import DynamicDialog from 'primevue/dynamicdialog';
import DialogService from 'primevue/dialogservice';


app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.component("toast", Toast)
app.component("skeleton", Skeleton)
app.component("p-datatable", DataTable)
app.component("p-select", Select)
app.component("p-column", Column)
app.component("p-inputtext", InputText)
app.component("p-iconfield", IconField)
app.component("p-inputicon", InputIcon)
app.component("p-dialog", Dialog)
app.component("p-dynamic-dialog", DynamicDialog)



