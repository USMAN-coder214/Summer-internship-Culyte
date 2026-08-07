// InternProfile.jsx

import React from "react";

const InternProfile = () => {
  return (
    <div className="p-6 m-8 bg-blue-100 border border-blue-400 rounded-xl shadow-lg max-w-sm">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">
        Usmii
      </h1>

      <p className="text-gray-800 mb-2">
        <span className="font-semibold">Internship Title:</span> Frontend Web Developer Intern
      </p>

      <p className="text-gray-800 mb-2">
        <span className="font-semibold">Email:</span> usmii@example.com
      </p>

      <p className="text-gray-800 mb-4">
        <span className="font-semibold">Current Internship Week:</span> Week 4
      </p>

      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow font-semibold border border-blue-700">
        View Profile
      </button>
    </div>
  );
};

export default InternProfile;