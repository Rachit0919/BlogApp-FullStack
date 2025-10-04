import React, { useCallback,useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { createPost, updatePost } from "../../services/postService";


export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null)
  // const userData = useSelector((state) => state.auth.userData);
  // console.log("userData:", userData);

  useEffect(() =>{
    const getCurrentUser = async() =>{
      try {
        const res = await fetch("http://localhost:8000/api/v1/users/current-user",{
          method: "GET",
          credentials: "include",
        })
        if(!res.ok) {
          console.log("Unable to fetch the current user")
          throw new Error("Failed to fetch the current user")
        }
        const data = await res.json();
        setUserData(data.data)
        
      } catch (error) {
        console.log("\nError Fetching current User: ", error.message)
        setUserData(null)
      }
    }
    getCurrentUser()
  },[])

  console.log("UserData: ", userData)
  const submit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title),
      // formData.append('slug', data.slug),
      formData.append('content', data.content),
      formData.append('status', data.status),
      formData.append('userId', userData._id)
      formData.append('image', data.image[0])
      
      if (post) {
        // const updated = await updatePost(post._id, data);
        const updated = await updatePost(post._id || post.data._id, data, userData._id);

        if (updated?.data) navigate(`/post/${updated.data._id}`);
      } else {
        const created = await createPost(formData);
        if (created?.data) navigate(`/post/${created.data._id}`);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  // const slugTransform = useCallback((value) => {
  //   if (value && typeof value === "string")
  //     return value
  //       .trim()
  //       .toLowerCase()
  //       .replace(/[^a-zA-Z\d\s]+/g, "-")
  //       .replace(/\s/g, "-");

  //   return "";
  // }, []);

  // React.useEffect(() => {
    // const subscription = watch((value, { name }) => {
    //   if (name === "title") {
    //     setValue("slug", slugTransform(value.title), { shouldValidate: true });
    //   }
    // });

  //   return () => subscription.unsubscribe();
  // }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        {/* <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        /> */}
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
