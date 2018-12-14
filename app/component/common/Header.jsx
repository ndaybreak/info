import React from 'react'
import { getSearchPara, jumpUrl } from '@/utils'
import { getMenus } from '@/api'
import { setSessionData } from '@/data'
import eventProxy from '@/utils/eventProxy'
import 'antd/lib/icon/style/css'
import '@/public/css/common.pcss'
import logoImg from '@/public/img/logo.png'
// import logoImg from '@/public/img/logo.jpg'
import codeImg from '@/public/img/code.jpg'
import SearchInput from '@/component/common/SearchInput'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMenuId: getSearchPara('categoryId'),
            menus: []
        }
    }

    componentDidMount() {
        getMenus().then(res => {
            this.setState({
                menus: res.data
            })
            setSessionData('menus', JSON.stringify(res.data))
            eventProxy.trigger('menusDone')
        })
    }

    componentWillUnmount() {
    }

    showSubmenu(status) {
        let obj = {}
        obj[status] = true
        this.setState(obj)
    }

    hideSubmenu(status) {
        let obj = {}
        obj[status] = false
        this.setState(obj)
    }

    goHome() {
        jumpUrl('index.html')
    }

    render() {
        return (
            <div className="a-header">
                <div className="header-wrap clearfix">
                    <div className="logo-wrap">
                        <img src={logoImg} alt="" className="logo" onClick={this.goHome.bind(this)}/>
                    </div>
                    <nav className="nav">
                        <a className={!this.state.activeMenuId ? 'menu active' : 'menu'}  href="index.html">推荐</a>
                        {this.state.menus.map((menu, i) => {
                            return <a className={this.state.activeMenuId == menu.id ? 'menu active' : 'menu'} key={i}  href={'index.html?categoryId=' + menu.id}>{menu.name}</a>
                        })}
                    </nav>
                    <div className="right-part">
                        <SearchInput/>
                        <img className="wechat-code" src={codeImg} alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header