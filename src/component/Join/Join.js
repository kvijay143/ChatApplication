import React, { useEffect, useState } from 'react'
import "./Join.css";
import logo from"../../images/logo.png"
import { Link } from 'react-router-dom';
let user;
 const sendUser =()=>{

    user=document.getElementById("joinInput").value ;
    document.getElementById("joinInput").value="";
}
 const Join = () => {
  const[name,setname]=useState("");
 // console.log(name);
 
  
  
  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <img src={logo} alt="logo"/>
        <h1>C CHAT</h1>
        <input type='text' onChange={(e)=>setname(e.target.value)} id='joinInput' placeholder='Enter your name'/>
       <Link onClick={(event)=> !name ?event.preventDefault():null } to='/chat'><button className='joinbtn' onClick={sendUser}>Login</button></Link> 

        </div>
     
    </div>
  )
}

 export default Join;
export  {user};
