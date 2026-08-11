
function StudentInput({setStudentName}){
   // return <h3>Typed:{setStudentName}</h3>
    return (
    <input
      type="text"
      onChange={(e) => setStudentName(e.target.value)}
      placeholder="Enter student name"
    />
  );

}
export default StudentInput;