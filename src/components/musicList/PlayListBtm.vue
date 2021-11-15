<template>
  <div class="playlistbtm">
    <div class="playlist-nav">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <div class="title">
        <span>播放全部</span>
        <span>(共{{changeUnit(playlist.tracks.length)}}首)</span>
      </div>
      <div class="collect">
        + 收藏 ({{changeUnit(playlist.subscribedCount)}})
      </div>
    </div>

    <div class="playlist-body">
      <div class="playItem" v-for="(item,index) in playlist.tracks" :key="item.id" >
        <div class="left" @click="playMusic(index)">
          <div class="index">{{index + 1}}</div>
          <div class="content">
            <div class="title">{{item.name}}</div>
            <div class="anthor">{{item.ar[0].name}}-{{item.al.name}}</div>
          </div>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true" v-show="item.mv">
            <use xlink:href="#icon-shipinbofangliang"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gf-ellipsisVertical"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

import {changeUnit} from '@/utils/changeUnit.js'
import mybus from '@/plugins/mybus.js'

export default {
  props:['playlist'],
  methods: {
    ...mapMutations(['setPlayCurIndex'])
  },
  setup(props) {

    function playMusic(idx){
      mybus.emit('playNthMusic', idx);
    }

    return{
      changeUnit,
      playMusic
    }
  }
}
</script>

<style lang='less' scoped>
.playlistbtm{
  width: 7.5rem;
  padding: 0.2rem 0.375rem;
  background-color: #fff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  .playlist-nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
      margin-left: -1.2rem;
      span:nth-child(1){
        font-size: 0.3rem;
        font-weight: 900;
      }
      span:nth-child(2){
        font-size: 0.25rem;
        font-weight: 900;
        color: rgba(0, 0, 0, 0.5);;
      }
    }
    .collect{
      width: 2.3rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      color: white;
      background-color: #e60026;
      border-radius: 0.4rem;
    }
  }

  .playlist-body{
    .playItem{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem 0;
      .left{
        width: 5rem;
        display: flex;
        align-items: center;
        .index{
          width: 0.5rem;
          display: flex;
          justify-content: center;
          color: rgba(0, 0, 0, 0.5);
          font-size: 0.3rem;
          margin-right: 0.3rem;
        }
        .content{
          width: 4.5rem;
          .title{
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-weight: 900;
          }
          .anthor{
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 0.25rem;
            font-weight: 900;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .right{
        width: 1.4rem;
        display: flex;
        justify-content: flex-end;
        .icon{
          margin-left: 0.2rem;
          fill: rgba(0, 0, 0, 0.3);
        }
      }
      
    }
    .playItem:last-child{
      margin-bottom: 1rem;
    }
  }
}
</style>