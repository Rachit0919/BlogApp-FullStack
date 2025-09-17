import React from "react";
import smileyWoman from "../assets/smileyWoman.png";
import Circles1 from "../assets/Circles1.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BeforeLoginComponent = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = {
    name: "Signup",
    slug: "/signup",
    active: !authStatus,
  };
  return (
    <div className="relative w-full z-20">
      <img
        src={smileyWoman}
        alt="Smiley Woman"
        className=" sm:w-[300px] md:w-[400px] lg:w-[450px]  absolute sm:top-[100px] left-4/12 object-cover lg:max-w-full 3xl:w-[800px]"
      />
      <img src={Circles1} alt="Circles" className=" w-full max-w-[9000px] xl:inset-20 absolute top-0  " />

      <div className="absolute lg:top-[75px] lg:left-[800px] flex flex-col  lg:h-[400px] md:h-[300px] lg:text-right  ">
        <div className="  text font-semibold leading-tight text-right ">
          <span className="block lg:text-7xl md:text-7xl">Write Your</span>
          <span className="block bg-gradient-to-r from-[#4285F4] to-[#7B42F6] bg-clip-text text-transparent text-7xl">
            Article
          </span>
          <span className="block text-7xl">here</span>
        </div>
        {" "}
        <button
          className=" absolute lg:left-[186px] lg:top-[250px] bg-[#3652E1] text-white text-xl lg:font-medium lg:px-10 lg:py-4 shadow-md hover:bg-[#2c44b1]  rounded "
            
          onClick={() => navigate(navItems.slug)}
        >
          Create Account
        </button>
      </div>
    </div>

    
  );
};

export default BeforeLoginComponent;


