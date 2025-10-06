


import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import BeforeLoginComponent from "../assets/beforeLoginComponent";
import { useSelector } from "react-redux";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  console.log("Home component rendered");
  console.log("authStatus in Home.jsx:", authStatus);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/home`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          console.log("Error fetching all posts");
          return;
        }

        const data = await response.json();   
        // console.log("Fetched posts:", data);

        setPosts(data.data || []);   
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16">
        <Container>
          <p className="text-center text-lg font-medium text-indigo-600 animate-pulse">
            Loading posts...
          </p>
        </Container>
      </section>
    );
  }

  if (!authStatus) {
    return (
      <section className="w-full max-w-7xl">
        <Container>
          <div className="relative">
            <BeforeLoginComponent />
          </div>
        </Container>
      </section>
    );
  }

  if (posts.length === 0) {   
    return (
      <section className="w-full max-w-7xl">
        <Container>
          <div className="relative">
            <BeforeLoginComponent />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="w-full py-12">
      <Container>
        <div className="flex flex-wrap mx-2 justify-center">
          {posts.map((post) => (
            <div key={post._id} className="p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Home;
