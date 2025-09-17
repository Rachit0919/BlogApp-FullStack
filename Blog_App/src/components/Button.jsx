// import React from "react";

// export default function Button({
//     children,
//     type = "button",
//     bgColor = "bg-indigo-600",
//     textColor = "text-white",
//     className = "",
//     ...props
// }) {
//     return (
//         <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
//             {children}
//         </button>
//     );
// }


import React from "react";

export default function Button({
  children,
  type = "button",
  variant = "primary", // "primary" | "secondary" | "outline" | "danger"
  bgColor,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant] } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


