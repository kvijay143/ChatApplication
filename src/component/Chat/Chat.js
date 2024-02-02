import React, { useEffect, useState } from 'react';
import { user } from "../Join/Join";
import "./Chat.css";
import socketIO from 'socket.io-client';
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrolltToBottom from "react-scroll-to-bottom";  
 //component to automaticaaly scrolls the newer messages as soon the user logins the system
 import closeIcon from "../../images/closeIcon.png"
 let socket;
const ENDPOINT = "http://localhost:4501/";

const Chat = () => {
    const[userid,setuserid]=useState("");
    const[messages,setMessages]=useState([]);
      
    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, userid, id: socket.id });
        document.getElementById('chatInput').value = "";
    }
    
    console.log(messages);
    useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ['websocket'] });
        console.log("useEffect is running...");

        socket.on('connect', () => {
            console.log("Socket connected!");
            setuserid(socket.id);  // store the id of a socket in userid state field
        });

        console.log(socket);

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
             setMessages([...messages,data])  // setMessages([...messages, data]) in React signifies the use of the spread operator (...)
             // to create a new array with the existing elements from the messages array, followed by the addition of a new element data. 
             //This is a common pattern used when updating state in React.
            console.log(data.user,data.message)
        });
        socket.on('userJoined',(data)=>{
            setMessages([...messages,data])
            console.log(data.user,data.message);
        })
        socket.on('leave',(data)=>{
            console.log(data.user,data.message);
        })

        
        return () => {
          //  console.log("useEffect cleanup...");
            // Clean up any event listeners or subscriptions here
            socket.emit('userLeft',{user});
            socket.off();
        };
    }, []); // Empty dependency array to run the effect only once
       useEffect(() => {
        socket.on('userLeft', (data) => {
            setMessages([...messages,data])
            console.log(`${data.user} has left the chat`);
            // Handle user leaving the chat, e.g., update user list, display a message, etc.
        });

         socket.on('sendMessage',(data)=>{
            setMessages([...messages,data]);
           console.log(data.user,data.message,data.userid);
         })
       
         return () => {
           socket.off();
         }
       }, [messages])
       
    return (
        <div className='chatPage'>
            <div className='chatConatiner'>
                <div className='header'>
                    <h2 >C-Chat</h2>
                  <a href='/'><img src={closeIcon} alt='Close'/> </a> 
                </div>
              <ReactScrolltToBottom  className='chatBox'>
                    {messages.map((item,i)=> <Message  user={item.userid===userid ?'': item.user} message={item.message} classs={item.userid===userid ?'right' : 'left'}/>)}
                    
                    
                </ReactScrolltToBottom>
                <div className="inputBox">
                    <input onKeyPress={(event)=>event.key==='Enter' ? send(): null} type="text" id='chatInput'placeholder='Enter your message here'></input>
                    <button  onClick={send} className='sendBtn'><img src={sendLogo} alt='Send'></img></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;

