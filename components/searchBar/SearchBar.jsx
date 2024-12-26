'use client'
import React, { useState } from 'react';
import Link from 'next/link';

export default function SearchBar() {
  const [interest, setInterest] = useState("");
  const [skills, setSkills] = useState("");

  // Check if the search button should be disabled
  const isSearchDisabled = !skills.trim() && !interest.trim(); // Both fields can't be empty

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-md md:shadow-lg p-6 w-full sm:w-[45vw] flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-0 md:gap-x-8">
        
        {/* Interest Input */}
        <input
          type="text"
          placeholder="Enter interests"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full sm:w-40 border-gray-300 rounded-md p-1 md:p-2"
        />

        {/* Skills Input */}
        <input
          type="text"
          placeholder="Enter skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full sm:w-40 border-gray-300 rounded-md p-1 md:p-2"
        />

        {/* Search Button */}
        <Link
          href={
            isSearchDisabled
              ? "#"
              : `/freelancer/type?${interest ? `interest=${encodeURIComponent(interest)}` : ""}${
                  interest && skills ? "&" : ""
                }${skills ? `skills=${encodeURIComponent(skills)}` : ""}`
          }
          className={`w-full sm:w-auto px-4 py-2 rounded-md text-white ${
            isSearchDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          }`}
        >
          Find Freelancer →
        </Link>
      </div>
    </div>
  );
}
