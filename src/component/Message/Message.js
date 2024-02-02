import React from 'react'
import './Message.css'
const Message = ({user,message,classs}) => {
    if(user){
  return (
    <div className= {`messageBox ${classs}`}>
      {`${user}: ${message}` } { /*accessing the data through props */}
    </div>
  )
    }
    else{
        return(
            <div className={`messageBox ${classs}`}>
                {`You :${message}`}
            </div>
        )
    }
}

export default Message;