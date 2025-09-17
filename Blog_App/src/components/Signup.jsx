// import React, {useState} from 'react'
// import authService from '../appwrite/auth'
// import {Link ,useNavigate} from 'react-router-dom'
// import {login} from '../store/authSlice'
// import {Button, Input, Logo} from './index.js'
// import {useDispatch} from 'react-redux'
// import {useForm} from 'react-hook-form'

// function Signup() {
//     const navigate = useNavigate()
//     const [error, setError] = useState("")
//     const dispatch = useDispatch()
//     const {register, handleSubmit} = useForm()

//     const create = async(data) => {
//         setError("")
//         try {
//             const userData = await authService.createAccount(data)
//             if (userData) {
//                 const userData = await authService.getCurrentUser()
//                 if(userData) dispatch(login(userData));
//                 navigate("/")
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }

//   return (
//     <div className="flex items-center justify-center">
//             <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-indigo-200 shadow-md`}>
//             <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//                 </div>
//                 <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
//                 <p className="mt-2 text-center text-base text-black/60">
//                     Already have an account?&nbsp;
//                     <Link
//                         to="/login"
//                         className="font-medium text-indigo-600 transition-all duration-200 hover:underline"
//                     >
//                         Sign In
//                     </Link>
//                 </p>
//                 {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//                 <form onSubmit={handleSubmit(create)}>
//                     <div className='space-y-5'>
//                         <Input
//                         label="Full Name: "
//                         placeholder="Enter your full name"
//                         {...register("name", {
//                             required: true,
//                         })}
//                         />
//                         <Input
//                         label="Email: "
//                         placeholder="Enter your email"
//                         type="email"
//                         {...register("email", {
//                             required: true,
//                             validate: {
//                                 matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                 "Email address must be a valid address",
//                             }
//                         })}
//                         />
//                         <Input
//                         label="Password: "
//                         type="password"
//                         placeholder="Enter your password"
//                         {...register("password", {
//                             required: true,})}
//                         />
//                         <Button type="submit" className="w-full">
//                             Create Account
//                         </Button>
//                     </div>
//                 </form>
//             </div>

//     </div>
//   )
// }

// export default Signup


import React, { useState } from 'react'
// import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { ApiError } from '../../../backend/src/utils/ApiError.js'

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const create = async (data) => {
    setError("")
    try {
      // const account = await authService.createAccount(data)
      // if (account) {
      //   const currentUser = await authService.getCurrentUser()
      //   if (currentUser) {
      //     dispatch(login(currentUser))
      //     navigate("/")
      //   }
      const res = await fetch("http://localhost:8000/api/v1/users/register",{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const result = await res.json()
      if(!res.ok){
        throw new ApiError(result.message || "Signup failed!!!")
      }

      dispatch(login({ user: result.user, token: result.token }));

      
      

      navigate("/");
      
    } catch (err) {
      setError(err.message || "Something went wrong")
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-indigo-200 shadow-md">
        {/* Logo */}
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-indigo-600 transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Error message */}
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} noValidate>
          <div className="space-y-5">
            {/* Name */}
            <div>
              <Input
                label="Full Name:"
                placeholder="Enter your full name"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                label="Email:"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be valid",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Input
                label="Password:"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
