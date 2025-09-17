import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'



function LogoutBtn() {

    const dispatch = useDispatch()
    const logoutHandler = () =>{
        authService.logout().then(() => dispatch(logout()))
    }
    return (
        <button
        className="px-6 py-2 relative text-gray-700 font-medium
    hover:text-blue-600 transition-colors duration-300
    after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
    after:-bottom-0 after:w-2 after:h-2 after:rounded-full 
    after:bg-blue-600 after:opacity-0 after:transition-opacity after:duration-300
    hover:after:opacity-100"
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn
