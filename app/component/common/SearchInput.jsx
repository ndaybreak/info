import React from 'react'
import { jumpUrl } from '@/utils'
import searchBtn from '@/public/img/search.png'
import searchBtnOver from '@/public/img/search_over.png'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue || '',
            searchBtn: searchBtn
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    handleSearch() {
        if(this.props.search) {
            this.props.search(this.state.value)
        } else {
            jumpUrl('search.html', {
                categoryId: 999,
                search: this.state.value
            })
        }
    }
    keyUp(e) {
        if(e.keyCode === 13) {
            this.handleSearch()
        }
    }

    searchBtnEnter() {
        this.setState({
            searchBtn: searchBtnOver
        })
    }
    searchBtnLeave() {
        this.setState({
            searchBtn: searchBtn
        })
    }

    render() {
        return (
            <div className="help-search-wrap">
                <input className="input-search" type="text" placeholder="请输入标题或内容" onKeyUp={this.keyUp.bind(this)} value={this.state.value} onChange={this.handleChange.bind(this)} />
                <button className="btn-help-search" onClick={this.handleSearch.bind(this)}>
                    <img className="btn-search" src={this.state.searchBtn} alt=""
                         onMouseEnter={this.searchBtnEnter.bind(this)} onMouseLeave={this.searchBtnLeave.bind(this)}/>
                </button>
            </div>
        );
    }
}

export default Header