
import { useQuery } from "@tanstack/react-query";

function UseQuery1() {
  const fetchUsers = async () => {
    const response = await fetch("https://dummyjson.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const result = await response.json();

    return result.users;
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isPending) {
    return (
      <p className="p-6 text-center text-lg">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-6 text-center text-red-500">
        {error.message}
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Users
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((user) => (
          <div
            key={user.id}
            className="rounded-lg border p-4 shadow"
          >
            <h3 className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </h3>

            <p className="text-gray-600">
              Age: {user.age}
            </p>

            <p className="text-gray-600">
              Email: {user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UseQuery1;
