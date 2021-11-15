<template>
  <div class="iconList">
      <div class="iconItem" v-for="item in iconList" :key="item.id">
        <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.code"></use>
        </svg>
        <span>{{item.text}}</span>
      </div>
  </div>
</template>

<script>
export default {
    setup(props) {
        let iconList = [
            {id:1, code:'#icon-xiangsituijian', text:'每日推荐'},
            {id:1, code:'#icon-paihangbang', text:'排行榜'},
            {id:1, code:'#icon-songlist', text:'歌单'},
            {id:1, code:'#icon-diantai', text:'电台'},
        ]

        return{
            iconList
        }
    }
}
</script>

<style lang='less' scoped>
.iconList{
    width: 7.5rem;
    height: 1.7rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iconItem{
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon{
            width: 1rem;
            height: 1rem;
        }
        span{
            font-size: 0.3rem;
        }
    }
}
</style>