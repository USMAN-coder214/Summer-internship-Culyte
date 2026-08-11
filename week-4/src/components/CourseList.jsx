

function CourseList(){
    const courses = [
  {
    id: 1,
    title: "React JS",
    duration: "4 Weeks",
  },
  {
    id: 2,
    title: "Tailwind CSS",
    duration: "2 Weeks",
  },
  {
    id: 3,
    title: "Node.js",
    duration: "5 Weeks",
  },
];

return(
    <>
    {courses.map((course)=>{
        return(
        <p key={course.id}>
            {course.title}--{course.duration}
        </p>
        )
    })}
    </>
)
}
export default CourseList