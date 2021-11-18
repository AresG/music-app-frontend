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
      // 获取当前歌单列表，并添加到下个歌单准备播放
      let id = route.query.id
      let res = await getMusicList(id);
      state.playlist = res.data.playlist; 
      store.commit('setNextTracks', state.playlist.tracks);
    })

    return {
      ...toRefs(state)
    }
  },
}
</script>

<style>
.musiclist::-webkit-scrollbar{
  display: none;
}

</style>
