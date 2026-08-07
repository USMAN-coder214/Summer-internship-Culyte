
import { useState } from "react";

function CourseStatus(){
const [isCompleted, setIsCompleted] = useState(false);

return(
    
    <>
    <h2>Wellcome!</h2>
    {isCompleted && <p>Course is Avaiable</p>}

    {isCompleted ? "Course  completed" : "Course in Progress"}
    <button 
    type="button"
    onClick={()=> setIsCompleted(!isCompleted)}
    >
        {isCompleted ?"Mark Incomplete":"Mark Complete"}
    </button>
    </>
)
}
export default CourseStatus