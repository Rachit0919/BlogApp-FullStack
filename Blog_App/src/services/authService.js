
import { ApiError } from "../../../backend/src/utils/ApiError";
import { logout as logoutAction } from "../store/authSlice"; // adjust path to your authSlice
import store from "../store/store"; // your Redux store

export const getCurrentUser = async () => {
  let hasLoggedOut = false;
  try {
    console.log("Get current user called");

    // First attempt
    let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/current-user`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If access token expired, call refresh-token and retry
    if (res.status === 401) {
      console.log("\nRefresh Access Token api called")
      const refreshRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/refresh-token`,
        {
          method: "POST",
          credentials: "include", // send refresh token cookie
        }
      );

      if (refreshRes.ok) {
        res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/current-user`, {
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

export const logout = async () => {
  let hasLoggedOut = false;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Logout failed on the server.");
    }

    // Dispatch logout action to Redux store
    store.dispatch(logoutAction());
    hasLoggedOut = true; // Set the flag to true after successful logout
    return res;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while logging out: " + error.message
    );
  }
};
