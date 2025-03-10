<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Error } from "../../models/error.model";

const route = useRoute();
const router = useRouter();
const error = ref<Error>({ code: '', title: '', text: ''});

onBeforeMount(() => {
    error.value.code = route.query.code ? route.query.code.toString() : '404';
    error.value.title = route.query.title ? route.query.title.toString() : 'No se encontro el recurso';
    error.value.text = route.query.text ? route.query.text.toString() : 'No se pudo encontar el recurso solicitado'; 
})
    


</script>
<template>
    <section class="p-0 bg-img cover-background">
        <div class="container-fluid d-flex flex-column">
            <div class="row align-items-center justify-content-center min-vh-100">
                <div class="col-md-9 col-lg-6 my-5">
                    <div class="text-center error-page">
                        <h1 class="glitch">{{ error.code }}</h1>
                        <h2 class="mb-4" style="color: #F05826;"><b>{{ error.text }}</b></h2>
                        <p class="w-sm-80 mx-auto mb-4" style="color: #F05826;"><b>Se presento un error al acceder al recuso por favor regresa al inicio</b></p>
                        <div>
                            <a href="javascript:void(0)" @click="router.push({ name: 'pokedex'})" class="btn btn-success btn-lg me-sm-2 mb-2 mb-sm-0">Regresar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import "@/assets/scss/error.scss";
</style>