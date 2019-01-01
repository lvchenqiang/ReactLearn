import React, { Component } from 'react'
import './styles.css'
export default class Comment extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            comment: ''
        }
    }

    render() {
        return (
            <div className="comment">
                <div className='comment-user'>
                    <span>{this.props.comment.username} </span>：
                </div>
                <p>{this.props.comment.comment}</p>
            </div>

        )
    }
}
