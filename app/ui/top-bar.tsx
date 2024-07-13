'use client'

import React from "react";

export default function Header() {
  return (
    <header className="p-4 border-b border-gray-200 shadow-sm flex justify-end items-center">
      <button 
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => console.log("Profile clicked")}
        aria-label="Open profile menu"
      >
        <svg 
          className="w-6 h-6 text-gray-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
    </header>
  );
}