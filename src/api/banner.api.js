import http from './index'

// 根据类型Id获取轮播图列表 0:pc 1:android 2:iphone 3:ipad
export const getBannerList = (typeId) => {
  return http.request({
    url:`/banner?type=${typeId}`
  })
}