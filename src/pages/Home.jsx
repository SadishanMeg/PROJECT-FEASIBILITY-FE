import { useState, useEffect } from "react";
import image1 from "../assets/images/img1.jpg"; // Replace with actual path
import prfImage from "../assets/images/profileImage.png"; // Replace with actual path
import HDimg from "../assets/images/header.png"; // Replace with actual path
import step1Image from "../assets/images/sideIMG1.jpg"; // Replace with actual path
import { Upload } from "lucide-react";
import step2Image from "../assets/images/sideIMG2.png"; // Replace with actual image path
import step3Image from "../assets/images/sideIMG3.png"; // Replace with the correct image path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import samplePDF from "../assets/template.pdf"; // Import the PDF file
import { FaHome } from "react-icons/fa";




const Header = () => {
    const [loggedUser, setLoggedUser] = useState({});
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.email) {
            setLoggedUser(user);
        }
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white shadow-md z-50">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <img src={HDimg} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                <span className="text-xl sm:text-2xl font-bold">
                    <span className="text-black">S</span>
                    <span className="text-orange-500">D</span>
                    <span className="text-black">S</span>
                    <span className="text-orange-500">N</span>
                </span>
            </div>

            {/* Profile & Dashboard Button */}
            <div className="flex items-center gap-4">
                {/* Dashboard Button */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                    <FaHome size={20} />
                </button>

                {/* Profile */}
                <div className="flex items-center gap-2">
                    <img src={prfImage} alt="User" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                    <div className="hidden sm:block">
                        <p className="text-gray-900 font-medium text-sm sm:text-base">{loggedUser.name}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">User</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

const WhyChooseUs = () => {
    return (
        <motion.section
            className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center py-8 px-4 sm:px-6 md:px-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the section is in view
        >
            <motion.h2
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
            >
                Why Choose Us?
            </motion.h2>

            <motion.p
                className="text-gray-700 max-w-2xl sm:max-w-3xl mx-auto text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
            >
                Conduct a comprehensive feasibility analysis to assess financial, organizational, technical,
                and operational viability before investing. Leverage advanced OCR technology for precise
                smart information extraction, ensuring key project details are captured accurately. Enjoy
                seamless integration with your existing systems for smooth workflow management.
                Designed for business analysts and project managers, this solution enables fast, accurate
                decision-making in high-pressure environments.
            </motion.p>
        </motion.section>
    );
};




const Step1Download = () => {
    return (
        <motion.div
            id="step1"
            className="flex flex-col items-start justify-center min-h-screen p-6 sm:p-8 md:p-12 bg-white w-full max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Title Section */}
            <h3 className="text-gray-700 text-base sm:text-lg font-medium">Step 1</h3>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                Download Project Proposal Template
            </h2>

            {/* Main Content Section */}
            <div className="flex flex-col md:flex-row items-center w-full mt-6">
                {/* Left Side - Image */}
                <motion.div
                    className="md:w-1/2 flex justify-center"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <img src={step1Image} alt="Team Collaboration" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto" />
                </motion.div>

                {/* Right Side - Text Content */}
                <motion.div
                    className="md:w-1/2 text-left md:pl-8 mt-6 md:mt-0"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <ul className="text-gray-700 space-y-4 text-sm sm:text-base md:text-lg leading-relaxed">
                        <li>
                            <strong>Download the Template</strong> – Click the Download button below to get the project proposal form.
                        </li>
                        <li>
                            <strong>Fill Out the Form</strong> – Enter all required project details in the downloaded template.
                        </li>
                        <li>
                            <strong>Proceed to Upload</strong> – Once completed, continue to the next step to upload your filled form.
                        </li>
                    </ul>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                        <motion.a
                            href={samplePDF}
                            download="Project_Proposal_Template.pdf"
                            className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 text-sm sm:text-lg w-full sm:w-auto text-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Download Form
                        </motion.a>
                        <motion.button
                            onClick={() => document.getElementById("step2").scrollIntoView({ behavior: "smooth" })}
                            className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 text-sm sm:text-lg w-full sm:w-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Go to Step 2
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};



const Step2Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const storedUser = localStorage.getItem("user");
    const userData = JSON.parse(storedUser);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            setMessage("");
        } else {
            setMessage("Please select a valid PDF file.");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("No file selected. Please choose a PDF file to upload.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("name", selectedFile.name.replace(".pdf", ""));
        formData.append("email", userData.email);

        try {
            const response1 = await axios.post("http://127.0.0.1:5000/fields/technical", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const response2 = await axios.post("http://127.0.0.1:5000/fields/financial", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            localStorage.setItem('file_name', selectedFile.name.replace(".pdf", ""));
            toast.success("File uploaded successfully!");
            document.getElementById("step3").scrollIntoView({ behavior: "smooth" })
        } catch (error) {
            setMessage("File upload failed. Please try again.");
            console.error("Upload error:", error);
        }
        setUploading(false);
    };

    return (
        <motion.div
            id="step2"
            className="w-full max-w-8xl bg-gray-100 mx-auto p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center min-h-screen"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center w-full">
                <motion.div
                    className="w-full md:w-2/3 text-center md:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-base sm:text-lg font-semibold text-gray-700">Step 2</h2>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
                        Upload Project Proposal Template
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Now that you have filled out the project proposal template, follow these steps to upload it:
                    </p>
                    <ul className="list-none text-gray-600 mt-4 space-y-3 text-sm sm:text-base">
                        <li><strong>Select Your File</strong> - Click the Upload button and choose the completed proposal form.</li>
                        <li><strong>Verify Your Upload</strong> - Ensure the correct file is selected before proceeding.</li>
                        <li><strong>Submit & Continue</strong> - Click Submit to upload your proposal and move to the next step.</li>
                    </ul>
                    <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <motion.label
                            className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-md cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Upload size={16} /> Upload Form
                            <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
                        </motion.label>
                        <motion.button
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleUpload}
                            disabled={uploading || !selectedFile}
                        >
                            {uploading ? "Uploading..." : "Go to Step 3"}
                        </motion.button>
                    </div>
                    {selectedFile && <p className="text-sm text-green-600 mt-2">Selected file: {selectedFile.name}</p>}
                    {message && <p className="text-sm mt-2 text-red-600">{message}</p>}
                </motion.div>
            </div>
        </motion.div>
    );
};


const Step3Quizz = () => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate("/quiz"); // Change "/quiz" to your actual quiz route
    };

    return (
        <motion.div
            id="step3"
            className="flex flex-col items-center p-6 sm:p-8 md:p-12 bg-white w-full max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Title Section */}
            <motion.h3
                className="text-gray-700 text-base sm:text-lg font-medium"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
            >
                Step 3
            </motion.h3>
            <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 text-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
            >
                Feasibility Assessment Quizzes
            </motion.h2>

            {/* Content Section */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mt-5 w-full">
                {/* Left Image Section */}
                <motion.div
                    className="w-full md:w-1/3 p-2 flex justify-center md:justify-start"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <img src={step3Image} alt="Quiz Illustration" className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-md" />
                </motion.div>

                {/* Right Text Section */}
                <motion.div
                    className="w-full md:w-2/3 md:pl-8 text-center md:text-left mt-6 md:mt-0"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-600 text-sm sm:text-base">
                        Now that your project proposal is submitted, it's time to assess feasibility through four short quizzes.
                        Follow these steps:
                    </p>

                    {/* Instructions List */}
                    <ul className="list-none text-gray-600 mt-4 space-y-3 text-sm sm:text-base">
                        <li>
                            <span className="font-semibold">1. Start the Quiz</span> – Click the Start Quiz button below to begin.
                        </li>
                        <li>
                            <span className="font-semibold">2. Answer All Four Quizzes</span> – You will face questions on:
                            <ul className="list-disc list-inside ml-4 sm:ml-6 mt-2 space-y-1">
                                <li>Organizational Feasibility</li>
                                <li>Technical Feasibility</li>
                                <li>Operational Feasibility</li>
                                <li>Financial Feasibility</li>
                            </ul>
                        </li>
                        <li>
                            <span className="font-semibold">3. Complete Each Quiz</span> – Answer all questions carefully before proceeding to the next.
                        </li>
                        <li>
                            <span className="font-semibold">4. Submit & Continue</span> – After finishing all four quizzes, submit your responses to move forward.
                        </li>
                    </ul>

                    {/* Start Quiz Button */}
                    <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <motion.button
                            className="bg-black text-white px-6 py-3 w-full sm:w-auto rounded-lg shadow-md text-lg font-semibold hover:bg-gray-800"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStartQuiz}
                        >
                            Start Quiz
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const Footer = () => {
    return (
        <footer className="w-full bg-gray-100 py-6 px-4 sm:px-8 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                {/* Left side: Copyright */}
                <p className="text-gray-700 mb-4 md:mb-0">
                    Copyright © 2025 <span className="text-orange-500 font-semibold">SDSN</span>
                </p>

                {/* Right side: Social icons */}
                <div className="flex space-x-6 text-black text-xl">
                    <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#" aria-label="WhatsApp" className="hover:text-green-500 transition">
                        <FontAwesomeIcon icon={faWhatsapp} />
                    </a>
                    <a href="#" aria-label="Email" className="hover:text-gray-700 transition">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </div>
            </div>
        </footer>
    );
};



const ProjectPlanning = () => {
    return (
        <div className="relative h-screen bg-white flex flex-col items-center pt-20">
            <Header />
            <div className="relative w-full max-w-7xl flex flex-col md:flex-row items-center justify-center px-4 md:px-12 min-h-screen">
                {/* Left Content (Text + Button) */}
                <motion.div
                    className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center flex-1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="font-poppins font-extrabold text-3xl md:text-5xl leading-tight text-gray-900">
                        Smarter Project Planning
                    </h1>
                    <h2 className="font-poppins font-extrabold text-3xl md:text-5xl text-orange-500 mt-2">
                        Starts with the Right Feasibility Check
                    </h2>
                    <motion.button
                        onClick={() => document.getElementById("step1").scrollIntoView({ behavior: "smooth" })}
                        className="mt-6 bg-gray-900 text-white px-5 py-3.5 max-w-xs font-medium rounded-lg shadow-md hover:bg-gray-800 transition-all tracking-wide"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Get Started
                    </motion.button>

                </motion.div>

                {/* Right Image */}
                <motion.div
                    className="w-full md:w-1/2 flex justify-center items-center flex-1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                >
                    <img src={image1} alt="Project Planning" className="w-full max-w-xs md:max-w-md h-auto" />
                </motion.div>
            </div>


            <WhyChooseUs />
            <Step1Download />
            <Step2Upload />
            <Step3Quizz />
            <Footer />
        </div>
    );
};


export default ProjectPlanning;
