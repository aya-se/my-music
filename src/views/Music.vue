<template>
  <div class="music">
    <div id="search">
      <h1><i class="el-icon-search" /> Search</h1>
      <p>
        タグや曲名から、表示する音楽を絞り込むことが出来ます！
        <el-switch v-model="isSearch" active-text="表示" inactive-text="非表示">
        </el-switch>
      </p>
      <el-collapse-transition>
        <div v-if="isSearch">
          <el-alert type="success" show-icon :closable="false"
            ><b>検索タグ</b
            >にタグを登録すると、そのタグが登録されている音楽のみが表示されます。</el-alert
          >
          <el-alert type="error" show-icon :closable="false"
            ><b>除外タグ</b
            >にタグを登録すると、そのタグが登録されている音楽が全て非表示になります。</el-alert
          >
          <el-card class="box-card" shadow="hover"
            ><el-alert type="default" show-icon :closable="false"
              ><b>タグ一覧</b>
              ：タグをクリックするとタグの属性が変化します(→未登録→検索タグ→除外タグ→の順)</el-alert
            >
            <div class="tag-list" v-for="t in tags" :key="t.id">
              <el-button
                v-if="t.state === 0"
                class="tag"
                plain
                size="mini"
                type="default"
                @click="onClickTag(t.id, 1)"
                >{{ t.name }}</el-button
              >
              <el-button
                v-if="t.state === 1"
                class="tag"
                size="mini"
                type="success"
                @click="onClickTag(t.id, 2)"
                >{{ t.name }}</el-button
              >
              <el-button
                v-if="t.state === 2"
                class="tag"
                size="mini"
                type="danger"
                @click="onClickTag(t.id, 0)"
                >{{ t.name }}</el-button
              >
            </div>
            <el-alert type="default" show-icon :closable="false"
              ><b>曲名検索</b
              >：入力した曲名が部分一致するような曲のみを表示します
            </el-alert>
            <p>
              <el-form label-width="auto">
                <el-form-item label="曲名">
                  <el-input v-model="musicName"></el-input>
                </el-form-item>
              </el-form>
            </p>
            <el-alert type="default" show-icon :closable="false"
              ><b>並び替え</b>
            </el-alert>
            <p>
              <el-radio-group v-model="radio" @change="onSort(radio)">
                <el-radio :label="0">新しい順</el-radio>
                <el-radio :label="1">古い順</el-radio>
                <el-radio :label="2">曲が長い順</el-radio>
                <el-radio :label="3">曲が短い順</el-radio>
              </el-radio-group>
            </p>
          </el-card>
        </div>
      </el-collapse-transition>
    </div>
    <div id="music">
      <h1><i class="el-icon-headset" /> Music</h1>
      <div v-for="m in musics" :key="m[0]">
        <transition name="el-fade-in-linear">
          <el-card
            class="box-card"
            shadow="hover"
            v-if="m[1].includes(musicName) && isShow[Number(m[0])]"
          >
            <div class="card-top">
              <div class="card-content1">
                <h3 class="music-title">
                  <i class="el-icon-caret-right" />{{ m[1] }}
                </h3>
                <p style="margin-left:10px;">
                  <i class="el-icon-date" />{{ m[3] }}
                  <i class="el-icon-time" />{{ m[4] }}
                </p>
              </div>
              <div class="card-content2">
                <el-button
                  v-if="!isPlaying || playingMusicName !== m[1]"
                  type="primary"
                  icon="el-icon-video-play"
                  circle
                  @click="onPlay(m[1], m[2])"
                />
                <el-button
                  v-if="isPlaying && playingMusicName === m[1]"
                  type="primary"
                  icon="el-icon-video-pause"
                  circle
                  @click="onPause()"
                />
                <el-button
                  v-if="m[5] == 1"
                  type="primary"
                  icon="el-icon-download"
                  circle
                  @click="onDownload(m[2], m[1])"
                />
                <el-button
                  v-if="m[5] == 0"
                  type="primary"
                  icon="el-icon-download"
                  disabled
                  circle
                />
                <el-button
                  v-if="m[6].length > 70 && !expander[Number(m[0])]"
                  type="primary"
                  icon="el-icon-chat-dot-round"
                  @click="onExpand(Number(m[0]), true)"
                  circle
                />
                <el-button
                  v-if="m[6].length > 70 && expander[Number(m[0])]"
                  type="primary"
                  icon="el-icon-close"
                  @click="onExpand(Number(m[0]), false)"
                  circle
                />
                <el-button
                  v-if="m[6].length <= 70"
                  type="primary"
                  icon="el-icon-chat-dot-round"
                  disabled
                  circle
                />
              </div>
            </div>
            <el-alert
              :closable="false"
              type="default"
              style="width:100% !important;padding:0px !important;"
            >
              <p
                class="tag-list"
                v-for="(t, j) in musicTag[Number(m[0])]"
                :key="j"
              >
                <el-tag
                  class="tag2"
                  v-if="t === 1"
                  type="info"
                  effect="plain"
                  size="mini"
                  >{{ tags[j].name }}</el-tag
                >
              </p>
            </el-alert>
            <div v-if="m[6].length > 70">
              <p class="music-text" v-if="!expander[Number(m[0])]">
                {{ m[6].slice(0, 70) }}...
              </p>
              <p class="music-text" v-if="expander[Number(m[0])]">
                {{ m[6] }}
              </p>
            </div>
            <div v-if="m[6].length <= 70">
              <p class="music-text">{{ m[6] }}</p>
            </div>
          </el-card>
        </transition>
      </div>
    </div>
    <div style="width:100%;height:150px;" />
    <audio id="audio" src="" preload="auto" loop />
    <div class="player" v-if="isPlayer">
      <h3><i class="el-icon-loading" /> {{ playingMusicName }}</h3>
      <p>
        <el-slider
          class="music-player"
          v-model="musicTimeRate"
          :show-tooltip="false"
          @change="onSliderChange()"
        ></el-slider>
        <el-button
          v-if="!isPlaying"
          class="player-button"
          type="primary"
          icon="el-icon-video-play"
          circle
          @click="
            onPlay(playingMusicName, '/music/' + playingMusicName + '.mp3')
          "
        />
        <el-button
          v-if="isPlaying"
          class="player-button"
          type="primary"
          icon="el-icon-video-pause"
          circle
          @click="onPause()"
        />
        {{ Math.floor(musicNowTime / 60) }}:{{
          Math.floor((musicNowTime % 60) / 10)
        }}{{ Math.floor((musicNowTime % 60) % 10) }}/{{
          Math.floor(musicLength / 60)
        }}:{{ Math.floor((musicLength % 60) / 10)
        }}{{ Math.floor((musicLength % 60) % 10) }}
      </p>
    </div>
  </div>
