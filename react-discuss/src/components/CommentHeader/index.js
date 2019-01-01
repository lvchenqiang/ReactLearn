import React, { Component } from 'react'
import './styles.css'
export default class CommentHeader extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            comment: ''
        }
    }

    render() {
        return (
            <div className="comment-header">
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input value={this.state.username}
                            onChange={this._handleUsernameChange.bind(this)}
                        />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea value={this.state.comment}
                            onChange={this._handleContentChange.bind(this)}
                        />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button
                        onClick={this._handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>

            </div>
        )
    }

    _handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    _handleContentChange(event) {
        this.setState({
            comment: event.target.value
        })
    }
    _handleSubmit(event) {
        if (this.props.onSubmit) {
            const { username, comment } = this.state
            this.props.onSubmit({ username, comment })
        }
        this.setState({ comment: '' })
    }
}
