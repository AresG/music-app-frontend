<template>
  <div class="playController">
    <div class="left" @click="isShow=!isShow">
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
    <PlayMusicDetail v-show="isShow" :playDetail="tracks[playCurIndex]" :isPlay="isPlay" :onPlayMusic="playMusic"></PlayMusicDetail>

  </div>

</template>

<script>
import {ref, onMounted, onUpdated, reactive, onBeforeUpdate, nextTick, computed, watch} from 'vue'
import {useStore, mapState, mapActions} from 'vuex'

import PlayMusicDetail from '@/components/PlayMusicDetail.vue'
import mybus from '@/plugins/mybus.js'

export default {
  components:{
    PlayMusicDetail
  },
  computed:{
    ...mapState(['tracks', 'playCurIndex'])
  },
  setup(props) {
    const store = useStore();
    let audio = ref(null)
    let isPlay = ref(false);
    let isShow = ref(false);

    // 加载和更新时都要更新歌词
    onMounted(async() => {
      store.commit('setPlayCurIndex', store.state.playCurIndex);
      await store.dispatch('reqLyric', {id:store.state.tracks[store.state.playCurIndex].id})
      store.commit('setPlayTotalTime', parseInt(audio.value.duration)*1000);
    })
    onUpdated(() => {
      store.dispatch('reqLyric', {id:store.state.tracks[store.state.playCurIndex].id});
      // 不知道这里为什么用nextTick无效,commit过去的时间为NaN
      // nextTick(() => {
      //   console.log(audio);
      //   store.commit('setPlayTotalTime', parseInt(audio.value.duration)*1000);
      // })
    })

    // 用watch来监听vuex里歌词的变化，来传递audio的时间给vuex
    watch(() => store.state.musicLyric, (newVal, oldVal) => {
      store.commit('setPlayTotalTime', parseInt(audio.value.duration)*1000);
    })

    // 控制audio播放暂停
    function playMusic() {
      if(audio.value.paused){
        audio.value.play()
        isPlay.value = true;
        mybus.emit('updateTime');
      }else{
        audio.value.pause()
        isPlay.value = false;
        clearInterval(store.state.intervalId)
      }
      // console.log(audio);
    }

    //更新播放时间
    mybus.on('updateTime', () => {
      // 清除上一次的定时器
      clearInterval(store.state.intervalId)
      store.state.intervalId = setInterval(() => {
        // 超出时间则停止播放
        if(audio.value.currentTime * 1000 >= store.state.playTotalTime){
          audio.value.pause()
          isPlay.value = false;
          clearInterval(store.state.intervalId)
        }
        store.commit('setPlayCurTime',audio.value.currentTime * 1000)
      }, 1000)
    })

    // 歌曲列表点击某首歌曲时控制playcontroll播放
    mybus.on('playNthMusic', (musicObj) => {
      store.commit('setPlayCurIndex', musicObj['curIdx']);
      // 第一次挂载时不播放音乐
      if(!musicObj['isFirst']){
        // 只有audio全部更新加载完了才能播放
        nextTick(() => {
          playMusic();
        })
      }
    })

    // 歌曲详情页点击返回时触发的事件
    mybus.on('backToMusicList', () => {
      isShow.value = false;
    })   

    
    return{
      store,
      audio,
      playMusic,
      isPlay,
      isShow
    }
  }
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