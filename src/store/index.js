import { createStore } from 'vuex'
import {getMusicLyric} from '@/api/musicList.api.js'

export default createStore({
  state: {
    tracks: [{
      id: 1456890009,
      name:'Follow',
      al: {
        id: 3377030,
        name: "Follow",
        pic: 109951165076380460,
        picUrl: "http://p3.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg",
      },
      ar: [{
        id: 33259235,
        name: "梨冻紧"
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
    musicLyric: '',
    playNumLi:0,
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
    },
    setPlayNumLi(state, value) {
      state.setPlayNumLi = value;
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
