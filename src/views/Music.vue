<template>
  <div class="music">
    <div id="search">
      <h1><i class="el-icon-search" /> Search</h1>
      <p>
        タグや曲名から、表示する音楽を絞り込むことが出来ます！
        <el-switch v-model="isValid" active-text="表示" inactive-text="非表示">
        </el-switch>
      </p>
      <el-collapse-transition>
        <div v-if="isValid">
          <el-alert type="success" show-icon :closable="false"
            ><b>検索タグ</b
            >にタグを登録すると、そのタグが登録されている音楽のみが表示されます。</el-alert
          >
          <el-alert type="error" show-icon :closable="false"
            ><b>除外タグ</b
            >にタグを登録すると、そのタグが登録されている音楽が全て非表示になります。</el-alert
          >
          <el-card class="box-card"
            ><el-alert type="default" show-icon :closable="false"
              ><b>タグ一覧</b>
              ：タグをクリックするとタグの属性が変化します(→未登録→検索タグ→除外タグ→の順)</el-alert
            >
            <div class="tag-list" v-for="t in tags" :key="t.id">
              <el-button
                v-if="t.state === 0"
                class="tag"
                plain
                type="default"
                @click="onClickTag(t.id, 1)"
                >{{ t.name }}</el-button
              >
              <el-button
                v-if="t.state === 1"
                class="tag"
                type="success"
                @click="onClickTag(t.id, 2)"
                >{{ t.name }}</el-button
              >
              <el-button
                v-if="t.state === 2"
                class="tag"
                type="danger"
                @click="onClickTag(t.id, 0)"
                >{{ t.name }}</el-button
              >
            </div>
          </el-card>
          <el-card class="box-card">
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
          </el-card>
          <el-card class="box-card">
            <el-alert type="default" show-icon :closable="false"
              ><b>並び替え</b>
            </el-alert>
            <p>
              <el-radio-group v-model="radio">
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
      <div v-for="m in musics" :key="m.id">
        <el-card class="box-card">
          <h2 class="music-title">
            <i class="el-icon-caret-right" />{{ m.name }}
          </h2>
          <i class="el-icon-date" />{{ m.release }} <i class="el-icon-time" />{{
            m.time
          }}
          <p>
            <el-button
              icon="el-icon-video-play"
              circle
              @click="onPlay(m.id)"
              v-if="!m.playing"
            />
            <el-button
              icon="el-icon-video-pause"
              circle
              @click="onStop(m.id)"
              v-if="m.playing"
            />
            <audio
              id="player"
              class="audio"
              src="../assets/Daylight as usual.mp3"
              controls
              preload="none"
            />
          </p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "music",
  data() {
    return {
      isValid: true,
      radio: 0,
      musicName: "",
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
        { id: 37, name: "4拍子", state: 0 },
        { id: 38, name: "3拍子", state: 0 },
        { id: 39, name: "変拍子", state: 0 },
        { id: 40, name: "スローテンポ", state: 0 },
        { id: 41, name: "ミドルテンポ", state: 0 },
        { id: 42, name: "アップテンポ", state: 0 },
        { id: 43, name: "ループ対応", state: 0 },
        { id: 44, name: "galGame", state: 0 },
        { id: 45, name: "Hackathon", state: 0 }
      ],
      musics: [
        {
          id: "0",
          name: "八月のRecollection",
          release: "2019-07-06",
          time: "4:30",
          text:
            "日本の夏の終わり頃、ちょっと涼しい山の森の中、みたいなイメージの曲です。前作「夏に溶けた幻想」がイントロで曲が終わってしまうという残念な結果だったので、そのリベンジも兼ねていて、コンセプトや楽器構成は比較的そのまま受け継いで、メロディは1から作り直したという経緯があります。今までの自作曲の中では一番シリアス(?)だけど決してダークではない、爽やかさ強めな感じになったと思います。最近の都会の夏は猛暑だのゲリラ豪雨だので風流さの欠片もありませんが…(-ω-;)。今までの曲はどうしても無意識に普段聴いている東方原曲っぽいものが随所に付与されてしまっていた(これ自体は別に悪いことじゃない気もするけど)ので、今回は同じ和風でも東方ではない、どちらかと言えばCLANNADとかAIRとかのKey作品って感じの和風を目指しました。そういえば曲の構成は第2弾の自作曲「プレザントラベラー」にそっくりですね。個人的にはそこまで曲をすごく長くはしたくないという気持ちがある(最後まで聴くのが大変になってしまうので)ので、これでも出来るだけ余計なパートは省いてるつもりなんですけど、今回は実質BPM100なので(制作上はBPM200",
          playing: false,
          tag: [0, 5, 9, 12]
        }
      ]
    };
  },
  methods: {
    onClick(url) {
      window.open(url, "_blank");
    },
    onClickTag(id, next) {
      this.$set(this.tags[id], "state", next);
    },
    onPlay(id) {
      this.musicSrc();
      this.musics[id].playing = true;
    },
    onStop(id) {
      this.musics[id].playing = false;
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
}
.tag {
  padding-left: 10px !important;
  padding-right: 10px !important;
  padding-top: 7.5px !important;
  padding-bottom: 7.5px !important;
  margin-left: 5px !important;
  margin-right: 5px !important;
  margin-top: 10px !important;
}
.music-title {
  color: orangered;
}
</style>
