// import api from "./api/axios";

// function AxiosPractice() {

//   const sendUser = () => {
//     const user = {
//       firstName: "Usman",
//       age: 22,
//     };

//     api.post("/users/add", user)
//       .then((response) => {
//         console.log(response.data);
//       });
//   };

//   return (
//     <button className="rounded-md bg-black px-4 py-2 text-white" onClick={sendUser}>
//       Send User
//     </button>
//   );
// }

// export default AxiosPractice;

import api from "./api/axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function PostApi5() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Enter a Password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  //   const sendData = (data) => {
  //     setLoading(true);
  //     fetch("https://dummyjson.com/users/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //         console.log(result);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   };

  //
  const sendData = (data) => {
    setLoading(true);

    api
      .post("/users/add", data)
      .then((response) => {
        console.log(response.data);
        setSuccess("User created successfully");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(sendData)} className="m-8 w-80 space-y-4">
      <Input
        placeholder="Enter name"
        {...register("name")}
        className="w-full rounded-md  border border-gray-500 px-3 py-3"
      />
      {errors.name && (
        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
      )}
      <br />
      <Input
        placeholder="Enter Email"
        {...register("email")}
        className="w-full rounded-md  border border-gray-500 px-3 py-3"
      />
      {errors.email && (
        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
      )}
      <br />
      <Input
        placeholder="Enter password"
        {...register("password")}
        className="w-full rounded-md  border border-gray-500 px-3 py-3"
      />
      {errors.password && (
        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
      )}
      <br />
      <Button
        className="rounded-md bg-black px-4 py-2 text-white"
        type="submit"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
      {success && <p className="text-green-500">{success}</p>}

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
export default PostApi5;
