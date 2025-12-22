import { useState } from "react";
import axiosInstance from "../Axios/Axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Logo from "../assets/logo.png";
import Cat from "../assets/cat.jpg";
import InputField from "../components/InputFiled";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.post("/api/auth/login", form);

      if (res.status === 200 || res.status === 201) {
        dispatch(login());
        window.location.href = "/";
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen p-0 sm:p-4 
      bg-(--neo-bg) overflow-auto"
    >
      <div
        className="
          flex w-full max-w-7xl h-[95vh] rounded-3xl overflow-hidden
          bg-(--neo-bg)
          shadow-[20px_20px_40px_var(--neo-dark),-20px_-20px_40px_var(--neo-light)]
        "
      >
        {/* LEFT IMAGE */}
        <div className="hidden lg:flex lg:w-1/2 h-full">
          <img src={Cat} alt="cat" className="w-full h-full object-cover" />
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 space-y-8 flex flex-col justify-center">

          {/* HEADER */}
          <header className="text-center flex flex-col items-center space-y-2">
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
              Sign In
            </h2>
            <p className="text-sm text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </header>

          {/* ERROR */}
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg shadow-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            <InputField
              id="email"
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />

            <InputField
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />

            {/* Forgot password */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 rounded-xl font-semibold text-sm transition-all
               bg-amber-400
                shadow-[8px_8px_16px_var(--neo-dark),-8px_-8px_16px_var(--neo-light)]
                hover:shadow-[6px_6px_12px_var(--neo-dark),-6px_-6px_12px_var(--neo-light)]
                active:shadow-[inset_6px_6px_12px_var(--neo-dark),inset_-6px_-6px_12px_var(--neo-light)]
                text-gray-700  cursor-pointer
              "
            >
              {loading ? "Logging In..." : "Sign In"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center">
            <div className="grow border-t border-gray-300"></div>
            <span className="mx-3 text-xs text-gray-500">OR CONTINUE WITH</span>
            <div className="grow border-t border-gray-300"></div>
          </div>

          {/* GOOGLE BUTTON */}
        

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-700">
            Don't have an account?
            <a
              href="/register"
              className="font-semibold text-blue-600 hover:text-blue-700 ml-1"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* --- REUSABLE NEUMORPHIC INPUT COMPONENT --- */
