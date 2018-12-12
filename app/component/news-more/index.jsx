import React from 'react'
import '@/public/css/news-more.pcss'
import News from '@/component/common/News'

class NewsMore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <div style={{height: '10px', backgroundColor: '#f0f0f6'}}></div>
                <div className="news-more clearfix">
                    <News isMore={true}/>
                </div>

            </div>
        );
    }
}

export default NewsMore