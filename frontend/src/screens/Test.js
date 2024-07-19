import React,{useRef,useState} from 'react'
import Egypt from '../Data/Cities'

const Test = () => {
  const [Cities,SetCities]=useState([])
  const [Town,SetTown]=useState([])
  
  return (
    <>
    <button onClick={async()=>{
          const Categories= await fetch("http://localhost:5000/Categories",{
      method:"Get",
      mode:"cors"
    }).then(res=>{
      
      return res.json()
    })

    console.log(Categories.MenuCategories)

    

    

//     console.log(Categories)
    }}>
      awsde
    </button>
    </>
  )
}

export default Test