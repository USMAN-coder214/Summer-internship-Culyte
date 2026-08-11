import { useState } from "react";

export default function useToggle(){

    const [isVisible, setIsVisible] = useState(false);

    const change = ()=>{
        setIsVisible(true)
    }
    const changes=()=>{
        setIsVisible(false)
    }
    return{
        isVisible,
        change,
        changes,
    };
}