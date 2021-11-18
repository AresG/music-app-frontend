<template>
  <router-view/>
  <PlayController></PlayController>
</template>

<script>
import PlayController from '@/components/PlayController.vue'
export default {
  components:{
    PlayController
  },
  setup(props) {
    
    return {
      
    }
  }
}
</script>

<style lang="less">
*{
  padding: 0px;
  margin: 0px;
  // 设置盒子模型
  box-sizing: border-box;
}

a{
  color:#333;
  text-decoration: none;
}

.icon {
  width: 0.5rem;
  height: 0.5rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>
