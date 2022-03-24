<template>
  <div class="musicList">
    <div class="music-top">
      <div class="title">推荐歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="recommend__container">
      <router-link :to="{path:'/musiclist', query:{id: item.id}}" class="recommend" v-for="item in musicList" :key="item.id">
        <img :src="item.picUrl">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-white-24gl-play"></use>
          </svg>
          {{changeUnit(item.playCount)}}
        </span>
        <!-- less只能行内样式设置文字溢出 -->
        <p>{{item.name}}</p>
      </router-link>
    </div>
  </div>

</template>

<script>
import {onBeforeUnmount, onMounted, reactive} from 'vue'
import {getPersonalized} from '@/api/personalized.api'
import {changeUnit} from '@/utils/changeUnit.js'


export default {
  setup(props) {
    let timer = null;
    const musicList = reactive([]);
    onMounted(async () => {
        let res = await getPersonalized(30);
        let list = res.data.result;
        sessionStorage.setItem('musicList', JSON.stringify(list))
    })
    timer = setInterval((params) => {
      let list = JSON.parse(sessionStorage.getItem('musicList'))
      let rand = parseInt(Math.random()*27)
      musicList.length = 0;
      musicList.push(...list.slice(rand,rand+3));
    },5000)
    onBeforeUnmount(() => {
      clearInterval(timer);
    })
    
    

    return{
      musicList,
      changeUnit
    }
  }
}
</script>

<style lang='less' scoped>
.musicList{
  width: 7.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 0.01rem solid gray;
  .music-top{
    height: 1rem;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title{
      font-size: 0.4rem;
      font-weight: 900;
    }

    .more{
      border: 1px solid rgba(236, 230, 230, 0.1);
      border-radius: 0.2rem;
      padding: 0.04rem;
    }
  }

  .recommend__container{
    width: 90%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .recommend{
      width: 2rem;
      height: 3rem;
      position: relative;
      img{
        border-radius: 0.3rem;
        width: 2rem;
        height: 2rem;
      }
      span{
        position: absolute;
        display: flex;
        justify-content: space-around;
        align-items: center;
        top: 0.1rem;
        right: 0.1rem;
        background-color: rgba(182, 179, 179, 0.5);
        padding: 0.02rem 0.08rem;
        border-radius: 0.1rem;
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.25rem;
        .icon{
          width: 0.3rem;
          height: 0.3rem;
          color: white;
        }
      }
      p{
        width: 2rem;
        height: 0.6rem;
        line-height: 0.3rem;
        font-size: 0.25rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>