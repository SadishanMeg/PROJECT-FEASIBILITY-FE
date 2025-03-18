import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Email Validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  // Check if form is valid
  useEffect(() => {
    setIsFormValid(email && password && isValidEmail);
  }, [email, password, isValidEmail]);

  const handleLogin = async () => {
    if (!isFormValid) {
      toast.error("Please enter a valid email and password!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("http://127.0.0.1:5000/auth/login", {
        email,
        password,
      });

      toast.success("Login Successful!");
      setLoading(false);
      console.log(data)
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user.projects.length > 0) {
        navigate("/dashboard"); // Redirect to Dashboard
      } else {
        navigate("/home"); // Redirect to Dashboard
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-white px-4">
      <div className="flex flex-col md:flex-row w-full max-w-[1440px] items-center md:items-start">

        {/* Left Side - Sign In Form */}
        <div className="flex flex-col items-center md:items-start px-4 md:px-[160px] w-full md:w-1/2 mt-10 text-center md:text-left">
          <h2 className="text-[40px] md:text-[70px] font-extrabold text-[#eb5e28] mb-5">SIGN IN</h2>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-[467px] h-[54px] bg-[#eaeaea] rounded-[20px] px-4 text-[18px] md:text-[21px] mb-2 outline-none"
          />
          {!isValidEmail && email && (
            <p className="text-red-500 text-sm mb-2">Invalid email format</p>
          )}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full md:w-[467px] h-[54px] bg-[#eaeaea] rounded-[20px] px-4 text-[18px] md:text-[21px] mb-2 outline-none"
          />

          {/* Forgot Password */}
          <p className="text-[16px] md:text-[20px] text-black cursor-pointer">
            Forgot Password?
          </p>

          {/* Sign In Button */}
          <button
            onClick={handleLogin}
            disabled={!isFormValid || loading}
            className={`w-full md:w-[258px] h-[60px] rounded-[20px] text-white font-bold text-[18px] mt-5 
              ${!isFormValid || loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#eb5e28]"} 
              ${loading && "opacity-70 cursor-not-allowed"}`}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

          {/* Sign Up Section */}
          <p className="text-[16px] md:text-[20px] mt-5 text-black">
            Not a member?{" "}
            <span
              className="font-extrabold text-[#eb5e28] cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </p>
        </div>

        {/* Right Side - Logo Section */}
        <div className="hidden md:flex justify-center items-center w-1/2">
          <img src={logo} alt="Discover Your Project" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
