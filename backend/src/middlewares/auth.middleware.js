import {User} from '../models/users.models.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asynchHandler.js'
import jwt from 'jsonwebtoken'

export const verifyJWT = asyncHandler( async(req, res, next) =>{
    try {
        console.log("verify JWT called")
        console.log("req.cookies inside verify JWT:", req.cookies)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        console.log("\nToken: ", token)
        
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
        console.log("Token recieved", token)
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log("Decoded Token ", token)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(401, "Invalid access token")
        }
        console.log("USer at middleware", user)
        req.user = user
        next()
    } catch (error) {
        console.log("Auth middleware error" , error.message)
        throw new ApiError(401, error?.message || "Invalid Access")
    }
})