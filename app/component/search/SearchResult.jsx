import React from 'react'
import { getSearchPara, jumpUrl } from '@/utils'

const getContent = (content, searchVal) => {
    var reg = new RegExp(searchVal, "gim")
    return content.replace(reg, '<strong>' + searchVal + '</strong>')
}

const goDetail = item => {
    jumpUrl('detail.html', {
        categoryId: item.catalog_id,
        id: item.info_id
    })
}

const SearchResult = (props) => {
    const { data, search } = props
    return (
        <div className="tai-module clearfix">
            {data.map((item, i) => {
                return (
                    <div className={'item clearfix' + ((i === data.length - 1) ? ' last' : '')} key={i}>
                        <span className="pic-wrap" onClick={goDetail.bind(this, item)}><img className="pic" src={item.picture_url} alt=""/></span>
                        <div className="content">
                            <div className="detail-title">
                                <a className="link" onClick={goDetail.bind(this, item)} href="javascript:">{item.title}</a>
                            </div>
                            <div className="detail-info">
                                <a href={'index.html?categoryId=' + item.catalog_id} className="category-link">{item.catalog}</a><span>&nbsp;&nbsp;>&nbsp;&nbsp;搜索结果</span>
                                {item.auth} &nbsp;&nbsp;&nbsp; {item.date}
                            </div>
                            <div className="detail-subtitle" dangerouslySetInnerHTML={{__html: getContent(item.content, search)}}></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchResult