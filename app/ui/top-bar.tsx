'use client'

import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="p-4 border-b border-gray-200 shadow-sm flex justify-end items-center">
      <button 
        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => console.log("Profile clicked")}
        aria-label="Open profile menu"
      >
        <FaUserCircle className="w-8 h-8 text-[#E6E0D0] hover:text-[#D6D0C0]" />
      </button>
    </header>
  );
}