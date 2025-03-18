import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { Upload, Trash2 } from "lucide-react";
import prfImage from "../assets/images/profileImage.png"; // Replace with actual path
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Body = () => {
    const [image, setImage] = useState(prfImage);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch user data from local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setName(userData.name || "");
            setEmail(userData.email || "");
            setMobile(userData.mobile || "");
            if (userData.image) {
                setImage(userData.image);
            }
        }
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);

            // Update local storage with new image
            const updatedUser = { name, email, mobile, image: imageUrl };
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        const updatedUser = { name, email, mobile, image: null };
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    const handleUpdateUser = async () => {
        setIsLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token"); // Get token if needed
            const response = await axios.post(
                "http://127.0.0.1:5000/auth/update",
                { name, email, mobile, image, "previusEmail": email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token if required
                        "Content-Type": "application/json",
                    },
                }
            );

            // Success - Update local storage
            localStorage.setItem("user", JSON.stringify({ name, email, mobile, image }));
            setMessage("Profile updated successfully!");
            toast.success("Profile updated successfully!");
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to update profile");
            toast.error(error.response?.data?.message || "Failed to update profile");
        }

        setIsLoading(false);
    };

    return (
        <div className="p-6 flex-1 bg-gray-100">
            <div className="bg-gray-100 p-8 w-full">
                {/* Profile Section */}
                <div className="flex flex-col">
                    <div className="relative">
                        {image ? (
                            <img
                                src={image}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                        )}
                    </div>

                    {/* Upload & Remove Buttons */}
                    <div className="flex space-x-2 mt-2">
                        <label className="px-3 py-1 text-sm bg-black text-white rounded-md cursor-pointer flex items-center">
                            <Upload size={14} className="mr-1" />
                            Upload
                            <input type="file" className="hidden" onChange={handleImageUpload} />
                        </label>
                        {image && (
                            <button
                                className="px-3 py-1 text-sm bg-red-500 text-white rounded-md flex items-center"
                                onClick={handleRemoveImage}
                            >
                                <Trash2 size={14} className="mr-1" />
                                Remove
                            </button>
                        )}
                    </div>
                </div>

                {/* Input Fields */}
                <div className="mt-6 space-y-3">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 text-gray-600 bg-white border border-gray-300 rounded-lg outline-none"
                    />
                    <input
                        disabled
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 text-gray-600 bg-white border border-gray-300 rounded-lg outline-none"
                    />
                    <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full p-3 text-gray-600 bg-white border border-gray-300 rounded-lg outline-none"
                    />
                </div>

                {/* Update Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleUpdateUser}
                        className="w-full sm:w-1/3 py-3 bg-black text-white font-semibold rounded-lg transition duration-300 hover:bg-gray-800"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </button>
                </div>

                {/* Message Display */}
                {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
            </div>
        </div>
    );
};

const Accounts = () => {
    return (
        <div className="flex h-screen">
            <NavBar />
            <div className="flex flex-col flex-1">
                <Header />
                <Body />
            </div>
        </div>
    );
};

export default Accounts;
