import { ApiError } from "../../../backend/src/utils/ApiError";

export const getCurrentUser = async () => {
  try {
    console.log("Get current user called");
    const res = await fetch("http://localhost:8000/api/v1/users/current-user", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Res: ", res);

    if (!res.ok) return null;
    const result = await res.json();
    console.log("Resut -> data", result.data);
    return result.data;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while getting info of the current user" +
        error.message
    );
  }
};
