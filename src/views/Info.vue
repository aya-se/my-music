<template>
  <div class="info">
    <transition name="el-fade-in-linear">
      <div id="account">
        <h1><i class="el-icon-menu" /> Account</h1>
        <el-card class="box-card2" shadow="hover">
          <el-link target="_blank" href="https://twitter.com/ayase_lab"
            ><h3>Twitter</h3></el-link
          >
          <p>
            <img class="box-image" src="../assets/twitter.png" />
          </p>
        </el-card>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div id="contact">
        <h1><i class="el-icon-folder" /> Software</h1>
        <el-card class="box-card2" shadow="hover">
          <el-link
            target="_blank"
            href="https://www.mi7.co.jp/products/presonus/studioone/"
            ><h3>Studio One 4 Professional</h3></el-link
          >
          <p>
            <img class="box-image" src="../assets/studio_one.png" />
          </p>
        </el-card>
        <el-card class="box-card2" shadow="hover">
          <el-link
            target="_blank"
            href="https://sonicwire.com/product/virtualsinger/special/mikunt"
            ><h3>初音ミクNT</h3></el-link
          >
          <p>
            <img class="box-image" src="../assets/hatsune_miku.png" />
          </p>
        </el-card>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div id="contact">
        <h1><i class="el-icon-s-comment" /> Contact</h1>
        GmailもしくはTwitterがおそらく一番反応早いと思うので、載せておきます。
        <p><b>Gmail： </b>kakkeno1@gmail.com</p>
        <p><b>Twitter： </b>@ayase_lab</p>
      </div>
    </transition>
    <router-link to="/" class="link-content">
      <h2>aya_se's music</h2></router-link
    >
  </div>
</template>

<script>
export default {
  name: "info",
  data() {
    return {};
  },
  methods: {
    onClick(url) {
      window.open(url, "_blank");
    }
  }
};
</script>
<style scoped>
.home {
  overflow: hidden;
}
.link-content {
  text-decoration: none;
  color: #2c3e50;
}
.link-content:visited {
  color: #2c3e50;
}
.link-content:hover {
  color: orange;
}
@media screen and (max-width: 480px) {
  .box-card {
    display: inline-block;
    width: 90%;
    height: auto;
    margin: 10px;
  }
  .box-card3 {
    display: inline-block;
    width: 90%;
    height: auto;
    margin: 10px;
  }
}
@media screen and (min-width: 480px) {
  .box-card {
    display: inline-block;
    width: 400px;
    height: auto;
    margin: 10px;
  }
  .box-card3 {
    display: inline-block;
    width: 400px;
    height: auto;
    margin: 10px;
  }
}
.box-card2 {
  display: inline-block;
  width: 260px;
  height: auto;
  margin: 10px;
}
.box-image {
  height: 160px;
}
.timeline {
  width: auto;
  height: auto;
  font-size: 20px;
  padding-top: 20px;
  margin-right: 20px;
}
.tag {
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
}
.web-button {
  margin-bottom: 5px !important;
}
</style>
