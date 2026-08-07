// import CourseList from "./components/CourseList";
// import CourseStatus from "./components/CourseStatus";
// import Header from "./components/Header";
// import Main from "./components/Main";
// import Task from "./components/Task";
// import UserCard from "./components/UserCard";
// import Effect from "./components/UseEffect";

//import Tailwind from "./components/TailwandCss";
import InternProfile from "./components/InternProfile";
import PostApi from "./components/PostApi";
import TailwindPage from "./components/TailwindPage";



//cd "summer-internship-culyte\week4"
function App() {
  const users = [
    {
      id: 1,
      name: "Usman",
      age: 21,
      email: "uk22@gmail.com",
      profession: "Full stack Developer",
    },
    {
      id: 2,
      name: "Usman Khan",
      age: 21,
      email: "uk42@gmail.com",
      profession: "Full stack ",
    },
    {
      id: 3,
      name: "Usman ALi",
      age: 21,
      email: "uk62@gmail.com",
      profession: " Developer",
    },
  ];
  return (
    <>
      {/* <Header />
      <Main /> */}
      {/* <UserCard 
      name="Muhammad Usman Khan"
      email="Uk32@gmail.com"
      age="21" /> */}

      {/* */}
      {/*<UserCard user={users[0]}/>
      <UserCard user={users[1]}/>
      <UserCard user={users[2]}/>  */}

      {/* Using maping */}
      {/* {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <Task />
      <CourseList/>
      <CourseStatus/>
      <Effect/> */}
      {/* <Tailwind/> */}
      {/* <TailwindPage/> */}
      {/* <InternProfile/> */}
      <PostApi/>
    </>
  );
}

export default App;
