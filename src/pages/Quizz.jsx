import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch, FaThLarge, FaProjectDiagram, FaUser, FaCheckCircle, FaSpinner } from "react-icons/fa";

const FeasibilityAssessment = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Organizational Feasibility");
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState(Array(20).fill(""));
  const [email, setEmail] = useState("");
  const [submittedTabs, setSubmittedTabs] = useState({
    "Organizational Feasibility": false,
    "Operational Feasibility": false,
  });
  const [isLoading, setIsLoading] = useState(false);



  const file_name = localStorage.getItem("file_name");

  const categories = ["Organizational Feasibility", "Operational Feasibility"];
  const questionsPerPage = 5;

  const questions = {
    "Organizational Feasibility": [
      "How well does this project align with the organization’s strategic goals?",
      "How much does the project contribute to achieving long-term organizational objectives?",
      "How supportive are the organization’s senior management of this project?",
      "How aligned are the project’s outcomes with the organization’s mission and vision?",
      "How well does the project leverage the organization’s core competencies?",
      "How do you assess the strengths of this project in relation to the organization’s capabilities?",
      "How significant are the weaknesses of this project within the organization?",
      "What level of opportunity does this project present for the organization?",
      "How critical are the threats that this project might face?",
      "How effective are the organization’s strategies in leveraging the project’s strengths?",
      "How supportive are the key stakeholders towards this project?",
      "How significant are the concerns raised by stakeholders regarding this project?",
      "How well are stakeholder expectations managed throughout the project?",
      "How engaged are stakeholders in the project planning and execution phases?",
      "How effectively are stakeholder communications handled in this project?",
      "How compatible is the current organizational structure with the needs of the project?",
      "How well do the reporting lines support the project’s implementation?",
      "How flexible is the organizational structure in accommodating project changes?",
      "How well does the organizational structure facilitate communication and collaboration for the project?",
      "How supportive are the organizational policies and procedures for the project?",
    ],
    "Operational Feasibility": [
      "How well does the current system align with operational goals?",
      "Is the current system scalable for future business growth?",
      "Does the current system meet user performance expectations?",
      "How adaptable is the current system to process changes?",
      "Is the level of automation in the current system sufficient?",
      "Does the current system provide adequate support for decision-making?",
      "How well does the system integrate with other operational systems?",
      "How effective is the current system in ensuring data accuracy?",
      "Can the current system be easily maintained by existing staff?",
      "Is there enough documentation available for the current system?",
      "How well does the current system align with regulatory requirements?",
      "Is the current system prone to frequent failures or downtime?",
      "Does the current system provide real-time access to data?",
      "How efficiently does the current system manage resources?",
      "Does the current system support collaboration among departments?",
      "How well is the current system aligned with operational best practices?",
      "Can the current system be customized to meet unique operational needs?",
      "Does the company currently have other ongoing projects that might compete for resources?",
      "Will the simultaneous management of other projects impact the success of the new system?",
      "Are there potential delays in project timelines due to resource allocation conflicts with other ongoing projects?",
    ],
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setEmail(userData.email || "");
    }
  }, []);

  useEffect(() => {
    if (submittedTabs["Organizational Feasibility"] && submittedTabs["Operational Feasibility"]) {
      navigate("/dashboard");
    }
  }, [submittedTabs, navigate]);

  const handleSelect = (index, value) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = value;
      return newAnswers;
    });
  };

  const getTabIcon = (category) => {
    return submittedTabs[category] ? (
      <FaCheckCircle className="text-green-500 ml-2" />
    ) : (
      <FaSpinner className="text-yellow-500 ml-2 animate-spin" />
    );
  };

  const handleSubmit = async () => {
    const payload = {
      file_name: file_name,
      email: email,
      ans: {}
    };

    setIsLoading(true)

    answers.forEach((answer, index) => {
      payload.ans[`Q${index + 1}`] = answer || "N/A";
    });

    const apiUrl = selectedCategory === "Organizational Feasibility"
      ? "http://127.0.0.1:5000/api/organizational"
      : "http://127.0.0.1:5000/api/operational";

    try {
      await axios.post(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Assessment submitted successfully!");
      // submittedTabs["Organizational Feasibility"]
      setSubmittedTabs((prev) => {
        const updatedTabs = { ...prev, [selectedCategory]: true };

        // ✅ Check if both are submitted & navigate
        if (updatedTabs["Organizational Feasibility"] && updatedTabs["Operational Feasibility"]) {
          navigate("/dashboard");
        }
        return updatedTabs;
      });
    } catch (error) {
      toast.error("Failed to submit assessment. Please try again.");
    } finally {
      setIsLoading(false)
    }

  };



  const startIndex = currentPage * questionsPerPage;
  const displayedQuestions = questions[selectedCategory].slice(startIndex, startIndex + questionsPerPage);
  const isSubmitDisabled = answers.includes("");

  const ChangeState = (category) => {
    setSelectedCategory(category)
    setCurrentPage(0);
    setAnswers(Array(20).fill(""));
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center bg-white p-4 shadow rounded-md">
        <h1 className="text-xl font-bold text-gray-700">Feasibility Assessment</h1>
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 p-2 border rounded-full shadow-sm text-gray-600 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-6 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xs">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => ChangeState(category)}
              className={`flex items-center justify-between w-full py-3 mt-2 px-4 rounded-lg font-semibold ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {category}
              {getTabIcon(category)}
            </button>
          ))}
          <button
            className={`w-full mt-4 py-3 text-lg font-semibold rounded-lg ${answers.includes("") ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            onClick={handleSubmit}
            disabled={answers.includes("") || isLoading}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
          {selectedCategory === "Organizational Feasibility"
            ? displayedQuestions.map((question, i) => (
              <div key={i + startIndex} className="mb-4">
                <p className="font-semibold">Question {i + 1 + startIndex}</p>
                <p className="text-gray-600 mb-2">{question}</p>
                <select
                  className="w-full p-3 border rounded-lg shadow-sm bg-gray-50"
                  value={answers[i + startIndex]}
                  onChange={(e) => handleSelect(i + startIndex, e.target.value)}
                >
                  <option value="">Select Answer</option>
                  <option value="A4">Not Aligned</option>
                  <option value="A3">Slightly Aligned</option>
                  <option value="A2">Moderately Aligned</option>
                  <option value="A1">Well Aligned</option>
                </select>
              </div>
            ))
            : displayedQuestions.map((question, i) => (
              <div key={i + startIndex} className="mb-4">
                <p className="font-semibold">Question {i + 1 + startIndex}</p>
                <p className="text-gray-600 mb-2">{question}</p>
                <select
                  className="w-full p-3 border rounded-lg shadow-sm bg-gray-50"
                  value={answers[i + startIndex]}
                  onChange={(e) => handleSelect(i + startIndex, e.target.value)}
                >
                  <option value="">Select Answer</option>
                  <option value="A4">Low</option>
                  <option value="A3">Medium</option>
                  <option value="A2">High</option>
                  <option value="A1">Verry High</option>
                </select>
              </div>
            ))}


          <div className="flex justify-between mt-4">
            <button disabled={currentPage === 0} onClick={() => setCurrentPage((prev) => prev - 1)}>
              <IoIosArrowBack className="text-3xl" />
            </button>
            <button disabled={startIndex + questionsPerPage >= questions[selectedCategory].length} onClick={() => setCurrentPage((prev) => prev + 1)}>
              <IoIosArrowForward className="text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeasibilityAssessment;
