import React, { Component } from 'react'
import CommentHeader from './CommentHeader'
import CommentList from './CommentList'

export default class CommentApp extends Component {
  render() {
    return (
      <div className='wrapper'>
        <CommentHeader />
        <CommentList />
      </div>
    )
  }
}