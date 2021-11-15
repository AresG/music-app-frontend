<template>
  <div class="playController">
    <div class="left">
      <img :src="tracks[playCurIndex].al.picUrl" alt="">
      <div class="content">
        <div class="title">
          {{tracks[playCurIndex].name}}
        </div>
        <div class="singer">
          - {{tracks[playCurIndex].ar[0].name}}
        </div>
      </div>
    </div>

    <div class="right">
      <svg v-if="isPlay" class="icon" aria-hidden="true" @click="playMusic">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg v-else class="icon" aria-hidden="true" @click="playMusic">
        <use xlink:href="#icon-zanting"></use>
      </svg> 
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>

    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${tracks[playCurIndex].id}.mp3`"></audio>
  </div>

</template>

<script>
import {ref, onMounted, onUpdated, reactive, onBeforeUpdate, nextTick} from 'vue'
import {useStore, mapState, mapMutations} from 'vuex'

import mybus from '@/plugins/mybus.js'

export default {
  computed:{
    ...mapState(['tracks', 'playCurIndex'])
  },
  setup(props) {
    const store = useStore();
    let audio = ref(null)
    let isPlay = ref(false);

    // 控制audio播放暂停
    function playMusic() {
      if(audio.value.paused){
        audio.value.play()
        isPlay.value = true;
      }else{
        audio.value.pause()
        isPlay.value = false;
      }
      // console.log(audio);
    }

    onUpdated(() => {
      mybus.on('playNthMusic', (idx) => {
        store.commit('setPlayCurIndex', idx);
        isPlay.value=true;
        nextTick(() => {
          audio.value.play()
        })
      })
    })
      

    
    return{
      store,
      audio,
      playMusic,
      isPlay
    }
  },
  updated() {
    console.log(this.tracks)
  },
}
</script>

<style lang="less" scoped>
.playController{
  width: 7.5rem;
  position: fixed;
  bottom: 0;
  z-index: 999;
  display: flex;
  padding: 0.2rem 0.375rem;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-top: 0.1px solid rgba(169, 169, 169, 0.3);
  .left{
    width: 5rem;
    display: flex;
    align-items: center;
    img{
      width: 0.6rem;
      border-radius: 0.3rem;
    }
    .content{
      width: 4rem;
      display: -webkit-flex;
      // white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-flex-orient: vertical;
      -webkit-line-clamp: 1;
      margin-left: 0.3rem;
      .title{
        font-weight: 900;
      }
      .singer{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        font-size: 0.25rem;
        margin-left: 0.1rem;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .right{
    width: 1.3rem;
    display: flex;
    justify-content: space-between;
  }

}
</style>