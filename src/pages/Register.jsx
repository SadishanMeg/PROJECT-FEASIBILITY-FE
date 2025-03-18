import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Email Validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(formData.email));
  }, [formData.email]);

  // Check if the form is valid
  useEffect(() => {
    const { name, email, mobile, password, confirmPassword } = formData;
    const isAllFieldsFilled = name && email && mobile && password && confirmPassword;
    const isPasswordMatch = password === confirmPassword;
    
    setIsFormValid(isAllFieldsFilled && isValidEmail && isPasswordMatch);
  }, [formData, isValidEmail]);

  // Handle Sign-Up Request
  const handleSignUp = async () => {
    if (!isFormValid) {
      toast.error("Please fill all fields correctly!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/auth/register", {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      });

      toast.success("Registration Successful!");
      setLoading(false);
      navigate("/"); // Redirect to Sign In page
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-[1440px]">
        
        {/* Left Side - Signup Form */}
        <div className="flex flex-col items-center lg:items-start lg:pl-[140px] w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-[50px] lg:text-[70px] font-extrabold text-[#eb5e28] mb-5">SIGN UP</h2>
          
          <input 
            type="text" 
            name="name"
            placeholder="Name..." 
            value={formData.name}
            onChange={handleChange}
            className="w-full max-w-[467px] h-[54px] bg-[#eaeaea] rounded-[20px] px-4 text-[21px] mb-2 outline-none"
          />

          <input 
            type="email" 
            name="email"
            placeholder="Email..." 
            value={formData.email}
            onChange={handleChange}
            className="w-full max-w-[467px] h-[54px] bg-[#eaeaea] rounded-[20px] px-4 text-[21px] mb-2 outline-none"
          />
          {!isValidEmail && formData.email && (
            <p className="text-red-500 text-sm mb-2">Invalid email format</p>
          )}

          <input 
            type="tel" 
            name="mobile"
            placeholder="Mobile..." 
            value={formData.mobile}
            onChange={handleChange}
            className="w-full max-w-[467px] h-[54px] bg-[#eaeaea] rounded-[20px] px-4 text-[21px] mb-2 outline-none"
          />

          <input 
            type="password" 
            name="password"
            placeholder="Password..." 
            value={formData.password}
            onChange={handleChange}
            className="w-full max-w-[467px] h-[54px] bg-[#eaeaea] rounded-[20px] px-4 text-[21px] mb-2 outline-none"
          />

          <input 
            type="password" 
            name="confirmPassword"
            placeholder="Re-enter Password..." 
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full max-w-[467px] h-[54px] bg-[#eaeaea] rounded-[20px] px-4 text-[21px] mb-2 outline-none"
          />
          {formData.password !== formData.confirmPassword && formData.confirmPassword && (
            <p className="text-red-500 text-sm mb-2">Passwords do not match</p>
          )}

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            disabled={!isFormValid || loading}
            className={`w-[258px] h-[60px] rounded-[20px] text-white font-bold text-[18px] mt-5 
              ${!isFormValid || loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#eb5e28]"}`}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <p className="text-[18px] mt-5 text-black">
            Already a member?{" "}
            <span
              className="font-extrabold text-[#eb5e28] cursor-pointer"
              onClick={() => navigate("/")}
            >
              Sign In
            </span>
          </p>
        </div>

        {/* Right Side - Logo Section */}
        <div className="hidden lg:flex justify-center items-center w-1/2">
          <img src={logo} alt="Discover Your Project" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
