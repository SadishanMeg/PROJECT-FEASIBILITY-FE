import React from 'react'
import { FaSearch, FaThLarge, FaProjectDiagram, FaUser } from "react-icons/fa";

export default function Header() {
    const getFormattedTodayDate = () => {
        const today = new Date();
        
        // Extract day, month, and year separately
        const day = today.getDate();
        const month = today.toLocaleString("en-US", { month: "long" });
        const year = today.getFullYear();
    
        // Add ordinal suffix (st, nd, rd, th)
        const suffix =
            day % 10 === 1 && day !== 11
                ? "st"
                : day % 10 === 2 && day !== 12
                ? "nd"
                : day % 10 === 3 && day !== 13
                ? "rd"
                : "th";
    
        return `${day}${suffix} ${month} ${year}`;
    };
    
    const todayDate = getFormattedTodayDate();
    
    return (
        <div className="flex justify-between items-center p-5 bg-gray-100 shadow-sm">
            <div>
                <h1 className="text-2xl font-bold text-gray-700">Account</h1>
                <p className="text-sm text-gray-500">{todayDate}</p>
                </div>
            <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 p-2 bg-white border rounded-full shadow-sm text-gray-600 focus:outline-none"
                />
            </div>
        </div>
    )
}
