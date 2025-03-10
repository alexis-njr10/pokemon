import axios from "axios";
import { IHttpService } from "./types.service";
import { notificacionService } from "./notification.service";

class Http implements IHttpService {

    async get<T>(url: string): Promise<T> {
        return await axios.get<T>(url).then(response => response.data).catch(error => {
            notificacionService.Notify({type: 'error', text: error.message});
            throw error;
        });
    }
}

const HttpService = new Http();
export { HttpService };