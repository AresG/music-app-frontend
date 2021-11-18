import { createStore } from 'vuex'
import {getMusicLyric} from '@/api/musicList.api.js'

export default createStore({
  state: {
    tracks: [{
      id: 35847388,
      name:'Hello',
      al: {
        id: 3377030,
        name: "Hello",
        pic: 1407374890649284,
        picUrl: "http://p3.music.126.net/PrO7oPvnjvH4xdujdGbf2w==/1407374890649284.jpg",
      },
      ar: [{
        id: 46487,
        name: "Adele"
      }]
    }],
    nextTracks: [{
      id: 0,
      name:'',
      al: {
        id: 0,
        name: "",
        picUrl: "",
      },
      ar: [{
        id: 0,
        name: ""
      }]
    }],
    playCurIndex: 0,
    playCurTime: 0,
    playTotalTime:0,
    intervalId:0,
    musicLyric:'',
  },
  mutations: {
    setNextTracks(state, value) {
      state.nextTracks = value;
    },
    setTracks(state, value) {
      state.tracks = value;
    },
    setPlayCurIndex(state, value) {
      state.playCurIndex = value;
    },
    setPlayCurTime(state, value) {
      state.playCurTime = value;
    },
    setPlayTotalTime(state, value) {
      state.playTotalTime = value;
    },
    setMusicLyric(state, value) {
      state.musicLyric = value;
    }
  },
  actions: {
    async reqLyric(content, payload) {
      let res =await getMusicLyric(payload.id);
      content.commit('setMusicLyric', res.data.lrc.lyric)
    }
  },
  modules: {
  }
})
