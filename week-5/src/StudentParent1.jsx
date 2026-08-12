import { useState } from "react";
import StudentInput from "./components/StudentInput1"
import StudentDisplay from "./components/StudentDisplay1"
function Parent(){
    const [studentName, setStudentName] = useState("");

    return(
        <>
        <StudentInput setStudentName={setStudentName} />
        <StudentDisplay studentName={studentName}/>
        </>
    )
}
export default Parent; 