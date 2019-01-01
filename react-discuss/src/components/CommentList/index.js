import React, { Component } from 'react'
import Comment from '../Comment'

import './styles.css'

export default class CommentList extends Component {
    static defaultProps = {
        comments: []
      }
      
    render() {
        return (
            <div>
                {this.props.comments.map((comment,i) =>
                    <Comment comment={comment} key={i}/>
                )}
            </div>
        )
    }
}
