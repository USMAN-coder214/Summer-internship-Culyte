import { useState,useEffect } from "react";

function useDebounce(value,delay){
    const [search,setSearch]=useState(value)

    useEffect(()=>{
   const Timer = setTimeout(() => {
        setSearch(value)
    }, delay);

    return ()=>{
        clearTimeout(Timer)
    }
    },[value,delay])
   return search
}
export default useDebounce;