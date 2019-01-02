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

    componentWillMount () {
        this._loadComments()
    }


    render() {
        return (
            <div className="wrapper">
                <CommentHeader onSubmit={this._handleSubmitComment.bind(this)} />
                <CommentList comments={this.state.comments} />
            </div>
        )
    }
    _handleSubmitComment(comment) {
        if (!comment) return
        if (!comment.username) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')
        const comments = this.state.comments
        comments.push(comment)
        this.setState({ comments })
        this._saveComments(comments)
    }



    _loadComments() {
        let comments = localStorage.getItem('comments')
        if (comments) {
            comments = JSON.parse(comments)
            this.setState({ comments })
        }
    }

    _saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments))
    }
}
