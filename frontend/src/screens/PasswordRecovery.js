import React,{useEffect,useState,useRef} from 'react'
import {useNavigate } from "react-router-dom"

const PasswordRecovery = () => {
  const navigate=useNavigate()
  const Alert=useRef()
  const [Email,setEmail]=useState("")
  const EmailInput=(x)=>{
    Alert.current.style.maxHeight="0px"
    setEmail(x.target.value)

    console.log(Email)
    console.log(x.target.value)
  }

  const PasswordRecoverySubmit=async()=>{
    console.log("submitted")
    
    if (Email.length===0 || Email.match(/\s/)) {
      console.log("enter valid email")
      Alert.current.classList.replace("alert-success","alert-danger")
      Alert.current.innerText="Please enter valid email"
      Alert.current.style.maxHeight="500px"
      
    } else if(Email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
      
      Alert.current.innerText=""
      Alert.current.style.maxHeight="0px"
      console.log(Email)
    console.log("submitted")
    const Credintials={
      email:Email
    }

    const PassRecovery=await fetch("http://localhost:5000/PasswordRecovery",{
        method:"POST",
        body:JSON.stringify(Credintials),
        headers: {
          "Content-Type": "application/json",
        },
        mode:"cors"

      }).then(res=>{
        console.log(res)
       
        
        return res.json()
      }).catch(err=>{
        return "user Not Added"
      })

      console.log(PassRecovery)

      if (PassRecovery.resp===Email) {

        Alert.current.classList.replace("alert-danger","alert-success")
      Alert.current.innerText="Your password sent by Email you will be redirected to Login page in 3 seconds"
      Alert.current.style.maxHeight="500px"

      setTimeout(()=>{
        Alert.current.classList.replace("alert-danger","alert-success")
        Alert.current.innerText=""
        Alert.current.style.maxHeight="0px"
  

        navigate("/LogIn")
      },3000)


        
      }else{
        Alert.current.classList.replace("alert-success","alert-danger")
      Alert.current.innerText="Please enter valid email"
      Alert.current.style.maxHeight="500px"

      }
      
      
    }

  }
    
  return (
    <div className='container1'>
   
    <div >
      <label htmlFor="Email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="Email" onChange={(e)=>EmailInput(e)} required/>
    </div>
    <div ref={Alert} className=" alert alert-danger text-start" style={{boxSizing:'border-box',marginBottom:"0",overflow:'hidden',padding:"0px",border:"0px",maxHeight:'0px',transition:"all 0.3s ease-in-out"}} role="alert">
  
    </div>
    <button className="LogInButton" onClick={()=>PasswordRecoverySubmit()}  >Submit</button>
    </div>
  )
}

export default PasswordRecovery
