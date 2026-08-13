import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

function PostApi() {
  const [loading, setLoading] = useState(false);
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email "),
    password: z.string().min(6, "Enter a Passwords"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const sendData = (data) => {
    setLoading(true);
    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit(sendData)} className="m-8 w-80 space-y-4">
      <input
        placeholder="Enter name"
        {...register("name")}
        className="w-full rounded-md  border border-gray-500 px-3 py-3"
      />
      {errors.name && (
        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
      )}
      <br />
      <input
        placeholder="Enter Email"
        {...register("email")}
        className="w-full rounded-md  border border-gray-500 px-3 py-3"
      />
      {errors.email && (
        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
      )}
      <br />
      <input
        placeholder="Enter password"
        {...register("password")}
        className="w-full rounded-md  border border-gray-500 px-3 py-3"
      />
      {errors.password && (
        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
      )}
      <br />
      <button
        className="rounded-md bg-black px-4 py-2 text-white"
        type="submit"
        //onClick={sendData}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
export default PostApi;
