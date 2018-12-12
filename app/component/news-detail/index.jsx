 import React from 'react'
import '@/public/css/news-detail.pcss'
import News from '@/component/common/News'
import Breadcrumb from '@/component/common/Breadcrumb'

class NewsMore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbData: [{
                path: 'news-more.html?categoryId=999',
                val: '快讯'
            }, {
                val: '详情'
            }]
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="news-detail">
                <div style={{height: '10px', backgroundColor: '#f0f0f6'}}></div>
                <Breadcrumb data={this.state.breadcrumbData}></Breadcrumb>
                <div className="news-more clearfix">
                    <News isDetail={true}/>
                </div>

            </div>
        );
    }
}

export default NewsMore