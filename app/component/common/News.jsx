import React from 'react'
import '@/public/css/news.pcss'
import timeImg from '@/public/img/time.png'
import dateImg from '@/public/img/date.png'
import { getNewsList, getNewsDetail } from '@/api'
import { parseTime, getSearchPara, jumpUrl, formatNewsDate } from '@/utils'

let currPage = 1

class Module extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageCount: 1,
            originalData: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUnmount() {
    }

    formatData(list) {
        let newList = list.map(item => {
            let list = parseTime(item.news_date, '{y}-{m}-{d} {h}:{i}').split(' ')
            item.date = list[0]
            item.time = list[1]
            return item
        })
        const obj = {}
        newList.forEach(item => {
            if(obj[item.date]) {
                obj[item.date].push(item)
            } else {
                obj[item.date] = [item]
            }
        })
        const result = []
        Object.keys(obj).forEach(key => {
            result.push({
                date: key,
                newsList: obj[key]
            })
        })
        return result
    }

    getData() {
        if(this.props.isDetail) {
            getNewsDetail(getSearchPara('id')).then(res => {
                this.setState({
                    data: this.formatData(res.data)
                })
            })
        } else {
            getNewsList(currPage).then(res => {
                const originalData = this.state.originalData.concat(res.data)
                this.setState({
                    originalData: originalData,
                    data: this.formatData(originalData),
                    pageCount: res.pageInfo.pageCount
                })
            })
        }
    }

    getMore() {
        if(this.props.isMore) {
            currPage++
            this.getData()
        } else {
            jumpUrl('news-more.html', {
                categoryId: 999
            })
        }
    }

    goDetail(news) {
        if(this.props.isDetail) {
            return
        }
        jumpUrl('news-detail.html', {
            id: news.id
        })
    }

    render() {
        return (
            <div className="tai-news">
                {!this.props.isMore && !this.props.isDetail && (
                    <div className="title"><span className="icon"></span>快讯</div>
                )}
                <div className="news-cont">
                    {this.state.data.map((item, i) => {
                        return (
                            <div className="day-group" key={i}>
                                <div className="day-label">
                                    <img src={dateImg} alt=""/>
                                    <span dangerouslySetInnerHTML={{__html: formatNewsDate(item.date)}}></span></div>
                                <div className="news-list">
                                    {item.newsList.map((news, j) => {
                                        return (
                                            <div className={j === (item.newsList.length - 1) ? 'news-item last' : 'news-item'} key={j}>
                                                <div className="date"><img className="time-icon" src={timeImg} alt=""/>{news.time}</div>
                                                <div className="news-title" onClick={this.goDetail.bind(this, news)}>{news.title}</div>
                                                <div className="news-content" dangerouslySetInnerHTML={{__html: news.content}}></div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                {(this.state.pageCount > currPage || this.props.isDetail) && (
                    <div className="more-news" onClick={this.getMore.bind(this)}>查看更多</div>
                )}
            </div>
        );
    }
}

export default Module