import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"

function HookForm(){

    
 
    //This is only for React Hook form and Validation
//     const {
//         register,
//         handleSubmit,
//          formState: { errors },
//     }=useForm();

//     const onSubmit=(data)=>{
//         console.log(data);
        
//     }
//       return(
//         <form onSubmit={handleSubmit(onSubmit)} >
//             <input {...register("name",{
//                 required:"Name is Required "
//             })}/>
//             {errors.name && <p>{errors.name.message}</p>}
//             <br />
//              <input {...register("email",{
//                 required:"Gmail is required "
//              })}/>
//              {errors.email && <p>{errors.email.message}</p>}
//               <br />
//               <input {...register("password",{
//                 required:"Password is required"
//               })} />
//               {errors.password && <p>{errors.password.message}</p>}
//               <br />
//              <button type="submit">Submit</button>

//         </form>
//       )

// }

 //React form hook and zod

const schema=z.object({
    name:z.string().min(1,"Name is required"),
    email:z.string().email("Enter a valid email "),
    password:z.string().min(6,"Enter a Passwordss")
})

const {
        register,
        handleSubmit,
         formState: { errors },
      }=useForm({
        resolver:zodResolver(schema)
    });

    const onSubmit=(data)=>{
        console.log(data);
        
    }
      return(
        <form onSubmit={handleSubmit(onSubmit)} >
            <input {...register("name")}/>
            {errors.name && <p>{errors.name.message}</p>}
            <br />
             <input {...register("email")}/>
             {errors.email && <p>{errors.email.message}</p>}
              <br />
              <input {...register("password")} />
              {errors.password && <p>{errors.password.message}</p>}
              <br />
             <button type="submit">Submit</button>

        </form>
      )

}
export default HookForm