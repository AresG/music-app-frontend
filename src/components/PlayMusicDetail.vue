<template>
  <div class="playMusicDetail">
    <div class="bg" :style="{backgroundImage: `url(${playDetail.al.picUrl})`}"></div>
    <!-- 顶部导航 -->
    <div class="topNav">
      <div class="back" @click="back">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow_left"></use>
        </svg>
      </div>
      <div class="center">
        <div class="title" v-if="playDetail.name">
          <!-- <marquee align="center" behavior="scroll" direction="left" scrollamount="4">{{playDetail.name}}</marquee> -->
          {{playDetail.name}}
        </div>
        <div class="author">{{playDetail.ar[0].name}}</div>
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
      <!-- 中间歌词 -->
      <div v-show="isLyric" class="midLyric" @click="isLyric = !isLyric" ref="lyricBox">
        <div class="wrapper">
          <div class="content">
          <p class="pLi" v-for="(item, i) in lyricList" :key="i"
           :class="{active: playCurTime> item.totalTime && playCurTime < item.nextTotalTime }"
           :num="i">
          <!-- <p ref="p" v-for="(item, i) in lyricList" :key="i" :class="{active:setP(item)}"> -->
            {{item.lyric}}
          </p>
          </div>
        </div>
      </div>
      <!-- 中间图片 -->
      <div v-show="!isLyric" class="midImg" @click="isLyric = !isLyric">
        <img class="needle" :class="{active:!isPlay}" src="@/assets/imgs/needle.png">
        <img class="avatar" :src="playDetail.al.picUrl">
        <img class="disc" src="@/assets/imgs/disc.png">
      </div>
    <!-- 进度条 -->
    <div class="progress"></div>
    <!-- 底部控件 -->
    <div class="bottom">
      <!-- 播放设置 -->
      <svg v-if='number === 0' class="icon" aria-hidden="true" @click="changeNumber">
        <use xlink:href="#icon-24gl-repeat2"></use>
      </svg>
      <svg v-else-if="number === 1" class="icon" aria-hidden="true" @click="changeNumber">
        <use xlink:href="#icon-24gl-repeatOnce2"></use>
      </svg>
      <svg v-else class="icon" aria-hidden="true" @click="changeNumber">
        <use xlink:href="#icon-24gl-shuffle"></use>
      </svg>
      <!-- 切换上下首和播放暂停 -->
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-icon-test2"></use>
      </svg>
      <svg v-if="isPlay" class="icon" aria-hidden="true" @click="onPlayMusic">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg v-else class="icon" aria-hidden="true" @click="onPlayMusic">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-icon-test3"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gf-playlistMusic5"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import {ref ,onMounted, computed, onUpdated, watch, nextTick, reactive} from 'vue'
import {mapState, useStore} from 'vuex'
import mybus from '@/plugins/mybus.js'
import BetterScroll from 'better-scroll'

