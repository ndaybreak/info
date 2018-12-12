import React from 'react'
import '@/public/css/module-detail.pcss'
import Breadcrumb from '@/component/common/Breadcrumb'
import { getSearchPara, getMenuNameById, formatArticleDate } from '@/utils'
import { getModuleDetail } from '@/api'

class NewsMore extends React.Component {
    constructor(props) {
        super(props);
        const categoryId =getSearchPara('categoryId')
        this.state = {
            breadcrumbData: [{
                path: 'index.html?categoryId=' + categoryId,
                val: getMenuNameById(categoryId)
            }, {
                val: '文章详情'
            }],
            detail: {}
        }
    }

    componentDidMount() {
        getModuleDetail(getSearchPara('id')).then(res => {
            this.setState({
                detail: res.data[0]
            })
        })
    }

    componentWillUnmount() {
    }

    render() {
        const detail = this.state.detail
        return (
            <div className="module-detail">
                <div style={{height: '10px', backgroundColor: '#f0f0f6'}}></div>
                <div className="detail-cont clearfix">
                    <Breadcrumb data={this.state.breadcrumbData}></Breadcrumb>
                    <div className="title">{detail.title}</div>
                    <div className="info">责任编辑：{detail.author}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatArticleDate(detail.incident_time)}</div>
                    <div className="content"  dangerouslySetInnerHTML={{__html: detail.content}}></div>
                </div>

            </div>
        );
    }
}

export default NewsMore