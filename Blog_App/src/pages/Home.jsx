import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import BeforeLoginComponent from "../assets/beforeLoginComponent";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response) {
          setPosts(response.documents);
        }
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

  if (posts.length === 0) {
    return (
      <section className="w-full max-w-7xl">
        <Container>
          <div className=" relative ">
            <BeforeLoginComponent />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="w-full py-12">
      <Container>
        {/* <div
         className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-10 ">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div> */}
        <div className="flex flex-wrap mx-2 justify-center">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 "
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Home;

// import React, { useEffect, useState } from "react";
// import appwriteService from "../appwrite/config";
// import { Container, PostCard } from "../components";
// // import BeforeLoginComponent from "../assets/BeforeLoginComponent";
// import BeforeLoginComponent from "../assets/beforeLoginComponent";

// function Home() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await appwriteService.getPosts();
//         if (response) {
//           setPosts(response.documents);
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return (
//       <section className="w-full py-16">
//         <Container>
//           <p className="text-center text-lg font-medium text-indigo-600 animate-pulse">
//             Loading posts...
//           </p>
//         </Container>
//       </section>
//     );
//   }

//   if (posts.length === 0) {
//     return (
//       <section className="w-full max-w-7xl">
//         <BeforeLoginComponent />
//       </section>
//     );
//   }

//   return (
//     <section className="w-full py-12">
//       <Container>
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//           {posts.map((post) => (
//             <PostCard key={post.$id} {...post} />
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

// export default Home;
