import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

const Spinner = ({ size = "sm", className = "" }) => (
  <svg
    className={`animate-spin ${size === "sm" ? "w-4 h-4" : "w-6 h-6"} text-white ${className}`}
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await dispatch(loginUser(data));
      const token = response?.payload?.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 hidden lg:flex flex-col justify-center items-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-10">
        <img src="/images/logo/xpandifi-logo.svg" alt="Xpandifi Logo" className="h-10 mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-center">One Platform to Streamline <br /> All Product Analytics</h1>
        <p className="text-sm text-center opacity-75">
          Your Revenue are set to grow by 20% next month.<br />
          Your Revenue is increased by next month.
        </p>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 relative">
          {/* Mascot Image */}
          <img
            src="/images/auth/mascot.png"
            alt="Mascot"
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 object-contain"
          />

          <h2 className="text-2xl font-semibold text-center mt-12">Welcome</h2>
          <p className="text-sm text-center text-gray-600 mb-6">Let’s manage together</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 3,
                    message: "Password must be at least 3 characters",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className={`w-full py-2 flex justify-center items-center gap-2 text-white rounded-full transition ${
                isSubmitting || loading
                  ? "bg-[#5F7C95] cursor-not-allowed"
                  : "bg-[#5F7C95] hover:bg-[#445E94]"
              }`}
            >
              {isSubmitting || loading ? <Spinner /> : null}
              {isSubmitting || loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-right mt-2">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { loginUser } from "../../redux/slices/authSlice";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router";


// const Spinner = ({ size = "sm", className = "" }) => (
//   <svg
//     className={`animate-spin ${size === "sm" ? "w-4 h-4" : "w-6 h-6"} text-white ${className}`}
//     fill="none"
//     viewBox="0 0 24 24"
//   >
//     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//   </svg>
// );

// const SignIn = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm();
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const response = await dispatch(loginUser(data));
//       const token = response?.payload?.token;
//       if (token) {
//         localStorage.setItem("token", token);
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row ">
//       {/* Left Image Section */}
//       <div className="w-full p-2 lg:w-1/2 bg-[url('/images/auth/login-img.png')] bg-cover bg-center h-60 sm:h-72 md:h-96 lg:h-auto" />

//       {/* Right Form Section */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 md:p-16 lg:p-20 xl:p-24 bg-white">
//         <div className="w-full max-w-md">
//           <div className="flex justify-center mb-6">
//             <img src="/images/logo/xpandifi-logo.svg" alt="Xpandifi Logo" className="h-10" />
//           </div>

//           <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-2">Welcome Back</h2>
//           <p className="text-sm text-center text-[#697586] mb-6">Your ads have been waiting for you</p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                     message: "Enter a valid email",
//                   },
//                 })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//               />
//               {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 3,
//                     message: "Password must be at least 3 characters",
//                   },
//                 })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//               />
//               {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
//             </div>

//             {/* Role Select */}
           

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={isSubmitting || loading}
//               className={`w-full py-2 flex justify-center items-center gap-2 text-white rounded-full transition ${
//                 isSubmitting || loading
//                   ? "bg-[#5F7C95] cursor-not-allowed"
//                   : "bg-[#5F7C95] hover:bg-[#445E94]"
//               }`}
//             >
//               {isSubmitting || loading ? <Spinner /> : null}
//               {isSubmitting || loading ? "Logging in..." : "Login"}
//             </button>

//             <div className="text-right">
//               <a href="#" className="text-sm text-blue-600 hover:underline">
//                 Forgot password?
//               </a>
//             </div>
//           </form>

          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
