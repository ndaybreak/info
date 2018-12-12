
// 存储数据到sessionStorage中
export function setSessionData(key, value) {
    return sessionStorage.setItem(key, value)
}

// 获取存储在sessionStorage中的数据
export function getSessionData(key) {
    return sessionStorage.getItem(key)
}
