const API_BASE = "http://localhost:8000/api/v1";

const fetchRequest = async (url, options = {}) => {
  console.log("Inside fetch request postServie")
  const res = await fetch(`${API_BASE}${url}`, {
    credentials: "include",
    ...options,
  });
  // if (!res.ok) {
  //   const error = await res.json().catch(() => ({}));
  //   throw new Error(error.message || "Something went wrong");
  // }
   if (res.status === 401) {
    const refreshRes = await fetch(API_BASE + "/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    if (refreshRes.ok) {
      // refresh succeeded → retry original request
      const retryRes = await fetch(API_BASE + url, {
        ...options,
        credentials: "include",
      });
      return retryRes;
    } else {
      // refresh failed → logout
      throw new Error("Session expired. Please log in again.");
    }
  }

  return res.json();
};

export const createPost = async (formData) => {
  

  return fetchRequest("/posts", {
    method: "POST",
    body: formData,
  });
};

// Update post
export const updatePost = async (id, data) => {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.content) formData.append("content", data.content);
  if (data.image?.[0]) formData.append("image", data.image[0]);

  return fetchRequest(`/posts/${id}`, {
    method: "PUT",
    body: formData,
  });
};

// Delete post
export const deletePost = async (id) => {
  return fetchRequest(`/posts/${id}`, {
    method: "DELETE",
  });
};

// eslint-disable-next-line no-unused-vars
export const getAllPosts = async(req, res) => {
  return fetchRequest('all-posts',{
    method: "GET",
  })
}
