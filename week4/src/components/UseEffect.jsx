import { useState,useEffect } from "react";

function Effect(){
 const [count, setCount] = useState(0);
 useEffect(()=>{
  console.log(`Count change to : ${count}`);
  
 },[count])

 return(
    <>
    <button 
    type="button"
    onClick={()=>setCount (count+1)}
    >Click</button>
    </>
 )
 }

export default Effect