import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import axiosInstance from "../Axios/Axios";
import { LogOut } from "lucide-react";

function Navbar() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/api/auth/profile", { withCredentials: true })
      .then((res) => setProfile(res.data))
      .catch(() => setProfile(null));
  }, []);

  console.log(profile)

  async function handleLogout() {
    try {
      await axiosInstance.post("/api/auth/logout", {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (err) {
      console.log("Logout failed:", err);
    }
  }

  return (
    <div
      className="
      w-full h-max px-6 py-4 flex justify-between items-center
      bg-(--neo-bg)
      shadow-[10px_10px_20px_var(--neo-dark),-10px_-10px_20px_var(--neo-light)]
      transition-all duration-300
      
    "
    >
      {/* Left: Logo + Title */}
      <div
        className="
        flex items-center gap-3 px-4 py-2 
        bg-(--neo-bg)
        
        transition-all duration-300 cursor-pointer
      "
      >
        <img
          src={Logo}
          alt="logo"
          className="
            w-10 rounded-full 
            bg-(--neo-bg)
            shadow-[4px_4px_8px_var(--neo-dark),-4px_-4px_8px_var(--neo-light)]
          "
        />
        <h1 className="text-2xl font-Pixelify font-bold text-gray-800">
          Pixelify
        </h1>
      </div>

      {/* Right: Profile + Logout */}
      <div className="flex items-center gap-4">

        {profile ? (
          <>
            {/* AVATAR WITH NEUMORPHISM */}
            

            {/* USERNAME */}
            <p className="text-gray-700 hidden sm:block">
              Hi, <span className="font-semibold">{profile.user.name}</span>
            </p>

            {/* LOGOUT BUTTON (NEUMORPHIC) */}
            <button
              onClick={handleLogout}
              className="
                flex items-center gap-2 px-4 py-2 rounded-xl
                bg-(--neo-bg)
                shadow-[6px_6px_12px_var(--neo-dark),-6px_-6px_12px_var(--neo-light)]
                hover:shadow-[4px_4px_8px_var(--neo-dark),-4px_-4px_8px_var(--neo-light)]
                active:shadow-[inset_4px_4px_8px_var(--neo-dark),inset_-4px_-4px_8px_var(--neo-light)]
                transition-all duration-300 text-gray-700 cursor-pointer
              "
            >
              <LogOut size={18} />
              <span className="hidden sm:block">Logout</span>
            </button>
          </>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
