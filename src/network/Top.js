/*
 * https://liuhongwei3.github.io Inc.
 * Name: Top.js
 * Date: 2020/1/30 上午9:57
 * Author: Tadm
 * Copyright (c) 2020 All Rights Reserved.
 */

import {request} from './index'

export function toplist(query = {id: 26}) {
  return request({
    url: '/toplist?id=' + query.id
  })
}

export function album_img(query) {
  return `http://y.gtimg.cn/music/photo_new/T002R180x180M000${query.albumId}.jpg`
}

export function song_url(sid) {
  return request({
    url: '/song/url?id=' + sid
  })
}

export function search_songs(keyword) {
  return request({
    url: '/search/song?keyword=' + keyword
  })
}