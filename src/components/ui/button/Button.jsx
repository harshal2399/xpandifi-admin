import React from "react";

const Button = ({
  label = "Create Campaign",
  onClick,
  className = "",
  type = "button",
  variant = "primary", // can be 'primary', 'custom'
  ...inputProps
}) => {
  const baseClass =
    "flex items-center justify-center px-4 py-2 rounded-full text-sm transition";

  const variants = {
    primary: "text-white bg-[#445E94] hover:bg-blue-900",
    custom: "", // no default styles, use `className` fully
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...inputProps}
    >
      {label}
    </button>
  );
};

export default Button;




// import React from 'react';

// const Button = ({
//   label = 'Create Campaign',
//   onClick,
//   className = '',
//   type = 'button',
//   ...inputProps
// }) => {
//   const defaultClass =
//     'flex items-center px-4 py-2 rounded-full text-white bg-[#445E94] hover:bg-blue-900 text-sm transition';

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`${defaultClass} ${className}`}
//       {...inputProps}
//     >
//    {label}
//     </button>
//   );
// };

// export default Button;
