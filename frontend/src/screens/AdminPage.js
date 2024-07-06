import React from 'react'
import {useParams} from "react-router-dom"

const AdminPage = () => {
    const {Name}=useParams()
  return (
    <div onClick={()=>{
        console.log(Name)
    }}>AdminPage</div>
  )
}

export default AdminPage