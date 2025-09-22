import React, { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Navbar({links}) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to login page
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black shadow-md z-50">
      <div className="w-full mx-auto flex justify-between items-center px-6 py-3">
        <div className="text-2xl font-bold text-blue-600">Parsvnath City</div>
        <ul className="hidden md:flex space-x-6">
          {links.map((link, i) => (
            <li key={i} className="hover:text-blue-500 text-white cursor-pointer transition">
              <Link to={link.link}>{link.title}</Link>
            </li>
          ))}
        </ul>

        <button 
          onClick={handleLogout} 
          className="md:block hidden"
        > 
          <LogOut color="white" />
        </button>


        {/* Mobile View */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-blue-500"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6 space-y-4 animate-slide-down">
          {[...links, {title:"Logout", link:"/"}].map((link, i) => (
            <div key={i} className="hover:text-blue-500 cursor-pointer transition" 
              onClick={() => setOpen(false)}
            >
              {
                link.title === "Logout" ? 
                  <button onClick={handleLogout}> 
                    {link.title} 
                  </button> : 
                <Link to={link.link}>{link.title}</Link> 
              } 
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}



