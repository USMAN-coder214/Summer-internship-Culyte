import useToggle from "./hooks/useToggle"

function ToggleMessage(){
const{isVisible,change,changes}=useToggle()

return(
    <div>
        <h2>{isVisible ? "true" : "false"}</h2>
        <button onClick={change}>Show</button>
        <button onCanPlay={changes}>Hide</button>
    </div>
)
}
export default ToggleMessage