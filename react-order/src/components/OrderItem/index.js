import React, { Component } from 'react'
import './styles.css';
export default class OrderItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            stars: props.data.stars || 0 ,
            comment: props.data.comment || ''
           }
      }


    render() {
        const {
            shop,
            name,
            product,
            picture,
            ifCommented
        } = this.props.data

        return (
            <div className="orderItem">
                <div className="orderItem_left">
                    <div className="orderItem__picContainer">
                        <img className="orderItem__pic" src={picture} alt=""></img>
                    </div>

                    <div className="orderItem_content">
                        <div className="orderItem_product">{name}}</div>
                        <div className="orderItem_shop">{shop}}</div>
                        <div className="orderItem_detail">
                            <div className="orderItem_price"> {product}}</div>
                        </div>
                    </div>
                </div>

                <div className="orderItem_right">
                    <div className="orderItem__buttom">
                        {
                            ifCommented ? (
                                <button className="orderItem__btn orderItem__btn--grey">
                                    已评价
                </button>
                            ) : (
                                    <button
                                        className="orderItem__btn orderItem__btn--red"
                                        onClick={this.hendOpenEditArea}
                                    >
                                        评价
                </button>
                                )}
                    </div>
                </div>



            </div>
        )
    }

    renderEditArea() {
        return (
          <div className="orderItem__commentContainer">
            <textarea
              onChange={this.handleCommentChange}
              value={this.state.comment}
              className="orderItem__comment"
              name=""
              id=""
              cols="50"
              rows="5"
            />
            {this.renderStart()}
            <div>
              <button
                className="orderItem__btn orderItem__btn--red"
                onClick={this.hendSubmitComment}
              >
                提交
              </button>
              <button
                className="orderItem__btn orderItem__btn--grey"
                onClick={this.hendCloseComment}
              >
                取消
              </button>
            </div>
            
          </div>
        )
      }
    
      renderStart() {
        const { stars } = this.state
        return (
          <div>
            {[1, 2, 3, 4, 5].map((e, index) => {
              const lightClass = stars >= e ? 'orderItem_star--light' : ''
              return (
                <span
                  className = {
                    "rderItem__stars " + lightClass
                  }
                  key={index}
                  onClick={this.handleClickStart.bind(this, e)}
                >
                  ★
                </span>
              )
            })}
          </div>
        )
      }
      // 打开评价
      hendOpenEditArea = () => {
        this.setState({
          editing: !this.state.editing
        })
      }
      // 评论框Change事件
      handleCommentChange = e => {
        this.setState({ comment: e.target.value })
      }
      // 评分
      handleClickStart = stars => {
        console.log(stars)
        this.setState({ stars })
      }
      // 取消
      hendCloseComment = () => {
        console.log(this.props.data.rarts);
        
        this.setState({
          editing: false,
          comment: this.props.data.comment || '',
          stars: this.props.data.stars || 0
        })
      }
      // 提交
      hendSubmitComment = () => {
        const {id} = this.props.data
        const { comment, stars } = this.state
        this.setState({ editing: false })
    
        this.props.onSubmit(id, comment, stars)
      }
    }
    


