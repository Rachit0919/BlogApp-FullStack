import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";

export default function AllPosts() {
  const user = useSelector((state) => state.auth.userData);
  const id = user?._id;
  // console.log("\nId inside allPosts.jsx : ", id);
  const [posts, setPosts] = useState([]);
  // console.log("\nPosts indside allPosts.jsx:", posts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("\nInside useeffect allposts.jsx");
    const fetchPosts = async () => {
      // console.log("\nInside useeffect fetchpost allposts.jsx");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/all-posts/${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              
            },
          }
        );
        const data = await res.json();
        // console.log("\nData in allPosts.jsx", data);
        setPosts(data.data || []); 
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="w-full py-8">
      <Container>
        {loading ? (
          <p className="text-center text-indigo-600">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-white">No posts available.</p>
        ) : posts.length === 1 ? (
          <div className="flex justify-center">
            <div className="p-2 ">
              <PostCard {...posts[0]} />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center mx-2 items-start">
            {posts.map((post) => (
              <div
                key={post._id}
                className="p-2 "
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
