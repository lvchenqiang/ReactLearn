import React, { Component } from 'react'
import CommentHeader from '../CommentHeader'
import CommentList from '../CommentList'


import './styles.css'
export default class CommentApp extends Component {
    constructor() {
        super()
        this.state = {
            comments: []
        }
    }
    render() {
        return (
            <div className="wrapper">
                <CommentHeader onSubmit={this._handleSubmitComment.bind(this)} />
                <CommentList comments={this.state.comments}/>
            </div>
        )
    }
    _handleSubmitComment(comment) {
        this.state.comments.push(comment)
        this.setState({
            comments: this.state.comments
        })
    }
}
