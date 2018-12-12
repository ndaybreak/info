import React from 'react'
import { search } from '@/api'
import '@/public/css/search.pcss'
import SearchResult from '@/component/search/SearchResult'
import PaginationServer from '@/component/common/PaginationServer'
import { getSearchPara } from '@/utils'
import SearchInput from '@/component/common/SearchInput'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: getSearchPara('categoryId'),
            data: [],
            defaultSearchVal: getSearchPara('search') || '',
            totalCount: 0,
            currPage: 1,
            searchVal: getSearchPara('search') || ''
        }
    }

    componentDidMount() {
        this.getData(this.state.searchVal, 1)
    }

    componentWillUnmount() {
    }

    getData(val, page) {
        val = (val + '').trim()
        if(!val) {
            return
        }
        search(val, page).then(res => {
            this.setState({
                data: res.data,
                totalCount: res.pageInfo.totalCount,
                searchVal: val
            })
        })
    }

    handleSearch(val) {
        if(!val) {
            return
        }
        this.getData(val, 1)
    }

    pageChange(page) {
        this.getData(this.state.searchVal, page)
    }

    render() {
        return (
            <div className="search">
                <div style={{height: '10px', backgroundColor: '#f0f0f6'}}></div>
                <div className="search-cont">
                    <div className="search-title clearfix">
                        <span className="label">全站搜索</span>
                        <SearchInput search={this.handleSearch.bind(this)} defaultValue={this.state.defaultSearchVal}/>
                    </div>
                    <div className="result-info">
                        <span>"{this.state.searchVal}"</span> 的结果： <span>{this.state.totalCount}</span>条
                    </div>

                    <SearchResult data={this.state.data} search={this.state.searchVal}/>
                    <div className="paging">
                        <PaginationServer onChangePage={this.pageChange.bind(this)} total={this.state.totalCount}
                          initialPage={this.state.currPage} pageSize={15}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search