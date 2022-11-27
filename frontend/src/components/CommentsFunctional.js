import React, { useEffect, useReducer, useState, useRef } from 'react'
import './css/Comments.css'
import SubmitComments from './SubmitComment'

import NavbarHeader from './NavbarHeader'
import SocialMedia from './SocialMedia'


import { Await } from 'react-router-dom'



export const CommentsFunctional = () => {

  const [commentList, setCommentList] = useState([]);
  const [comment,setComment] = useState("");
  const [name,setName] = useState("");
  const [reducerValue,forceUpdate] = useReducer(x=>x+1,0);
  const [submitted,setSubmitted] = useState(false)
  
  const commentButtonPressed = () => {
    if (submitted){
      return
    }
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          comment: comment,
        }),
      };
      fetch("/api/submit-comment", requestOptions)

        .then((response) => {
          console.log(response.status)
          if (response.status === 201){
            setSubmitted(true)
            setTimeout(() => {messageRef.current.className = "SubmitResponseOn"}, 1)
            setTimeout(() => {messageRef.current.className = "SubmitResponseOff"}, 4000)
          } else {
            setTimeout(() => {messageRef.current.innerHTML = "Error! Could Not Submit"}, 1)
            setTimeout(() => {messageRef.current.className = "SubmitResponseOn"}, 1)
            setTimeout(() => {messageRef.current.className = "SubmitResponseOff"}, 4000)
          }
        })
        .then(forceUpdate);
        //.then((data) => this.props.history.push(""));
      
  }

  const handleTextFieldChange = (e) => {
    setComment(e.target.value)
  }

  const handleTextFieldChange2 = (e) => {
    setName(e.target.value)
  }

  

  useEffect(()=>{
    const getComments = () => {
      fetch("/api/get-comments")
        .then((response) => response.json())
        .then((data) => {
          var commentsArray = Object.values(data)
          console.log(commentsArray)
          setCommentList(commentsArray)
        });
    }
    getComments()
  }, [reducerValue])
  
 

  const loadComments = commentList.map((comment) => {
    return (
      <div className='Comment home-paragraph'>
            <h2 className='commentName'>{comment.name}</h2>
            <p className='commentText'>{comment.comment}</p>
        </div>
    );
  })

  const timeout = (delay) => {
    return new Promise( res => setTimeout(res, delay) );
  }

  const messageRef = useRef(null);

  return (

  <React.Fragment>
      
      <div className='Comments Body HomeBody'>
        
        <div className='CommentForm home-paragraph WhiteText text-center'>
              <h1>Comment</h1>
              <input onChange={handleTextFieldChange2} placeholder="Name" className='commentFormTextInput' type='text'></input>
              <textarea placeholder="Comment" onChange={handleTextFieldChange} className='commentFormText' rows={10} cols={50} maxLength={200}></textarea>
              <button className='SubmitButton' onClick={() => {commentButtonPressed()}} >Submit</button>
            
        </div>
        <h3 ref={messageRef} className='SubmitResponseOff'>Comment Submitted!</h3>
        {loadComments}
        
        
        

          
           
      </div>
  </React.Fragment>

  )
  

}



