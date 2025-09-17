

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
// import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { ApiError } from "../../../backend/src/utils/ApiError";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      // const session = await authService.login(data);/
      // const session =  loginUser(data);
      // if (session) {
      //   const userData = await authService.getCurrentUser();
      //   if (userData) dispatch(authLogin(userData));
      //   navigate("/");
      // }
      const res = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      })
      const result = await res.json();
      if(!res.ok){
        throw new ApiError( result.message || "Login failed!!!")
      }
      dispatch(authLogin({ user: result.user, token: result.token }));
      
      
      navigate('/')
      return res
      .status(200)
      

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="mx-auto w-full max-w-md bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
        { /* Logo */ }
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[90px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:underline transition-colors duration-200"
          >
            Sign Up
          </Link>
        </p>

        {/* Error message */}
        {error && (
          <p className="text-red-500 mt-6 text-center text-sm font-medium">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Enter a valid email address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password && "Password is required"}
              {...register("password", {
                required: true,
              })}
            />

            <Button
              type="submit"
              className="w-full shadow-md hover:shadow-lg transition-all duration-200"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;


