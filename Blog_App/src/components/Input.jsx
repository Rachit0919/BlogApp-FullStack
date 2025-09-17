import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-indigo-50 duration-200 border border-indigo-200 focus:border-indigo-400 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input


// import React, { useId } from "react";

// const Input = React.forwardRef(function Input(
//   { label, type = "text", className = "", error, ...props },
//   ref
// ) {
//   const id = useId();

//   return (
//     <div className="w-full flex flex-col gap-1">
//       {label && (
//         <label
//           htmlFor={id}
//           className="text-sm font-medium text-gray-700 pl-1"
//         >
//           {label}
//         </label>
//       )}

//       <input
//         id={id}
//         ref={ref}
//         type={type}
//         className={`px-4 py-2.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 border shadow-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full ${className}`}
//         {...props}
//       />

//       {error && (
//         <p className="text-sm text-red-500 font-medium pl-1">{error}</p>
//       )}
//     </div>
//   );
// });

// export default Input;



