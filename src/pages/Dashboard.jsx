import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";



const Body = () => {
  const [projects, setProjects] = useState([]);
  const [latestProject, setLatestProject] = useState(null);
  const [projectStatus, setProjectStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      fetchProjects(user.email);
    }
  }, []);

  const fetchProjects = async (email) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/projects?email=${email}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setProjects(response.data.projects);

      if (response.data.projects.length > 0) {
        setLatestProject(response.data.projects[response.data.projects.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    if (latestProject) {
      console.log("Received Project:", latestProject);

      const { financial_result, operational_result, organizational_result, technical_result } = latestProject;

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
  }, [latestProject]);

  // Categorizing projects based on feasibility
  const totalProjects = projects?.length || 0;
  let highlyFeasibleCount = 0;
  let moderatelyFeasibleCount = 0;
  let marginallyFeasibleCount = 0;
  let notFeasibleCount = 0;

  projects.forEach((x) => {
    const results = [
      x.financial_result,
      x.operational_result,
      x.organizational_result,
      x.technical_result
    ];

    const countL1 = results.filter(r => r === 'L1').length;
    const countL2 = results.filter(r => r === 'L2').length;
    const countL3 = results.filter(r => r === 'L3').length;
    const countL4 = results.filter(r => r === 'L4').length;

    if (countL1 === 4) {
      highlyFeasibleCount += 1;
    } else if (countL4 > 0) {
      notFeasibleCount += 1;
    } else if (countL3>0) {
      marginallyFeasibleCount += 1;
    } else {
      moderatelyFeasibleCount += 1;
    }
  });

  const statusColor = {
    "Highly Feasible": "bg-green-500",
    "Not Feasible": "bg-red-500",
    "Moderately Feasible": "bg-yellow-500",
    "Marginally Feasible": "bg-orange-500",
  };

  const handleViewProject = (project) => {
    navigate("/recommandation", { state: { project } });
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center col-span-1 h-62 flex flex-col justify-center">
          <p className="text-red-500 font-semibold">Total Projects</p>
          <p className="text-4xl font-bold">{totalProjects}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 col-span-3">
          <div className="bg-white p-4 rounded-lg shadow-md text-center h-32 flex flex-col justify-center">
            <p className="text-green-600 font-semibold">Highly Feasible Projects</p>
            <p className="text-3xl font-bold">{highlyFeasibleCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center h-32 flex flex-col justify-center">
            <p className="text-blue-600 font-semibold">Moderately Feasible Projects</p>
            <p className="text-3xl font-bold">{moderatelyFeasibleCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center h-32 flex flex-col justify-center">
            <p className="text-yellow-500 font-semibold">Marginally Feasible Projects</p>
            <p className="text-3xl font-bold">{marginallyFeasibleCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center h-32 flex flex-col justify-center col-span-3">
            <p className="text-red-500 font-semibold">Not Feasible Projects</p>
            <p className="text-3xl font-bold">{notFeasibleCount}</p>
          </div>
        </div>
      </div>

      {/* Latest Report */}
      {latestProject && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Latest Report</p>
            <p className="text-gray-500 text-sm">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md flex items-center justify-between border border-gray-200">
            <div className="flex-1">
              <p className="text-gray-500 text-sm">Project Name</p>
              <p className="text-3xl font-semibold text-gray-800">{latestProject.file_name}</p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`px-4 py-2 text-sm font-semibold rounded-full shadow-md text-white ${statusColor[projectStatus] || "bg-gray-400"}`}
              >
                {projectStatus || "Pending"}
              </span>

              <button
                onClick={() => handleViewProject(latestProject)}
                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200"
              >
                <Eye className="text-gray-600 w-5 h-5" />
              </button>
            </div>
          </div>


        </div>
      )}
    </div>
  );
};

const Dashboard = () => (
  <div className="flex h-screen">
    <NavBar />
    <div className="flex-1 flex flex-col bg-gray-100">
      <Header />
      <Body />
    </div>
  </div>
);

export default Dashboard;
