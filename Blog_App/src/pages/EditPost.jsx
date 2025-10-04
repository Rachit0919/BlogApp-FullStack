import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
// import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //     if (id) {
  //         appwriteService.getPost(slug).then((post) => {
  //             if (post) {
  //                 setPosts(post)
  //             }
  //         })
  //     } else {
  //         navigate('/')
  //     }
  // }, [slug, navigate])
  useEffect(() => {
    const getPost = async () => {
      if (id) {
        // console.log("Id: ", id);
        const response = await fetch(
          `http://localhost:8000/api/v1/post/${id}`,
          {
            method: "GET",
            credentials: "include", // keep cookies if using auth
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          console.log("Error fetching the post");
        }

        const data = await response.json();
        // console.log("Data: ", data);
        // setPosts(data);
        setPosts({
          ...data.data.post,
          imageURL: data.data.imageUrl.url, // merge image url into post
        });
      } else navigate("/");
    };
    getPost();
  }, [id, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;

// import React, { useEffect, useState } from 'react'
// import { Container, PostForm } from '../components'
// import appwriteService from '../appwrite/config'
// import { useNavigate, useParams } from 'react-router-dom'

// function EditPost() {
//   const [post, setPost] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const { slug } = useParams()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchPost = async () => {
//       if (!slug) {
//         navigate('/')
//         return
//       }

//       try {
//         const response = await appwriteService.getPost(slug)
//         if (response) {
//           setPost(response)
//         } else {
//           navigate('/') // redirect if post not found
//         }
//       } catch (error) {
//         console.error('Error fetching post:', error)
//         navigate('/')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPost()
//   }, [slug, navigate])

//   if (loading) {
//     return (
//       <section className="py-8">
//         <Container>
//           <p className="text-center text-indigo-600">Loading post...</p>
//         </Container>
//       </section>
//     )
//   }

//   if (!post) {
//     return null
//   }

//   return (
//     <section className="py-8">
//       <Container>
//         <PostForm post={post} />
//       </Container>
//     </section>
//   )
// }

// export default EditPost
