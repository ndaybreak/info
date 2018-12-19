import request from '@/utils/request'
import { kebabCaseData2Camel } from '@/utils'
// module--banner
export function getBannerData() {
    return request({
        url: '/article/banners',
        method: 'post'
    })
}

// module--菜单
export function getMenus() {
    return request({
        url: '/category/list',
        method: 'get'
    })
}

// module--推荐列表
export function getRecommendList(currPage) {
    return request({
        url: '/article/recommends',
        method: 'get',
        params: {
            currPage: currPage,
            pageSize: 2
        }
    })
}

// module--单个模块下的文章列表
export function getModuleList(moduleId, currPage) {
    return request({
        url: '/article/list',
        method: 'get',
        params: {
            categoryId: moduleId,
            currPage: currPage,
            pageSize: 2
        }
    })
}

// module--文章详情
export function getModuleDetail(id) {
    return request({
        url: '/article/detail',
        method: 'get',
        params: { id }
    })
}

// module--快讯
export function getNewsList(currPage) {
    return request({
        url: '/news/list',
        method: 'get',
        params: {
            currPage: currPage,
            pageSize: 10
        }
    })
}
// module--快讯详情
export function getNewsDetail(id) {
    return request({
        url: '/news/detail',
        method: 'get',
        params: { id }
    })
}
// module--搜索
export function search(content, currPage) {
    return request({
        url: '/managementSystem/queryNewsCenterWhereInfo',
        method: 'post',
        params: {
            content: content,
            currPage: currPage,
            pageSize: 5
        }
    })
}

