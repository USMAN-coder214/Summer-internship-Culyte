import { useMutation } from "@tanstack/react-query";

function UseMution1() {
  // This function actually sends the POST request.
  // The "user" argument comes from mutation.mutate(user).
  async function createUser(user) {
    // Send user data to the API
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",

      // Tell the API that we are sending JSON data
      headers: {
        "Content-Type": "application/json",
      },

      // Convert the JavaScript user object into JSON
      body: JSON.stringify(user),
    });

    // Convert the API response from JSON into JavaScript data
    const result = await response.json();

    // Return the result to TanStack Query
    return result;
  }

  // useMutation prepares and manages the mutation.
  // mutationFn tells TanStack Query which function
  // should perform the POST request.
  const mutation = useMutation({
    mutationFn: createUser,
  });

  // Data that we want to send to the API
  const user = {
    firstName: "Usman Khan",
    age: 22,
  };

  // This function runs only when the button is clicked
  const handleCreate = () => {
    // Starts the mutation and passes "user"
    // to createUser(user)
    mutation.mutate(user);
  };

  // After the mutation succeeds,
  // mutation.data contains the API response
  console.log(mutation.data);

  return (
    <div>
      <button onClick={handleCreate} disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create User"}
      </button>

      {mutation.isSuccess && <p>User Created Succesfully</p>}
      {mutation.isError && <p>{mutation.error.message}</p>}
    </div>
  );
}

export default UseMution1;
