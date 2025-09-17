import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    // {
    //   name: "Signup",
    //   slug: "/signup",
    //   active: !authStatus,
    // },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow w-full bg-white sticky top-[-10px]   ">
      <Container>
      <nav className="flex  justify-between px-4">
        <div className="cursor-pointer"
         onClick={() => navigate(navItems[0].slug)}>
        
          <span className="text-3xl font-montserrat text-black font-bold py-1.5 ml-60 no-underline ">
            Blog
            <span className="bg-gradient-to-r font-montserrat from-[#4285F4] to-[#7B42F6] bg-clip-text text-transparent font-semibold no-underline">
              App
            </span>
          </span>
        

        </div>
        <ul className="flex space-x-4 mr-60 font-semibold ">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className={`
          relative px-6 py-2 font-medium transition-colors duration-300
          after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
          after:-bottom-1 after:w-2 after:h-2 after:rounded-full 
          after:transition-opacity after:duration-300
          ${
            location.pathname === item.slug
              ? "text-blue-600 after:bg-blue-600 after:opacity-100"
              : "text-gray-700 hover:text-blue-600 after:bg-blue-600 after:opacity-0 hover:after:opacity-100"
          }
        `}
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
      </Container>
    </header>
  );
}

export default Header;
