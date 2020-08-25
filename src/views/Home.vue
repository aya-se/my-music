<template>
  <div class="home">
    <img class="top-icon" src="../assets/icon.png" />
    <transition name="el-fade-in-linear">
      <div id="about">
        <h1><i class="el-icon-info" /> About</h1>
        <p>
          このサイトではaya_seが制作した自作曲を試聴したりDLしたりすることができます。お気軽にご利用ください！
        </p>
        <p>
          <el-button round type="primary" @click="onClick('./music')"
            >音楽一覧へ</el-button
          >
        </p>
        <el-card class="box-card">
          <h3>
            <label for="name"
              ><i class="el-icon-success" /> 無料、商用可能</label
            >
          </h3>
          <p>Youtubeの収益化などにも、大丈夫ではないかと思います。たぶん。</p>
        </el-card>
        <el-card class="box-card">
          <h3>
            <label for="name"
              ><i class="el-icon-s-promotion" /> 自由な使用目的</label
            >
          </h3>
          <p>
            BGMとして使用する限りはコンテンツ内容に制限はありません。おそらく。
          </p>
        </el-card>
        <el-card class="box-card">
          <h3>
            <label for="name"><i class="el-icon-edit" /> 改変OK</label>
          </h3>
          <p>
            尺の調整、切り貼りして繰り返しなど自由に行えます。probably。
          </p>
        </el-card>
        <el-card class="box-card">
          <h3>
            <label for="name"
              ><i class="el-icon-s-comment" /> 感想を是非！</label
            >
          </h3>
          <p>
            曲への意見や感想など歓迎しています！サイトのフォームよりお願いします。
          </p>
        </el-card>
      </div>
    </transition>
    <router-link to="/" class="link-content">
      <h2>aya_se's music</h2></router-link
    >
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    onClick(url) {
      this.$router.push(url);
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
