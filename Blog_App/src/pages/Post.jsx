import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";


export default function Post() {
  const [post, setPost] = useState(null);
//   console.log("Post: ",post)
//   const [image, setImage] = useState(null)
  const { id } = useParams();
//   console.log("\nPost ID from params:: ", id);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    // if (id) {

    // } 
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
        setPost(data);
        
      }else navigate("/");
    };
    getPost();
  }, [id, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl  p-2 ">
          <img
            src={post.message.imageURL}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6 space-x-2 ">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className=" mr-3 rounded">Edit</Button>
              </Link>
              <Button
                className=" bg-red-500 rounded hover:bg-red-700"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center">{post.data.title}</h1>
        </div>
        <div className="browser-css text-center text-">{parse(post.data.content)}</div>
      </Container>
    </div>
  ) : null;
}
