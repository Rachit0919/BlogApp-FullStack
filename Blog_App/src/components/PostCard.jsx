import React from "react";

import {Link, useNavigate } from "react-router-dom";

function Postcard({ _id, title, image }) {
  
  console.log("Image URL:", image);
  const navigate = useNavigate();

  

  const handleClick = () => {
    navigate(`/post/${_id}`);
  };

  

  return (
    // <Link to={`/post/${$id}`}className="no-underline">
      <div className="w-60 h-60 flex flex-col justify-center bg-gray-100 rounded-xl p-3 cursor-pointer "
       onClick={handleClick}
       >
        <div className="w-full flex justify-center  ">
          
          <img
            src={image.imageURL}
            alt={title}
            className="w-40 h-33 object-cover rounded-xl top-0"
            onError={(e) => {
              e.target.src = "/images/fallback.png";
            }}
          />
          
        </div>
        <h2 className="flex justify-center text-center font-bold text-xl py-3"
             style={{
               background: 'linear-gradient(90deg, #4285F4, #7B42F6)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               backgroundClip: 'text',
               color: 'transparent',
               fontSize: '20px'
             }}>
          {title}
        </h2>
      </div>
    //  </Link>
  );
}

export default Postcard;
