import { useState } from "react";
import SideImage from "../assets/sideImage1.png";
import axiosInstance from "../Axios/Axios";
import Bird from "../assets/bird.jpg";
import Logo from "../assets/logo.png";
import InputField from "../components/InputFiled";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Password and confirmation password do not match.");
      setLoading(false);
      return;
    }

    const { confirmPassword, ...regisform } = form;

    try {
      const res = await axiosInstance.post("/api/auth/register", regisform);
      if (res.status === 200 || res.status === 201) {
        window.location.href = "/login";
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div
      className="flex justify-center items-center h-screen p-0 sm:p-4 overflow-auto
      bg-(--neo-bg)
      "
    >
      <div
        className="
          flex w-full max-w-7xl h-[95vh] rounded-3xl overflow-hidden 
          bg-(--neo-bg)
          shadow-[20px_20px_40px_var(--neo-dark),-20px_-20px_40px_var(--neo-light)]
        "
      >
        {/* LEFT IMAGE */}
        <div className="hidden lg:flex lg:w-1/2 h-full items-center justify-center">
          <img
            src={Bird}
            alt="Register Illustration"
            className="object-cover h-full w-full"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-center">

          {/* HEADER */}
          <header className="text-center flex flex-col justify-center items-center space-y-2">
            <div
              className="
                w-20 h-20 rounded-full flex justify-center items-center
                bg-(--neo-bg)
                shadow-[8px_8px_16px_var(--neo-dark),-8px_-8px_16px_var(--neo-light)]
              "
            >
              <img src={Logo} alt="logo" className="w-10" />
            </div>

            <h2 className="text-4xl font-Pixelify font-extrabold text-gray-800">
              Sign Up
            </h2>
            <p className="text-xs text-gray-600">
              Create your account to join the Debate Arena.
            </p>
          </header>

          {/* ERROR */}
          {error && (
            <div
              className="p-2 text-xs text-red-700 bg-red-100 rounded-lg shadow-sm"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <InputField
              id="username"
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            {/* Email */}
            <InputField
              id="email"
              type="email"
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            {/* Password */}
            <InputField
              id="password"
              type="password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            {/* Confirm Password */}
            <InputField
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 mt-4 rounded-xl font-semibold text-sm transition-all duration-200
               
                shadow-[8px_8px_16px_var(--neo-dark),-8px_-8px_16px_var(--neo-light)]
                hover:shadow-[6px_6px_12px_var(--neo-dark),-6px_-6px_12px_var(--neo-light)]
                active:shadow-[inset_6px_6px_12px_var(--neo-dark),inset_-6px_-6px_12px_var(--neo-light)]
                text-gray-700
               bg-amber-400
              "
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center">
            <div className="grow border-t border-gray-300"></div>
            <span className="mx-3 text-xs text-gray-500">OR CONTINUE WITH</span>
            <div className="grow border-t border-gray-300"></div>
          </div>
        

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-700">
            Already have an account?
            <a
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-700 ml-1"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE NEUMORPHIC INPUT COMPONENT */

