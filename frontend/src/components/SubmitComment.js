import React, { Component } from "react";

export default class SubmitComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
          roomCode: "",
          error: "",
          comment: "",
        };
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.commentButtonPressed = this.commentButtonPressed.bind(this);
     }

  render() {
    return (
        <div className='CommentForm home-paragraph WhiteText text-center'>
            <div id='CommentForm' className='CommentForm home-paragraph WhiteText text-center'>
            <h1>Comment</h1>
              <textarea onChange={this.handleTextFieldChange} className='commentFormText' rows={10} cols={50} maxLength={200}></textarea>
              <button className='SubmitButton' onClick={this.commentButtonPressed} >Submit</button>
            </div>
        </div>
    );
  }

  handleTextFieldChange(e) {
    this.setState({
      comment: e.target.value,
    });
    console.log(e.target.value)
  }

  commentButtonPressed() {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "A nice recruiter",
          comment: this.state.comment,
        }),
      };
      fetch("/api/submit-comment", requestOptions)
        .then((response) => response.json())
        .then((data) => this.props.history.push(""));
  }
}
