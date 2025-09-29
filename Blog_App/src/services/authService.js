
import { ApiError } from "../../../backend/src/utils/ApiError";

export const getCurrentUser = async () => {
  try {
    console.log("Get current user called");

    // First attempt
    let res = await fetch("http://localhost:8000/api/v1/users/current-user", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If access token expired, call refresh-token and retry
    if (res.status === 401) {
      console.log("\nRefresh Access Token api called")
      const refreshRes = await fetch(
        "http://localhost:8000/api/v1/users/refresh-token",
        {
          method: "POST",
          credentials: "include", // send refresh token cookie
        }
      );

      if (refreshRes.ok) {
        res = await fetch("http://localhost:8000/api/v1/users/current-user", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res;
      } else {
        throw new Error("Session expired. Please log in again.");
      }


      // Retry the original request
    }

    // if (!res.ok) return null;

    // const result = await res.json();
    // console.log("Result -> data", result.data);
    // return result.data;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while getting info of the current user: " +
        error.message
    );
  }
};
