import React, { useState,useEffect, useRef} from "react";
import io from 'socket.io-client';
const socket = io('http://localhost:5000'); // Connect to the Node.js server
const Test = ({globalState}) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const Hasemitted=useRef(false)
 
  useEffect(() => {
    console.log(globalState)
    if(!Hasemitted.current){
      socket.emit("Add_User",globalState.email)
      Hasemitted.current=true
    }
    
    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });
    return () => {
      socket.off('Add_User');
      socket.off('receive_message');
    };
  }, []);
  return (
 <>
 <button onClick={(e)=>{
  e.stopPropagation()
  socket.emit('send_message', message);
 }}>
  click
 </button>
 <button onClick={(e)=>{
  e.stopPropagation()
 
 }}>
  Click2
 </button>
 <div>
  <div>
    <input type="text" onChange={(e)=>{
      setMessage(e.target.value)
    }}/>
  </div>
  {chat.map(item=>(
    <div key={item}>
      {item}
      </div>
  ))}
 </div>
 </>
  );
};
export default Test;
