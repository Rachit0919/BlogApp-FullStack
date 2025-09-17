import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
// import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
// import { getCurrentUser } from './backendAuth/authService'
import { ApiError } from '../../backend/src/utils/ApiError'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  
  useEffect(() => {
  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/users/current-user", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        dispatch(logout());
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data?.data) {
        dispatch(login({ user: data.data }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };

  fetchCurrentUser();
}, [dispatch]);
  
  return !loading ? (
    <div className='min-h-screen  flex flex-wrap content-between bg-white '>
      <Header />
      <main className='flex-grow w-full overflow-clip'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App


