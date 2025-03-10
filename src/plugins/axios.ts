import axios from 'axios';
import { environment } from '../environments/environment';

axios.defaults.baseURL = environment.BASE_URL_API[environment.MODE ?? 'development'];
axios.defaults.withCredentials = environment.WITH_CREDENTIALS;

