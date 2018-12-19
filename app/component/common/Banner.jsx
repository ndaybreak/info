import React from 'react'
import '@/public/css/banner.pcss'
import { getBannerData } from '@/api'
import { jumpUrl } from '@/utils'
import leftBtn from '@/public/img/左箭头-up.png'
import leftBtnOver from '@/public/img/左箭头-over.png'
import rightBtn from '@/public/img/右箭头-up.png'
import rightBtnOver from '@/public/img/右箭头-over.png'
import dotImg from '@/public/img/dot.png'
import dotImgActive from '@/public/img/dot_active.png'


let interval

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initDone: false,
            wrapTransition: '0.25s',
            wrapWidth: '0',
            wrapOffsetX: -400,
            leftBtn: leftBtn,
            rightBtn: rightBtn,
            activeIndex: 0,
            data: [],
            bannerData: [],
            itemsLength: 0
        }
    }

    componentDidMount() {
        getBannerData().then(res => {
            const data = res.data
            if(data.length < 3) {
                return
            }
            const bannerData = this.formatBannerData(data)
            this.setState({
                data: data,
                bannerData: bannerData,
                itemsLength: bannerData.length,
                wrapWidth: bannerData.length*400
            })
            this.startInterval()
        })
    }

    formatBannerData(data) {
        data.forEach((item, i) => {
            item.index = i
        })
        const len = data.length
        return [
            data[len - 2],
            data[len - 1],
            ...data,
            data[0],
            data[1]
        ]
    }

    componentWillUnmount() {
    }

    componentDidUpdate() {
        if(this.state.wrapOffsetX === 0) { // 此时banner处于开始位置, 然后定位到最后一条实际数据
            if(this.state.wrapTransition === '0s') {
                this.setState({
                    wrapOffsetX: -(this.state.itemsLength-4)*400
                })
                setTimeout(() => {
                    this.setState({
                        wrapTransition: '0.25s'
                    })
                }, 30)
            } else {
                setTimeout(() => {
                    this.setState({
                        wrapTransition: '0s'
                    })
                }, 250)
            }
        } else if(this.state.wrapOffsetX === -(this.state.itemsLength - 3)*400) { // 此时banner处于结束位置
            if(this.state.wrapTransition === '0s') {
                this.setState({
                    wrapOffsetX: -400
                })
                setTimeout(() => {
                    this.setState({
                        wrapTransition: '0.25s'
                    })
                }, 30)
            } else {
                setTimeout(() => {
                    this.setState({
                        wrapTransition: '0s'
                    })
                }, 250)
            }
        }
    }

    calculateActiveIndex(offsetXDone) {
        if(offsetXDone === 0) {
            return this.state.itemsLength - 5
        } else if(offsetXDone === -(this.state.itemsLength - 3)*400) {
            return 0
        } else {
            return Math.abs(offsetXDone/400) - 1
        }
    }

    goNext() {
        if(this.state.wrapOffsetX === -(this.state.itemsLength - 3)*400) {
            return
        }
        this.setState({
            wrapOffsetX: this.state.wrapOffsetX - 400,
            activeIndex: this.calculateActiveIndex(this.state.wrapOffsetX - 400)
        })
    }
    goPrev() {
        if(this.state.wrapOffsetX === 0) {
            return
        }
        this.setState({
            wrapOffsetX: this.state.wrapOffsetX + 400,
            activeIndex: this.calculateActiveIndex(this.state.wrapOffsetX + 400)
        })
    }

    startInterval() {
        this.stopInterval()
        this.setState({
            wrapTransition: '0.25s'
        })
        interval = setInterval(() => {
            this.goNext()
        }, 3000)
    }
    stopInterval() {
        clearInterval(interval)
    }

    leftBtnEnter() {
        this.setState({
            leftBtn: leftBtnOver
        })
    }
    leftBtnLeave() {
        this.setState({
            leftBtn: leftBtn
        })
    }
    rightBtnEnter() {
        this.setState({
            rightBtn: rightBtnOver
        })
    }
    rightBtnLeave() {
        this.setState({
            rightBtn: rightBtn
        })
    }

    changeActive(index) {
        this.setState({
            wrapOffsetX: -(index + 1)*400,
            activeIndex: index
        })
    }

    goDetail(item) {
        jumpUrl('detail.html',{
            categoryId: item.category_id || getSearchPara('categoryId'),
            id: item.id
        })
    }

    render() {
        if(this.state.data.length < 3) {
            return (
                <div style={{height: '264px'}}></div>
            )
        }
        return (
            <div className="tai-banner" onMouseEnter={this.stopInterval.bind(this)} onMouseLeave={this.startInterval.bind(this)}>
                <div className="tai-banner-wrap" style={{transition: this.state.wrapTransition, width: this.state.wrapWidth,
                    transform: 'translate3d(' + this.state.wrapOffsetX + 'px, 0px, 0px)'}}>
                  {this.state.bannerData.map((item, i) => {
                      return (
                          <div className="item" key={i} onClick={this.goDetail.bind(this, item)}>
                              <img src={item.banner_url} alt=""/>
                              <div className={this.state.activeIndex === item.index ? 'label' : 'label hide'}>{item.title}</div>
                          </div>
                      )
                  })}
                </div>
                <div className="tai-banner-tool">
                    <div className="left-cover"></div>
                    <div className="right-cover"></div>
                    <img className="btn-left" src={this.state.leftBtn} alt="" onClick={this.goPrev.bind(this)}
                         onMouseEnter={this.leftBtnEnter.bind(this)} onMouseLeave={this.leftBtnLeave.bind(this)}/>
                    <img className="btn-right" src={this.state.rightBtn} alt="" onClick={this.goNext.bind(this)}
                         onMouseEnter={this.rightBtnEnter.bind(this)} onMouseLeave={this.rightBtnLeave.bind(this)}/>
                    <div className="tai-dot-wrap">
                        {this.state.data.map((item, i) => {
                            return <img key={i} className="dot" src={this.state.activeIndex === i ? dotImgActive : dotImg} alt="" onClick={this.changeActive.bind(this, i)}/>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner