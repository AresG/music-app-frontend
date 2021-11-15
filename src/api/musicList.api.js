import http from './index'

export const getMusicList = (id) => {
  return http.request({
    url:`/playlist/detail?id=${id}`,
  })
}

export const getMusic = (id) => {
  return http.request({
    url:`/song/url?id=${id}`,
  })
}