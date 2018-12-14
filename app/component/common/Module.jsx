import React from 'react'
import '@/public/css/module.pcss'
import { getRecommendList, getModuleList } from '@/api'
import { getSearchPara, getMenuNameById, formatArticleDate } from '@/utils'
import eventProxy from '@/utils/eventProxy'

let currPage = 1

class Module extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: getSearchPara('categoryId'),
            data: [],
            pageCount: 1,
            moduleName: ''
        }
    }

    componentDidMount() {
        this.getData()
        eventProxy.one('menusDone', () => {
            if(this.state.categoryId) {
                this.setState({
                    moduleName: getMenuNameById(this.state.categoryId)
                })
            } else {
                this.setState({
                    moduleName: '推荐'
                })
            }
        })
    }

    componentWillUnmount() {
    }

    getData() {
        if(this.state.categoryId) {
            getModuleList(this.state.categoryId, currPage).then(res => {
                this.setState({
                    data: this.state.data.concat(res.data),
                    pageCount: res.pageInfo.pageCount
                })
            })
        } else {
            getRecommendList(currPage).then(res => {
                this.setState({
                    data: this.state.data.concat(res.data),
                    pageCount: res.pageInfo.pageCount
                })
            })
        }
    }

    fetchMore() {
        currPage++
        this.getData()
    }

    render() {
        return (
            <div className="tai-module">
                <div className="module-title"><span className="icon"></span>{this.state.moduleName}</div>
                {this.state.data.map((item, i) => {
                    return (
                        <div className="item clearfix" key={i}>
                            <a className="link" href={'detail.html?categoryId=' + (item.category_id || getSearchPara('categoryId')) + '&id=' + item.id}>
                                <span className="pic-wrap"><img className="pic" src={item.pic_url} alt=""/></span>
                                <div className="content">
                                    <div className="detail-title">{item.title}</div>
                                    <div className="detail-subtitle">{item.subhead}</div>
                                    {/*<div className="detail-info">{item.author} &nbsp;&nbsp;&nbsp; {formatArticleDate(item.incident_time)}</div>*/}
                                    <div className="detail-info">{item.author} &nbsp;&nbsp;&nbsp; {formatArticleDate(item.date)}</div>
                                </div>
                            </a>
                        </div>
                    )
                })}
                {this.state.pageCount > currPage && (
                    <div className="more-items" onClick={this.fetchMore.bind(this)}>查看更多</div>
                )}
            </div>
        );
    }
}

export default Module