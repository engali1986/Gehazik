import React,{useRef,useState} from 'react'
import Egypt from '../Data/Cities'

const Test = () => {
  const [Cities,SetCities]=useState([])
  const [Town,SetTown]=useState([])
  
  return (
    <>
    <button onClick={()=>{
      console.log(Egypt)
      console.log(Egypt.Cairo)
      console.log(Object.keys(Egypt))
      const Keyes=Object.keys(Egypt)
      SetCities(Keyes)
    }}>
      Click to get cities
    </button>
    <select style={{maxHeight:"300px", overflow:'scroll'}} onChange={(e)=>{
      e.stopPropagation()
      console.log(e.target.value)
      console.log(typeof e.target.value)
      
    }}>
      {Cities.map(City=>(
        <>
          {Object.keys(Egypt[City]).map(Townr=>(
            <option>
              {Townr}
            </option>
          ))}
        </>
      ))}
    </select>
    
    
    
    </>
  )
}

export default Test