</template>

<script>
function getCsv(url) {
  //CSVファイルを文字列で取得。
  var txt = new XMLHttpRequest();
  txt.open("get", url, false);
  txt.send();

  //改行ごとに配列化
  var arr = txt.responseText.split("\n");

  //1次元配列を2次元配列に変換
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    //空白行が出てきた時点で終了
    if (arr[i] == "") break;

    //","ごとに配列化
    res[i] = arr[i].split(",");
  }

  return res;
}
export default {
  name: "music",
  components: {
    //VuetifyAudio: () => import("vuetify-audio")
  },
  data() {
    return {
      isSearch: true,
      isPlayer: false,
      isSliding: false,
      isPlaying: false,
      radio: 0,
      musicName: "",
      musicLength: 0,
      musicNowTime: 0,
      musicTimeRate: 0,
      playingMusicName: "",
      prevTime: 0,
      expander: [],
      isShow: [],
      tags: [
        { id: 0, name: "明るい", state: 0 },
        { id: 1, name: "楽しい", state: 0 },
        { id: 2, name: "温かい", state: 0 },
        { id: 3, name: "穏やか", state: 0 },
        { id: 4, name: "優しい", state: 0 },
        { id: 5, name: "爽やか", state: 0 },
        { id: 6, name: "お洒落", state: 0 },
        { id: 7, name: "力強い", state: 0 },
        { id: 8, name: "弱々しい", state: 0 },
        { id: 9, name: "懐かしい", state: 0 },
        { id: 10, name: "不思議", state: 0 },
        { id: 11, name: "騒々しい", state: 0 },
        { id: 12, name: "可愛い", state: 0 },
        { id: 13, name: "渋い", state: 0 },
        { id: 14, name: "シリアス", state: 0 },
        { id: 15, name: "緊張感", state: 0 },
        { id: 16, name: "慎ましい", state: 0 },
        { id: 17, name: "寂しい", state: 0 },
        { id: 18, name: "切ない", state: 0 },
        { id: 19, name: "冷たい", state: 0 },
        { id: 20, name: "暗い", state: 0 },
        { id: 21, name: "悲しい", state: 0 },
        { id: 22, name: "怒り", state: 0 },
        { id: 23, name: "恐ろしい", state: 0 },
        { id: 24, name: "激しい", state: 0 },
        { id: 25, name: "サイバー", state: 0 },
        { id: 26, name: "ファンタジー", state: 0 },
        { id: 27, name: "コメディー", state: 0 },
        { id: 28, name: "悪意", state: 0 },
        { id: 29, name: "怪しい", state: 0 },
        { id: 30, name: "日常", state: 0 },
        { id: 31, name: "情熱", state: 0 },
        { id: 32, name: "冷静", state: 0 },
        { id: 33, name: "淡白", state: 0 },
        { id: 34, name: "希望", state: 0 },
        { id: 35, name: "絶望", state: 0 },
        { id: 36, name: "虚無", state: 0 },
        { id: 37, name: "春", state: 0 },
        { id: 38, name: "夏", state: 0 },
        { id: 39, name: "秋", state: 0 },
        { id: 40, name: "冬", state: 0 },
        { id: 41, name: "4拍子", state: 0 },
        { id: 42, name: "3拍子", state: 0 },
        { id: 43, name: "変拍子", state: 0 },
        { id: 44, name: "スローテンポ", state: 0 },
        { id: 45, name: "ミドルテンポ", state: 0 },
        { id: 46, name: "アップテンポ", state: 0 },
        { id: 47, name: "ループ対応", state: 0 },
        { id: 48, name: "galGame", state: 0 },
        { id: 49, name: "Hackathon", state: 0 },
        { id: 50, name: "M3", state: 0 },
        { id: 51, name: "新歓コンピ", state: 0 },
        { id: 52, name: "traP2DTM", state: 0 }
      ],
      musicTag: [],
      tagData: [],
      //id,name,url,release,time,download,textの順
      musics: []
    };
  },
  mounted: function() {
    this.tagData = getCsv("/data/tagData.csv");
    this.musics = getCsv("/data/musics.csv");
    this.onSort(0);
    this.expander = new Array(this.musics.length).fill(false);
    this.isShow = new Array(this.musics.length).fill(true);
    this.musicTag = new Array(this.musics.length);
    for (let i = 0; i < this.musicTag.length; i++) {
      this.musicTag[i] = new Array(this.tags.length);
      for (let j = 0; j < this.musicTag[i].length; j++) {
        this.musicTag[i][j] = 0;
      }
    }
    for (let i = 0; i < this.tagData.length; i++) {
      this.musicTag[Number(this.tagData[i][0])][Number(this.tagData[i][1])] = 1;
    }
    setInterval(() => {
      if (
        !isNaN(document.querySelector("#audio").currentTime) &&
        !isNaN(this.musicTimeRate)
      ) {
        this.musicNowTime = document.querySelector("#audio").currentTime;
      }
      if (!isNaN(document.querySelector("#audio").duration))
        this.musicLength = document.querySelector("#audio").duration;
      if (
        !isNaN(this.prevTime) &&
        !isNaN(this.musicTimeRate) &&
        this.prevTime !== this.musicTimeRate
      )
        this.isSliding = true;
      if (!this.isSliding)
        this.musicTimeRate = (this.musicNowTime * 100) / this.musicLength;
      this.prevTime = this.musicTimeRate;
    }, 100);
  },
  methods: {
    onClick(url) {
      window.open(url, "_blank");
    },
    onClickTag(id, next) {
      this.$set(this.tags[id], "state", next);
      this.onTagCheck();
    },
    onTagCheck() {
      for (let j = 0; j < this.musics.length; j++) {
        let res = true;
        for (let i = 0; i < this.tags.length; i++) {
          if (
            this.tags[i].state === 1 &&
            this.musicTag[j][Number(this.tags[i].id)] === 0
          )
            res = false;
          if (
            this.tags[i].state === 2 &&
            this.musicTag[j][Number(this.tags[i].id)] === 1
          )
            res = false;
        }
        this.$set(this.isShow, j, res);
      }

      return;
    },
    onPlay(name, url) {
      if (this.playingMusicName !== name) {
        document.querySelector("#audio").src = url;
        this.musicTimeRate = 0;
        this.prevTime = 0;
        document.querySelector("#audio").currentTime = 0;
      }
      this.playingMusicName = name;
      document.querySelector("#audio").play();
      this.isSliding = false;
      this.isPlayer = true;
      this.isPlaying = true;
    },
    onPause() {
      document.querySelector("#audio").pause();
      this.isPlaying = false;
    },
    onSliderChange() {
      document.querySelector("#audio").currentTime =
        (this.musicTimeRate * this.musicLength) / 100;
      setTimeout(() => {
        this.isSliding = false;
      }, 200);
    },
    onSort(type) {
      if (type === 0 || type === 1) {
        this.musics.sort(function(a, b) {
          if (a[3] < b[3]) {
            return -1;
          } else if (a[3] > b[3]) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (type === 2 || type === 3) {
        this.musics.sort(function(a, b) {
          if (a[4] < b[4]) {
            return -1;
          } else if (a[4] > b[4]) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (type === 0 || type === 2) this.musics.reverse();
      return;
    },
    onExpand(id, value) {
      this.$set(this.expander, id, value);
    },
    onDownload(url, name) {
      let link = document.createElement("a");
      link.href = url;
      link.download = name;
      link.click();
    }
  }
};
</script>
<style scoped>
.player {
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: whitesmoke;
}
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
.box-card {
  width: auto;
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
.tag-list {
  display: inline-block !important;
  float: left;
}
.tag {
  padding-left: 5px !important;
  padding-right: 5px !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  margin-left: 2.5px !important;
  margin-right: 2.5px !important;
  margin-top: 5px !important;
}
.tag2 {
  margin-right: 5px;
  margin-bottom: 5px;
}
.music-title {
  color: orangered;
}
.music-text {
  align-items: flex-end;
  text-align: left;
  font-size: small;
  color: rgb(100, 100, 100);
}
.music-player {
  display: inline-block;
  width: 80%;
  margin-left: 30px;
  float: left;
}
.player-button {
  margin: 0 auto;
  display: inline-block;
  margin-right: 10px;
}
@media screen and (min-width: 600px) {
  .card-top {
    height: 50px;
  }
  .card-content1 {
    width: 70%;
    height: 50px;
    margin: auto;
    text-align: left;
    float: left;
  }
  .card-content2 {
    display: inline-block;
    width: 30%;
    height: 50px;
    float: right;
  }
}
@media screen and (max-width: 600px) {
  .card-top {
    height: auto;
  }
  .card-content1 {
    width: 100%;
    height: auto;
    margin: auto;
    text-align: left;
    float: left;
  }
  .card-content2 {
    width: 100%;
    height: auto;
    margin: auto;
    float: left !important;
  }
}
</style>
