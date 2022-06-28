<template>
  <div class="container">
    <div v-if="viewValid" class="valid-view">
      <app-nav></app-nav>
      <router-view></router-view>
    </div>
    <div v-else class="invalid-view">
      The minimum width of {{minWidth}}px required.
    </div>
  </div>
</template>

<script>
import AppNav from "./components/AppNav.vue";

const MIN_WIDTH = 750;

export default {
  name: "App",
  components: { AppNav },
  data() {
    return {
      viewValid: true,
      minWidth: MIN_WIDTH
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      if (document.body.clientWidth < MIN_WIDTH && this.viewValid) {
        this.viewValid = false;
      } else if (document.body.clientWidth >= MIN_WIDTH && !this.viewValid) {
        this.viewValid = true;
      }
    });
  },
};
</script>

<style scoped>
.container {
  min-width: 100vw;
  min-height: 100vh;
}
.valid-view {
  min-width: 100vw;
  min-height: 100vh;
}
.invalid-view {
  min-width: 100vw;
  min-height: 100vh;
  font-size: 3vw;
  font-weight: bold;
  line-height: 100vh;
  text-align: center;
  word-break: break-all;
}
</style>
