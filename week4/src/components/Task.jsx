import { useState } from "react";

function Task(){
   const [color,SetColor]=useState("Red")
   const [value,SetValue]=useState(
    {
        name:"Usman",
        age:21,
        email:"uk@gmail.com"
    }
   )
   const  changeAge=()=>{
     SetValue({...value,age:22})
   }

   return(
    <div>
    <h1> My fvrt color is {color} </h1>
         <br />
        <button 
        type="button"
        onClick={()=>SetColor("Orange")}
        >Orange</button>
         <br />
        <button 
        type="button"
        onClick={()=>SetColor("Pink")}
        >Pink</button>
        <br />
        <h2>Data</h2>
        <p>Name:{value.name}</p>
        <p>Age:{value.age}</p>
        <p>Email:{value.email}</p>
        <button onClick={changeAge}>Change Age</button>
    </div>
    
   )
}
export default Task;