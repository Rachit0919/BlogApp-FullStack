import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asynchHandler.js";

const createPost = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;
    if ([title, content].some((field) => field.trim() === "")) {
      throw new ApiError(400, "All credentials are required");
    }

    const owner = req.user._id;

    const imageLocalPath = req.files?.path;

    console.log(imageLocalPath);

    if (!imageLocalPath) {
      throw new ApiError(400, "Image required");
    }
    const imageUploadOnCloudinary = await uploadOnCloudinary(imageLocalPath);

    const blog = await Blog.create({
      owner,
      title,
      content,
      image: imageUploadOnCloudinary.url,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, blog, "Blog posted Successfully"));
  } catch (error) {
    throw new ApiError(500, "Error creating blog");
  }
});

const editPost = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user;
    const post = await Blog.findById(req.params._id);
    const imageLocalPath = req.files?.path;
    let imageUrl = post.image;

    if (user._id.toString() !== post.owner.toString()) {
      throw new ApiError(400, "You are not allowed to edit this post");
    }

    if (imageLocalPath) {
      const imageUploadOnCloudinary = await uploadOnCloudinary(imageLocalPath);
      imageUrl = imageUploadOnCloudinary.url;
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.image = imageUrl;

    await post.save();

    return res
      .status(200)
      .json(new ApiResponse(200, post, "Blog post edited successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while editing the post");
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = req.params._id;
    if (!post) {
      throw new ApiError(400, "Post not found");
    }
    const user = req.user;
    if (user._id.toString() !== post.owner.toString()) {
      throw new ApiError(400, "You are not allowed to delete this post");
    }
    if (post.image?.public_id) {
      await cloudinary.uploader.destroy(post.image.public_id);
    }
    const deletedPost = await Blog.findOneAndDelete({post});
    if(deletedPost){
        throw new ApiError(500, "Post is not deleted yet")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Post deleted successfully"
        )
    )
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while deleting the blog post"
    );
  }
});

export { createPost, editPost, deletePost };
