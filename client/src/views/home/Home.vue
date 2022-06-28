<template>
  <div class="home">
    <h1 class="title">Serverless Backend Infrastructure</h1>
    <p class="sub-title">
      A NodeJS Based Serverless Backend Solution
    </p>
    <svg-icon name="computer" :width="400" :height="400" color="#409EFF" />
    <div class="button-group">
      <el-button type="primary" class="button" @click="quickStart">Start Coding !!</el-button>
      <el-button  class="button" @click="github">Source Code</el-button>
    </div>
  </div>
</template>

<script>
import { ROUTER_MAP } from "../../router/constant";

export default {
  name: "Home",
  methods: {
    quickStart() {
      this.$router.push(ROUTER_MAP[1]);
    },
    github() {
      window.open('')
    }
  }
};
</script>

<style scoped>
.home {
  width: 100vw;
  text-align: center;
}
.title {
  font-size: 50px;
  line-height: 48px;
  color: #555;
}
.sub-title {
  font-size: 30px;
  line-height: 28px;
  color: #888;
}
.button-group {
  padding: 80px 0 50px 0;
}
.button {
  margin: 0 40px;
  width: 150px;
  height: 50px;
  font-size: 16px;
}
</style>
