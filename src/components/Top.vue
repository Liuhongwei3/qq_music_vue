<!--
  - https://liuhongwei3.github.io Inc.
  - Name: Top.vue
  - Date: 2020/1/30 上午10:01
  - Author: Tadm
  - Copyright (c) 2020 All Rights Reserved.
  -->

<template>
    <div>
        <audio ref="audio" :src="this.musicUrl" controls/>
        <input v-model="keyword" @keyup.enter="searchSongs"/>
        <div class="top">
            <div class="item" v-for="(item,index) in searchResults" :key="index">
                <img v-lazy="item.vid" :key="item.vid" @click="updateSongId(item.songmid)">
                <span>{{item.songname}} --- {{item.singer[0].name}}</span>
            </div>
        </div>
        <div class="top" v-show="!keyword">
            <div class="item" v-for="(item,index) in topList" :key="index">
                <img v-lazy="item.data.label" :key="item.data.label" @click="updateSongId(item.data.songmid)">
                <span>{{item.data.songname}} --- {{item.data.singer[0].name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  import {toplist, album_img, song_url, search_songs} from "../network/Top";

  export default {
    name: "top",
    data() {
      return {
        topList: [],
        musicUrl: '',
        keyword: '',
        searchResults: []
      }
    },
    created() {
      toplist({id: 26})
          .then(res => {
            this.topList = res.data.body.data.songlist
            setTimeout(() => {
              this.topList.map(item => {
                item.data.label = album_img({albumId: item.data.albummid})
              })
            }, 100)
          })
          .catch(err => {
            console.log(err)
          })
    },
    methods: {
      updateSongId(sid) {
        song_url(sid).then(res => {
          let url = res.data.body.song_url1
          if (url === "http://ws.stream.qqmusic.qq.com/") {
            alert("This music cant play~")
            return
          }
          this.musicUrl = url
          setTimeout(() => {
            this.$refs.audio.play()
          }, 200)
        })
      },
      searchSongs() {
        this.keyword && search_songs(this.keyword)
            .then(res => {
              this.searchResults = res.data.body.songList.data.song.list
              setTimeout(() => {
                this.searchResults.map(item => {
                  item.vid = album_img({albumId: item.albummid})
                })
              }, 100)
            })
      }
    }
  }
</script>

<style scoped>
    .top {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .item {
        width: 160px;
        height: 210px;
    }

    img {
        margin: 0 10px;
        width: 150px;
        height: 150px;
        border-radius: 25%;
    }

    @media screen and (max-width: 768px) {
        img {
            margin: 10px 0;
        }
    }
</style>
