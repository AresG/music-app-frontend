<template>
  <div class="musiclist">
    <MusicListTop :playlist='playlist'></MusicListTop>
    <PlayListBtm :playlist='playlist'></PlayListBtm>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'

import MusicListTop from '@/components/musicList/MusicListTop.vue'
import PlayListBtm from '@/components/musicList/PlayListBtm.vue'
import {getMusicList} from '@/api/musicList.api'

export default {
  components:{
    MusicListTop,
    PlayListBtm
  },
  setup(props) {
    const route = useRoute();
    const store = useStore();
    let state = reactive({
      list:[],
      playlist:{
        playcount:0,
        creator:{},
        tracks:[]
      }
      
    });
    onMounted(async () => {
      let id = route.query.id
      let res = await getMusicList(id);
      state.playlist = res.data.playlist; 
      store.commit('setTracks', state.playlist.tracks)
      console.log(res);
    })

    return {
      ...toRefs(state)
    }
  },
}
</script>

<style>

</style>