export default {
  props:["playDetail", "isPlay", "onPlayMusic"],
  computed:{
    ...mapState(['musicLyric', 'playCurTime']),
    lyricList:function () {  
      let preArr = this.musicLyric.split(/\n/igs).map((item) => {
        let min = item.slice(1,3);
        let sec = item.slice(4,6);
        let mill = item.slice(7,item.indexOf(']'));
        let lyric = item.slice(item.indexOf(']') + 1);
        let totalTime = parseInt(mill) + parseInt(sec) * 1000 + parseInt(min) *60000;
        return {min, sec, mill, lyric, totalTime}
      })
      // 设置本句歌词与下一句的时间区间, 最后一个数组时无效的
      for(let i = 0; i < preArr.length - 1; i++){
        if(i === preArr.length - 2){
          preArr[i]['nextTotalTime'] = preArr[i]['totalTime'] + 1000;
        }else{
          preArr[i]['nextTotalTime'] = preArr[i+1]['totalTime'];
        }
      }
      return preArr.slice(0, preArr.length - 1);
    }
  },
  setup(props) {

    let store = useStore();
    // 循环的索引值
    let number = ref(0);
    // 是否显示歌词
    let isLyric = ref(false);
    let lyricBox = ref(null);
    // 播放到第几个p了
    let numLi = 0;
    let scroll = reactive({});


    function back() {  
      mybus.emit('backToMusicList')
    }

    // 控制循环图标[0, 1, 2] = [列表循环， 单曲循环， 随机播放]
    function changeNumber(){
      number.value = (number.value+1) % 3
    }

    // 播放上下首
    function goPlay(val){
      let idx = (store.state.playCurIndex + val + store.state.tracks.length) % store.state.tracks.length;
      console.log(idx);
      mybus.emit('playNthMusic', {'curIdx':idx, 'isFirst':false});
    }
    
    let lyricList = computed(() => {
      let preArr = store.state.musicLyric.split(/\n/igs).map((item) => {
        let min = item.slice(1,3);
        let sec = item.slice(4,6);
        let mill = item.slice(7,item.indexOf(']'));
        let lyric = item.slice(item.indexOf(']') + 1);
        let totalTime = parseInt(mill) + parseInt(sec) * 1000 + parseInt(min) *60000;
        return {min, sec, mill, lyric, totalTime}
      })
      // 设置本句歌词与下一句的时间区间, 最后一个数组时无效的
      for(let i = 0; i < preArr.length - 1; i++){
        if(i === preArr.length - 2){
          preArr[i]['nextTotalTime'] = preArr[i]['totalTime'] + 1000;
        }else{
          preArr[i]['nextTotalTime'] = preArr[i+1]['totalTime'];
        }
      }
      return preArr.slice(0, preArr.length - 1);
    })

    onMounted(() => {
      
    })

    onUpdated(() => {
      let wrapper = document.querySelector('.wrapper');
      scroll = new BetterScroll(wrapper, {click:true});
    })

    watch(() => store.state.playCurTime, (newVal, oldVal) => {
      lyricList.value.forEach( (item, idx) => {
        if(store.state.playCurTime > item.totalTime && store.state.playCurTime < item.nextTotalTime){
          numLi = idx;
        }
      })
      let p = document.querySelectorAll('.pLi');
      nextTick(() => {
        console.log(numLi);
        if(numLi > 4){
          scroll.scrollToElement(p[numLi - 3], newVal - oldVal)
        }
      })
    })

    return{
      number,
      isLyric,
      lyricBox,
      back,
      changeNumber,
      goPlay,
    }
  }

}
</script>

<style lang='less' scoped>

.icon{
  fill: white;
}

.playMusicDetail{
  position: fixed;
  left: 0;
  top: 0;
  width: 7.5rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: 100%;
    filter: blur(90px);
    background-size: auto 130%;
    background-position: center;
    z-index: -1;
  }
  .topNav{
    width: 7.5rem;
    height: 1.5rem;
    padding: 0.375rem 0.375rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .center{
      width: 3rem;
      color: white;
      text-align: center;
      .title{
        width: 3rem;
        font-weight: 900;
        text-align: center;
      }
      .author{
        font-size: 0.25rem;
        color: rgba(255, 255, 255, 0.5);
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
  
.midLyric{
  width: 7.5rem;
  height: 70%;
  padding: 1rem 0.375rem 0rem 0.375rem;
  position: relative;
  // overflow: scroll;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.3rem;
  text-align: center;
  .wrapper{
    height: 100%;
    overflow: hidden;
    .content{
      p{
        margin-top: 0.5rem;
      }
      p.active{
        color: white;
        font-weight: 900;
      }
    }
  }
}
.midImg{
  width: 7.5rem;
  height: 70%;
  position: relative;
  .needle{
    width: 2rem;
    height: auto;
    position: absolute;
    z-index: 999;
    top: 0;
    left: 50%;
    margin-left: -0.5rem;
    transform: rotate(0deg);
    transform-origin: 0.3rem 0;
    transition: all 1s;
  }
  .needle.active{
    transform: rotate(-20deg);
  }
  .avatar{
    width: 5rem;
    position: absolute;
    top: 2.3rem;
    left: calc(50% - 2.5rem);
    border-radius: 2.5rem;
  }
  .disc{
    width: 5.6rem;
    position: absolute;
    top: 2rem;
    left: calc(50% - 2.8rem);
  }
}
  .bottom{
    width: 7.5rem;
    height: 2rem;
    padding: 0.375rem;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon:nth-child(3){
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>