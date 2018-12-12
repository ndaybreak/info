import React from 'react';
// import { getRecommendCoins } from '@/api'

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUp: false,
            activeCategory: 'BTC',
            data: [],
            recommendData: []
        }
    }

    componentWillMount() {

    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="home-content">
                content
            </div>
        );
    }
}

export default Content;