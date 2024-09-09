import React, { useState,useEffect, useRef} from "react";
import io from 'socket.io-client';
const socket = io('https://gehazik-server.onrender.com'); // Connect to the Node.js server
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
  let MassageData={Sender:globalState.Name,Message:message}
  socket.emit('send_message', MassageData);
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
  {chat.map((item,index)=>(
    <div className={item.Sender===globalState.Name?"d-flex justify-content-end my-1":"d-flex justify-content-start my-1"}  key={index}>
      <div style={{width:'80%',backgroundColor:item.Sender===globalState.Name?"#BBF8A7":"#A7DDF8", wordBreak:'break-word'}}>
      {item.Sender}: {item.Message}
        </div>
        
      </div>
  ))}
 </div>
 </>
  );
};
export default Test;
