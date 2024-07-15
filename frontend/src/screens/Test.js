import React,{useRef} from 'react'

const Test = () => {
  const InputData=useRef()
  const Data=useRef()
  return (
    <>
    <input ref={InputData} type='text'/>
    <button onClick={(e)=>{
      e.stopPropagation()
      console.log(Data.current.value.split(/\t|\n/))

      
      
      // console.log(InputData.current.value.split(/\s/))
      
      
      
     

    }}>
      Convert to array
    </button>
    <textarea ref={Data} cols={20} rows={1}>

    </textarea>

   
    </>
  )
}

export default Test