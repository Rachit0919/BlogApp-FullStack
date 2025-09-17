// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";
// import placeholderImage from "../assets/blog-placeholder.svg";

// export default function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);

//     const isAuthor = post && userData ? post.userId === userData.$id : false;

//     useEffect(() => {
//         if (slug) {
//             appwriteService.getPost(slug).then((post) => {
//                 if (post) setPost(post);
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [slug, navigate]);

//     const deletePost = () => {
//         appwriteService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 appwriteService.deleteFile(post.featuredImage);
//                 navigate("/");
//             }
//         });
//     };

//     return post ? (
//         <div className="py-8 w-full">
//             <Container>
//                 <div className="w-full flex justify-center mb-6 relative border border-indigo-200 rounded-xl p-3 shadow-lg">
//                     <img
//                         src={post.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : placeholderImage}
//                         alt={post.title}
//                         className="rounded-xl w-full h-72 md:h-96 object-cover"
//                         onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = placeholderImage;
//                         }}
//                     />

//                     {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-indigo-600" className="mr-3 shadow-md hover:bg-indigo-700 transition-colors">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" className="shadow-md hover:bg-red-600 transition-colors" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="w-full mb-8">
//                     <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">{post.title}</h1>
//                 </div>
//                 <div className="browser-css bg-white p-6 rounded-xl shadow-md border border-indigo-100 w-full">
//                     {parse(post.content)}
//                 </div>
//             </Container>
//         </div>
//     ) : null;
// }


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

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
                        src={appwriteService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 space-x-2 ">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className=" mr-3 rounded">
                                    Edit
                                </Button>
                            </Link>
                            <Button className=" bg-red-500 rounded hover:bg-red-700" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-center">{post.title}</h1>
                </div>
                <div className="browser-css text-center text-">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
