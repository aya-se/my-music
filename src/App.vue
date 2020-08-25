<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "app",
  components: { Header }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");
#app {
  font-family: "Noto Sans JP", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
