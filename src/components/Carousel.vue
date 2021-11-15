<template>
  <div class="carousel">   
    <el-carousel  height='3rem' autoplay>
      <el-carousel-item v-for="(item, idx) in imgUrls" :key="idx">
        <img :src="item.pic">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {onMounted, reactive} from 'vue'
import {getBannerList} from '../api/banner.api'

export default {
  setup() {

    let imgUrls = reactive([
            // {id: 1, pic:require('../assets/imgs/carousel1.jpg')},
            // {id: 2, pic:require('../assets/imgs/carousel2.jpg')},
            // {id: 3, pic:require('../assets/imgs/carousel3.jpg')},
            // {id: 4, pic:require('../assets/imgs/carousel4.jpg')},
    ])
    onMounted(async () => {
      let res = await getBannerList(2);
      imgUrls.push(...res.data.banners.slice(8,12))
    })


    return {
      imgUrls
    };
  },

};
</script>

<style lang='less'>
  .carousel{
    width: 90%;
    height: 2.6rem;
    position: relative;
    left: 5%;
    border-radius: 0.3rem;
    overflow: hidden;
    .el-carousel{
      width: 100%;
      .el-carousel__container{
        .el-carousel__arrow{
          position: absolute;
          z-index: 999;
          left: 0;
          top: 50%;
          display: block;
        }
        .el-carousel__item{
          position: absolute;
          z-index: 1;
          img{
            max-width: 100%;
            // max-height: 100%;
          }
        }
      }
      ul{
        width: 3rem;
        display: none;
        justify-content: space-around;
        position: absolute;
        left:50%;
        margin-left: -1.5rem;
        bottom: 0.1rem;
        z-index: 999;
        li::marker{
          content: none;
        }
      }
    }

  }

</style>