import axios from 'axios';
import { ref } from 'vue';

export const loading = ref(false);

export const setLoading = (value: boolean) => {
    loading.value = value;
};

axios.interceptors.request.use((config) => {
    loading.value = true;
    return config;
}, (error) => {
    loading.value = false;
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    loading.value = false;
    return response;
}, (error) => {
    loading.value = false;
    return Promise.reject(error);
});