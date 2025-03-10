<template>
  <div class="page-loader-wrapper">
    <div class="loader">
      <div class="m-t-30"><img class="rotate" src="@/assets/img/loading.svg" alt="Logo Pokebola">
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.page-loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: #ffffffe8;
  z-index: 99999999;
}

.page-loader-wrapper p {
  font-size: 13px;
  font-weight: 700;
  color: #777;
  margin-top: 10px
}

img {
  width: 100px !important;
  animation: rotate 2s infinite linear;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>