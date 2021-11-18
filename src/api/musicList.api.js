import http from './index'

// 获取音乐列表
export const getMusicList = (id) => {
  return http.request({
    url:`/playlist/detail?id=${id}`,
  })
}

// 获取音乐
export const getMusic = (id) => {
  return http.request({
    url:`/song/url?id=${id}`,
  })
}

// 获取歌词
export const getMusicLyric = (id) => {
  return http.request({
    url:`/lyric?id=${id}`,
  })
}
