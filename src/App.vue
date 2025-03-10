<template>
  <toast />
  <component v-if="loading" :is="Variants['default']" />
  <router-view></router-view>

</template>
<script setup lang="ts">
import { inject, onBeforeMount } from 'vue';
import { Variants } from './app/loading/index';
import { environment } from './environments/environment';
const loading = inject('loading');

onBeforeMount(() => {
  validVersion();
})

const validVersion = () => {
  const version = environment.version[environment.MODE ?? 'development']
  if (localStorage.hasOwnProperty("version")) {
    if (localStorage.getItem("version") != version) {
      clearSiteData();
      localStorage.setItem("version", version);
    }
  } else {
    clearSiteData();
    localStorage.setItem("version", version);
  }
}

const clearSiteData = async () => {
  localStorage.clear();
  sessionStorage.clear();
  const keys = await window.caches.keys();
  await Promise.all(keys.map(key => caches.delete(key)));
  window.indexedDB.databases().then(dbs => dbs.forEach((db: any) => indexedDB.deleteDatabase(db.name)))
  document.cookie.replace(/(?<=^|;).+?(?==|;|$)/g, name => location.hostname.split('.').reverse().reduce(domain => (domain = domain.replace(/^.?[^.]+/, ''), document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`, domain), location.hostname));
  location.reload();
}
</script>
