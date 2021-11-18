<template>
    <div class="topNav">
        <div class="topLeft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao2"></use>
            </svg>
        </div>
        <div class="topCenter">
            <span class="navBtn">我的</span>
            <span class="navBtn active">发现</span>
            <span class="navBtn">云村</span>
            <span class="navBtn">视频</span>
        </div>
        <div class="topRight" @click="router.push('/search')">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'

export default {
    setup(props) {
        const router = useRouter();

        onMounted(() => {
            console.log(router);
        })

        return {
            router
        }
    }
}
</script>

<style lang="less" scoped>
.topNav{
    width: 7.5rem;
    height: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.1rem 0.3rem;
    .topCenter{
        width: 5rem;
        display: flex;
        justify-content: space-around;
        .active{
            font-weight: 900;
        }
    }
}
</style>