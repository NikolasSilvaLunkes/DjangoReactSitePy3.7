import React, { Component } from "react";

import './css/Comments.css'
import SubmitComments from './SubmitComment'

export default class CommentsObject extends Component {
    constructor(props) {
        super(props);
        this.state = {
          comments: [],
          error: "",
          comment: "",
          name: ""
        };
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleTextFieldChange2 = this.handleTextFieldChange2.bind(this);
        this.commentButtonPressed = this.commentButtonPressed.bind(this);
     }

     handleTextFieldChange(e) {
      this.setState({
        comment: e.target.value,
      });
      console.log(e.target.value)
    }

    handleTextFieldChange2(e) {
      this.setState({
        name: e.target.value,
      });
      console.log(e.target.value)
    }
  
    commentButtonPressed() {
      const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.state.name,
            comment: this.state.comment,
          }),
        };
        fetch("/api/submit-comment", requestOptions)
          .then((response) => response.json());
          //.then((data) => this.props.history.push(""));
    }
     
     componentDidMount(){
      console.log("asdasdas")
      fetch("/api/get-comments")
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          console.log(Object.values(data))
          var commentsArray = Object.values(data)
          console.log(commentsArray)
          this.setState({ comments: commentsArray })
        });
     }

  render() {

    const loadComments = this.state.comments.map((comment) => {
      return (
        <div className='Comment home-paragraph'>
              <h2 className='commentName'>{comment.name}</h2>
              <p className='commentText'>{comment.comment}</p>
          </div>
      );
    })

    
    return (
      <React.Fragment>
      
      <div className='Comments Body HomeBody'>
        
        <div className='CommentForm home-paragraph WhiteText text-center'>
              <h1>Comment</h1>
              <input onChange={this.handleTextFieldChange2} placeholder="Name" className='commentFormTextInput' type='text'></input>
              <textarea placeholder="Comment" onChange={this.handleTextFieldChange} className='commentFormText' rows={10} cols={50} maxLength={200}></textarea>
              <button className='SubmitButton' onClick={() => {this.commentButtonPressed(); this.forceUpdate()}} >Submit</button>
            
        </div>
          {loadComments}
          

          
           
      </div>
  </React.Fragment>
    );
  }

  

  
}
