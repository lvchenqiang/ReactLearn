import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearctInfoList,
  SearchInfoItem
} from './style'
class Header extends Component {
  constructor(props) {
    super(props)
    console.log('组件加载')
    this.state = {
      angle: 360
    }
  }
  render() {
    const {
      focused,
      handInputFocus,
      handInputBlur,
      list,
      login,
      logout
    } = this.props
    return (
      <HeaderWrapper>
        <Link to="/">
          <Logo />
        </Link>
        <Nav>
          <NavItem className="left action">首页</NavItem>
          <NavItem className="left">下载App</NavItem>
          {login ? (
            <NavItem className="right" onClick={logout}>
              退出
            </NavItem>
          ) : (
            <Link to="/login">
              <NavItem className="right">登录</NavItem>
            </Link>
          )}
          <NavItem className="right">
            <i className="iconfont">&#xe636;</i>
          </NavItem>

          <SearchWrapper>
            <CSSTransition in={focused} timeout={500} classNames="slide">
              <NavSearch
                className={focused ? 'focused' : ''}
                onFocus={() => {
                  handInputFocus(list)
                }}
                onBlur={handInputBlur}
              />
            </CSSTransition>

            <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>
              &#xe614;
            </i>
            {this.getlistArea()}
          </SearchWrapper>
        </Nav>

        <Addition>
          <Link to="/write">
            <Button className="writting">
              <i className="iconfont">&#xe624;</i>写文章
            </Button>
          </Link>
          {login ? '' : <Button className="reg">注册</Button>}
        </Addition>
      </HeaderWrapper>
    )
  }
  getlistArea() {
    const {
      focused,
      list,
      page,
      totalPage,
      mouseIn,
      handMouseEnter,
      handMouseLeave,
      handleChangPage
    } = this.props
    const newList = list.toJS()
    const pageList = []
    if (focused || mouseIn) {
      // 其实位置为0
      if (newList.length) {
        for (
          let i = page * 10;
          i < (page + 1) * 10 && newList.length > i;
          i++
        ) {
          pageList.push(
            <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
          )
        }
      }

      return (
        <SearchInfo onMouseEnter={handMouseEnter} onMouseLeave={handMouseLeave}>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch
              onClick={() => handleChangPage(page, totalPage, this.spinIcon)}
            >
              <i
                ref={spin => {
                  this.spinIcon = spin
                }}
                className="iconfont spin"
              >
                &#xe865;
              </i>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearctInfoList>{pageList}</SearctInfoList>
        </SearchInfo>
      )
    } else {
      return null
    }
  }
}
const mapStateToProps = state => {
  return {
    focused: state.header.get('focused'),
    list: state.header.get('list'),
    page: state.header.get('page'),
    totalPage: state.header.get('totalPage'),
    mouseIn: state.header.get('mouseIn'),
    login: state.login.get('login')
  }
}
const mapDuspatchToProps = dispatch => {
  return {
    handInputFocus(list) {
      // list有数据的情况下 不在请求数据
      if (!list.size) dispatch(actionCreators.getList())
      dispatch(actionCreators.openFocus())
    },
    handInputBlur() {
      dispatch(actionCreators.closeFocus())
    },
    handMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },
    handMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },
    handleChangPage(page, totalPage, spinIcon) {
      let orginAngle = spinIcon.style.transform.replace(/[^0-9]/gi, '')
      console.log(orginAngle)

      if (orginAngle) {
        orginAngle = parseInt(orginAngle, 10)
      } else {
        orginAngle = 0
      }
      // 这里不需要累加 因为这不是数据 这是dom上面的正则匹配下来的数据 这里加了360 就会留存到dom上面 下次直接获取就行了
      spinIcon.style.transform = `rotate(${orginAngle + 360}deg)`
      // console.log(spinIcon.style.transform);
      // orginAngle = 360 + orginAngle;
      if (page < totalPage - 1) {
        dispatch(actionCreators.changePage(page + 1))
      } else {
        dispatch(actionCreators.changePage(0))
      }
    },
    logout() {
      // 虽然这里的 dispatch 在header组件里面 但是派发的action是全局action可以接收到的 所以后面的对login的操作在login里面写就行了
      dispatch(loginActionCreators.logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDuspatchToProps
)(Header)
