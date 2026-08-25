import { useCounter } from "../store/useCounter";


function Button4(){

const increase = useCounter(
  (state)=>state.increase
);


return (

<button onClick={increase}>
Add
</button>

)

}


export default Button4;