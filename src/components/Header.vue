<template>
  <div id="header">
    <header id="tab" class="tab">
      <router-link to="/" class="link-content">
        <h1>aya_se's music</h1></router-link
      >
      <el-menu mode="horizontal">
        <el-menu-item index="1" class="menu-item"
          ><router-link to="/" class="link-content">
            About</router-link
          ></el-menu-item
        >
        <el-menu-item index="2" class="menu-item"
          ><router-link to="/Music" class="link-content">
            Music</router-link
          ></el-menu-item
        >
        <el-menu-item index="3" class="menu-item"
          ><router-link to="/Info" class="link-content">
            Info</router-link
          ></el-menu-item
        >
      </el-menu>
    </header>
  </div>
</template>

<script>
export default {
  name: "my-header"
};
</script>

<style scoped>
#header {
  width: 100%;
  height: auto;
  z-index: 100;
  background-color: white;
}
.menu-item {
  width: 33.33333%;
}
.link-content {
  text-decoration: none;
  color: #2c3e50;
}
.link-content:visited {
  color: #2c3e50;
}
.link-content:hover {
  color: orange !important;
}
</style>
