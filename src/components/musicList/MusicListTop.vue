<template>
  <div class="musiclisttop">
    <!-- 背景图片 -->
    <img :src="playlist.coverImgUrl" class="bg"> 
    <!-- 头部导航 -->
    <div class="nav">
      <div class="back">
        <router-link :to='{path:"/"}'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow_left"></use>
          </svg>
        </router-link>
        <span>歌单</span>
      </div>
      <div class="search">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gf-ellipsisVertical"></use>
        </svg>
      </div>
    </div>
    <!-- 歌单详情 -->
    <div class="detail">
      <div class="detail-img">
        <img :src="playlist.coverImgUrl">
        <div class="count">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-white-24gl-play"></use>
          </svg>
          {{changeUnit(playlist.playCount)}}
        </div>
      </div>
      <div class="detail-text">
        <div>{{playlist.name}}</div>
        <div class="avatarInfo">
          <img :src="playlist.creator.avatarUrl">
          <span>{{playlist.creator.nickname + ' >'}}</span>
        </div>
        <div>{{playlist.description}}</div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <span>{{playlist.commentCount}}</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{playlist.shareCount}}</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
import {changeUnit} from '@/utils/changeUnit.js'

export default {
  props:['playlist'],
  setup(props) {

    return {
      changeUnit
    }
  }
}
</script>

<style lang='less' scoped>
.musiclisttop{
  width: 7.5rem;
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: auto;
    filter: blur(60px);
    z-index: -1;
  }
  .nav{
    display: flex;
    justify-content: space-between;
    padding: 0.375rem 0.375rem;

    .back, .search{
      width: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.4rem;
      span{
        font-size: 0.4rem;
        color: white;
      }
      .icon{
        fill: white;
      }
    }
  }
  .detail{
    height: 3.55rem;
    display: flex;
    justify-content: space-between;
    padding: 0.375rem;
    .detail-img{
      width: 2.8rem;
      position: relative;
      img{
        width: 2.8rem;
        position: absolute;
        z-index: -1;
        border-radius: 0.3rem;
      }
      .count{
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        z-index: 999;
        top: 0.1rem;
        right:0.1rem;
        background-color: rgba(182, 179, 179, 0.5);
        padding: 0.02rem 0.08rem;
        border-radius: 0.1rem;
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.1rem;
        .icon{
          width: 0.3rem;
          height: 0.3rem;
          fill: white;
        }
      }
    }
    .detail-text{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 3.5rem;
      div:nth-child(1){
        color: white;
        font-size: 0.3rem;
      }
      div:nth-child(2){
        display: flex;
        align-items: center;
        img{
          width: 0.6rem;
          border-radius: 0.3rem;
        }
        span{
          margin-left: 0.2rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.25rem;
        }
      }
      div:nth-child(3){
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.25rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  .footer{
    display: flex;
    padding: 0.375rem;
    justify-content: space-around;
    .item{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .icon{
        fill: white;
      }
      span{
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.25rem;
        text-align: center;
      }
    }
  }

}
</style>