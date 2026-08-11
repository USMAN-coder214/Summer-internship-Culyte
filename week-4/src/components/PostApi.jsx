import { useState, useEffect } from "react";

function PostApi() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        console.log(data);
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);
  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    // <div>
    //   <h2>User from Api</h2>
    //   {posts.slice(0, 10).map((post) => {
    //     return <p key={post.id}>{post.name}</p>;
    //   })}
    // </div>

    //
<div className="p-6">
  <h2 className="mb-6 text-3xl font-bold text-gray-900">
    Posts From API
  </h2>

  <div className="grid gap-5">
    {posts.slice(0, 10).map((post) => (
      <article
        key={post.id}
        className="rounded-xl border border-gray-200 bg-white p-5 shadow-md"
      >
        <h3 className="mb-3 text-xl font-bold text-blue-600">
          {post.title}
        </h3>

        <p className="text-gray-700">
          {post.body}
        </p>
      </article>
    ))}
  </div>
</div>
  );
}
export default PostApi;
