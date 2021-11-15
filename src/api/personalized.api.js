import http from './index'

// 根据数量获取推荐歌单（公开的，不需要登陆）
export const getPersonalized = (num) => {
  return http.request({
    url:`/personalized?limit=${num}`
  })
}