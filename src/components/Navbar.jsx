import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaThLarge, FaProjectDiagram, FaUser, FaBars, FaTimes, FaHistory, FaSignOutAlt, FaSprayCan } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import prfImage from "../assets/images/profileImage.png"; // Replace with actual path

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState({});


  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaThLarge /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
    { name: "Account", path: "/account", icon: <FaUser /> },
    { name: "History", path: "/history", icon: <FaHistory /> },
    { name: "Predictions", path: "/home", icon: <FaSprayCan /> },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      setLoggedUser(user);
    }
  }, []);

  const handleLogout = () => {
    toast.warn(
      <div className="flex flex-col items-center">
        <p className="mb-2 font-semibold">Are you sure you want to logout?</p>
        <div className="flex gap-4">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded-md"
            onClick={() => {
              localStorage.removeItem("file_name");
              localStorage.removeItem("user");
              toast.dismiss();
              toast.success("Logged out successfully!");
              navigate("/");
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };


  return (
    <>
      {/* Sidebar for larger screens */}
      <div className={`w-64 h-screen bg-white p-5 flex flex-col gap-6 shadow-md fixed md:relative transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-64'} md:translate-x-0`}>
        <div className="flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-3">
            <img src={prfImage} alt="User" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h2 className="font-semibold">{loggedUser.name}</h2>
              <p className="text-sm text-gray-500">User</p>
            </div>
          </div>
          {/* Close button for mobile */}
          <button className="md:hidden text-gray-600" onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 flex-grow">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md transition duration-300 ease-in-out ${isActive ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`
              }
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Mobile Navbar Toggle Button */}
      <button className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md" onClick={() => setIsOpen(true)}>
        <FaBars size={20} />
      </button>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-3 flex justify-around shadow-md md:hidden">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-gray-900 font-semibold" : "text-gray-700"}`
            }
          >
            {item.icon}
            <span className="text-xs">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
}
