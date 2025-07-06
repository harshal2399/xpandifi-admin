import React, { useState, useRef, useEffect } from "react";
import Input from "../components/ui/input/Input";
import { SearchIcon } from "../icon";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    localStorage.removeItem("user");  // if you store user info
    navigate("/login"); // redirect to login
  };

  return (
    <div className="h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button className="md:hidden text-xl" onClick={toggleSidebar}>
          ☰
        </button>
        <Input
          name="search"
          placeholder="Search..."
          inputProps={{ type: "search" }}
          icon={<SearchIcon />}
          iconPosition="left"
          className="mt-2"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <span className="text-sm text-gray-500 hidden sm:block">English</span>

        {/* Clickable Name for Dropdown */}
        <span
          className="text-sm font-medium text-gray-700 hidden sm:block cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          John Smith
        </span>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 top-14 mt-1 w-48 bg-white border border-gray-200 shadow-md rounded-md py-2 z-50">
            <Link
              to="/user-details"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setShowDropdown(false)}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;


// import Input from "../components/ui/input/Input";
// import { SearchIcon } from "../icon";

// const Navbar = ({ toggleSidebar }) => {
//   return (
//     <div className="h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
//       <div className="flex items-center gap-3">
//         <button className="md:hidden text-xl" onClick={toggleSidebar}>
//           ☰
//         </button>
//         <Input
//           name="search"
//           placeholder="Search..."
//           inputProps={{ type: "search" }}
//           icon={<SearchIcon />}
//           iconPosition="left"
//           className="mt-2"
//         />
//       </div>

//       <div className="flex items-center gap-4">
//         <span className="text-sm text-gray-500 hidden sm:block">English</span>
//         <div className="text-2xl text-gray-600" />
//         <span className="text-sm font-medium text-gray-700 hidden sm:block">
//           John Smith
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
