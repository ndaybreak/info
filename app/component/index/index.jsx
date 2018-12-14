import React from 'react';
import '@/public/css/index.pcss';
import Banner from '@/component/common/Banner'
import Module from '@/component/common/Module'
import News from '@/component/common/News'

const Index = () => {
    return (
        <div className="home">
            <Banner/>
            <div className="home-content clearfix">
                <Module/>
                {/*<News/>*/}
            </div>
        </div>
    )
}

export default Index;