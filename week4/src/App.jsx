import CourseList from "./components/CourseList";
import Header from "./components/Header";
import Main from "./components/Main";
import Task from "./components/Task";
import UserCard from "./components/UserCard";

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
      <Header />
      <Main />
      {/* <UserCard 
      name="Muhammad Usman Khan"
      email="Uk32@gmail.com"
      age="21" /> */}

      {/* */}
      {/*<UserCard user={users[0]}/>
      <UserCard user={users[1]}/>
      <UserCard user={users[2]}/>  */}

      {/* Using maping */}
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <Task />
      <CourseList/>
    </>
  );
}

export default App;
