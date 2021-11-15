<template>
  <div class="home">
    <top-nav></top-nav>
    <Carousel></Carousel>
    <IconList></IconList>
    <Personalized></Personalized>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/TopNav.vue'
import Carousel from '@/components/Carousel.vue'
import IconList from '@/components/IconList.vue'
import Personalized from '@/components/Personalized.vue'

export default {
  name: 'Home',
  components: {
    TopNav,
    Carousel,
    IconList,
    Personalized
  }
}
</script>

<style lang="less" scoped>
</style>