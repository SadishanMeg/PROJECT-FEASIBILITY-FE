import { useState, useEffect } from "react";
import axios from "axios";
import { Search, ArrowLeft, CheckSquare } from "lucide-react";
import NavBar from "../components/Navbar";

const Body = () => {
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("08/02/2025");
    const [toDate, setToDate] = useState("08/02/2025");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");

    // Fetch user email from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.email) {
                setEmail(userData.email);
            }
        }
    }, []);

    // Fetch projects when email is set
    useEffect(() => {
        const fetchProjects = async () => {
            if (!email) return; // Avoid making API call if email is empty

            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/projects?email=${email}`);
                setProjects(response.data.projects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [email]); // Depend on email, so it runs when email updates

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
            {/* Top Navigation */}
            <div className="flex justify-between items-center mb-4">
                <button className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition">
                    <ArrowLeft size={20} />
                </button>
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-10 pr-4 py-2 rounded-md shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Date Filters */}
            <div className="flex justify-center space-x-12 text-sm font-semibold text-gray-600 mb-6">
                <span>History</span>
                <span>From Date: <span className="font-bold">{fromDate}</span></span>
                <span>To Date: <span className="font-bold">{toDate}</span></span>
            </div>

            {/* History Table */}
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-lg font-bold text-orange-500 mb-4">All History</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 text-gray-600 font-semibold border-b pb-2">
                    <span>Project Name</span>
                    <span className="hidden sm:block"></span>
                    <span className="text-right">Project Status</span>
                </div>

                {loading ? (
                    <div className="text-center py-4 text-gray-500">Loading projects...</div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No projects found</div>
                ) : (
                    <div className="bg-purple-50 rounded-lg p-4 mt-2">
                        {projects.map((project, index) => (
                            <div key={index} className="grid grid-cols-2 sm:grid-cols-3 items-center py-2 border-b last:border-b-0">
                                <div className="flex items-center space-x-3">
                                    <span className="w-8 h-8 flex items-center justify-center bg-purple-300 text-white rounded-full font-bold">
                                        A
                                    </span>
                                    <span>{project.file_name}</span>
                                </div>
                                <div className="hidden sm:block"></div>
                                <div className="flex justify-end">
                                    <CheckSquare className="text-purple-700" size={18} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const History = () => {
    return (
        <div className="flex h-screen">
            <NavBar />
            <div className="flex flex-col flex-1">
                <Body />
            </div>
        </div>
    );
};

export default History;
