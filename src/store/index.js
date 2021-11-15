import { createStore } from 'vuex'

export default createStore({
  state: {
    tracks: [{al:{}, ar:[{name:''}]}],
    playCurIndex:0,
  },
  mutations: {
    setTracks: function (state, payload) {
      state.tracks = payload;
    },
    setPlayCurIndex(state, payload) {
      state.playCurIndex = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
