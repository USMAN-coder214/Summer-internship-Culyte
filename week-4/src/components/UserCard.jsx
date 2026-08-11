//Props mean how we send data from parent to child 
// function UserCard(props){
//     return (
//         <article>
//         <h2>{props.name}</h2>
//         <p>Email:{props.email}</p>
//         <p>Age:{props.age}</p>
//         </article>
//     )
// }
// export default UserCard;

//Both are working same but this one is Destructuring props 
// function UserCard({name,email,age}){
//     return (
//         <article>
//         <h2>{name}</h2>
//         <p>Email:{email}</p>
//         <p>Age:{age}</p>
//         </article>
//     )
// }
// export default UserCard;

//This is also used but in this case we use object as a props 
function UserCard({user}){
    return (
        <div>
        <h4>{user.id}</h4>
        <p>Name:{user.name}</p>
        <p>Age:{user.age}</p>
        <p>Email:{user.email}</p>
        <p>Profession:{user.profession}</p>
        </div>
    )
}
export default UserCard;