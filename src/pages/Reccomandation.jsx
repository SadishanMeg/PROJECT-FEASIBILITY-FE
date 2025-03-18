import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import NavBar from "../components/Navbar";

const Body = () => {
    const [projectStatus, setProjectStatus] = useState("");
    const location = useLocation();
    const navigate = useNavigate(); // ✅ Initialize useNavigate()

    const project = location.state?.project;

    // Recommendations
    const organization_recommendations = {
        "Highly Feasible": "This project is well-aligned with the organization’s goals and resources.\n Proceed with implementation.",
        "Moderately Feasible": "The project has potential but requires some improvements in the organizational structure before proceeding.",
        "Marginally Feasible": "Significant concerns exist in the organizational feasibility area.\n These must be addressed before moving forward.",
        "Not Feasible": "This project is not feasible in its current form due to serious organizational challenges.\n Major revisions or reconsideration are required."
    };

    const technical_recommendations = {
        "Highly Feasible": "The selected technologies align with industry standards.",
        "Moderately Feasible": "Maximize RAM size and hard disk.\n Use Bootstrap for frontend and Python for backend.\n Avoid LangChain; instead, use Spring Boot.\n Upgrade the processor from Intel i5 to Intel i7.",
        "Marginally Feasible": "Improve software and hardware compatibility before proceeding.",
        "Not Feasible": "Avoid Windows XP/8/10 and switch to Windows 11.\n Recommended stack:\n  - Frontend: Bootstrap\n  - Backend: Java\n  - Database: MySQL\n  - Framework: Spring Boot\n  - Source Control: GitLab"
    };

    const operational_recommendations = {
        "Highly Feasible": "The project aligns well with current operations, resources, and workflows.\n No major obstacles; ready for implementation.",
        "Moderately Feasible": "Minor changes needed, such as resource allocation and workflow improvements.",
        "Marginally Feasible": "Significant operational issues must be resolved before moving forward.",
        "Not Feasible": "The project faces major operational challenges and requires revision."
    };

    const financial_recommendations = {
        "Highly Feasible": "Optimize tax benefits through deductions, credits, and incentives.\n Enhance cash flow management for smooth operations.",
        "Moderately Feasible": "Reassess ROI expectations.\n Seek additional funding sources (e.g., grants, crowdfunding, partnerships).\n Balance technical and functional resource allocation.",
        "Marginally Feasible": "Diversify funding sources to improve financial stability.\n Implement strict cost-monitoring measures.\n Strengthen contingency planning by allocating 5–10% of the budget for unforeseen expenses.",
        "Not Feasible": "Re-evaluate the business model and consider restructuring the project.\n Reduce initial investment by leasing, outsourcing, or launching a Minimum Viable Product (MVP).\n Develop exit strategies if feasibility remains low."
    };

    useEffect(() => {
        if (project) {
            console.log("Received Project:", project);

            const { financial_result, operational_result, organizational_result, technical_result } = project;

            // Get all levels in an array
            const levels = [financial_result, operational_result, organizational_result, technical_result];

            if (levels.every(level => level === "L1")) {
                setProjectStatus("Highly Feasible");
            } else if (levels.includes("L4")) {
                setProjectStatus("Not Feasible");
            } else if (levels.includes("L3")) 
                setProjectStatus("Marginally Feasible");
            else {
                setProjectStatus("Moderately Feasible");
            }
        }
    }, [project]);

    // Define badge color based on status
    const statusColor = {
        "Highly Feasible": "bg-green-500",
        "Not Feasible": "bg-red-500",
        "Moderately Feasible": "bg-yellow-500",
        "Marginally Feasible": "bg-orange-500",
    };

    const handleBack = () => {
        navigate("/projects"); // ✅ Navigates to /projects
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <button className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition" onClick={handleBack}>
                    <ArrowLeft size={20} />
                </button>
                <div className="relative w-full max-w-xs">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 p-2 bg-white border rounded-full text-gray-600 focus:outline-none"
                    />
                </div>
            </div>

            {/* Recommendation Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <h2 className="text-lg font-bold text-orange-600">Secure Digital Banking Platform</h2>
                <div className="flex flex-col sm:flex-row justify-between items-center my-4 gap-4">
                    <span className="text-4xl font-bold"></span>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColor[projectStatus] || "bg-gray-400"} text-white`}>
                        {projectStatus || "Loading..."}
                    </span>
                </div>

                {/* Feasibility Sections */}
                <div className="space-y-6">
                    {/* Organizational Feasibility */}
                    <div>
                        <h3 className="text-blue-700 font-bold">Organizational Feasibility</h3>
                        <ul className="list-disc list-inside text-gray-600">
                            {organization_recommendations[projectStatus]?.split("\n").map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Technical Feasibility */}
                    <div>
                        <h3 className="text-blue-700 font-bold">Technical Feasibility</h3>
                        <ul className="list-disc list-inside text-gray-600">
                            {technical_recommendations[projectStatus]?.split("\n").map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Operational Feasibility */}
                    <div>
                        <h3 className="text-blue-700 font-bold">Operational Feasibility</h3>
                        <ul className="list-disc list-inside text-gray-600">
                            {operational_recommendations[projectStatus]?.split("\n").map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Financial Feasibility */}
                    <div>
                        <h3 className="text-blue-700 font-bold">Financial Feasibility</h3>
                        <ul className="list-disc list-inside text-gray-600">
                            {financial_recommendations[projectStatus]?.split("\n").map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Recommendation = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen overflow-auto">
            <NavBar />
            <div className="flex flex-col flex-1">
                <Body />
            </div>
        </div>
    );
};

export default Recommendation;
