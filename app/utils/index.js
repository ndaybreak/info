import { getSessionData } from '@/data'

export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? decodeURIComponent(window.location.href) : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

export function str2Bool(str) {
  return str === 'Y'
}

export function kebab2Camel(str) {
  const list = str.split('_')
  let result = list[0]
  let item
  for (let i = 1, len = list.length; i < len; i++) {
    item = list[i]
    result += item[0].toUpperCase() + item.substring(1, item.length)
  }
  return result
}

// 短横杠的属性转化为驼峰形式
export function kebabCaseData2Camel(obj) {
  const newObj = {}
  for (const attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      newObj[kebab2Camel(attr)] = obj[attr]
    }
  }
  return newObj
}

// 过滤空值属性
export function filterEmptyAttr(obj) {
  const newObj = {}
  for (const attr in obj) {
    if (obj.hasOwnProperty(attr) && typeof obj[attr] !== 'undefined' && obj[attr] !== '') {
      newObj[attr] = obj[attr]
    }
  }
  return newObj
}

// 过滤更新后的值
export function getUpdatedObj(temp, oldObj) {
  const newObj = { id: temp.id }
  Object.keys(temp).filter(attr => {
    return attr !== 'id'
  }).forEach(attr => {
    if (oldObj[attr] !== temp[attr]) {
      newObj[attr] = temp[attr]
    }
  })
  return newObj
}

export function getSearchPara(key) {
    var length,
        arr,
        item,
        href = decodeURIComponent(window.location.href),
        offset = href.indexOf('?'),
        paramStr
    if (offset >= 0) {
        if (href.indexOf('#') === -1) {
            length = href.length
        } else {
            length = href.indexOf('#')
        }
        paramStr = href.substring(offset + 1, length)

        arr = paramStr.split('&')
        for (var i = 0, len = arr.length; i < len; i++) {
            item = arr[i].split('=')
            if (item[0] === key) {
                return decodeURIComponent(item[1])
            }
        }
    }
}

export function getPageName() {
  return (window.location.pathname.replace(/(\/.+\/)|(.html)|(\/)/g, '') || 'index').split('-')[0]
}

export function getMenuNameById(id) {
    const menus = JSON.parse(getSessionData('menus'))
    let name = ''
    menus.forEach(menu => {
      if(menu.id == id) {
          name = menu.name
      }
    })
    return name
}

export function jumpUrl(path, params={}) {
  let str = ''
  const keys = Object.keys(params)
  const lastIndex = keys.length - 1
  keys.forEach((key, i) => {
    str += key + '=' + params[key]
      if(i < lastIndex) {
        str += '&'
      }
  })
  window.location.href = path + '?' + encodeURIComponent(str)
}

export function formatArticleDate(date) {
  const d = new Date() - new Date(date).getTime()
  const second = Math.ceil(d/1000/60)
  const hour = Math.floor(second/60)
  const day = Math.floor(hour/24)
  const month = Math.floor(day/30)
  const year = Math.floor(month/12)

  if(year) {
    return year + '年前'
  } else if(month) {
    return month + '个月前'
  } else if(day) {
    return day + '天前'
  } else if(hour) {
    return hour + '个小时前'
  } else {
    return second + '分钟前'
  }
}

const week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
export function formatNewsDate(date) {
    const str = date
    const currDate = new Date()
    date = new Date(date)
    if(date.getFullYear() == currDate.getFullYear() && date.getMonth() == currDate.getMonth() && date.getDate() == currDate.getDate()) {
      return str + '   今天   ' + week[date.getDay()]
    } else {
      return str + '     ' + week[date.getDay()]
    }


}