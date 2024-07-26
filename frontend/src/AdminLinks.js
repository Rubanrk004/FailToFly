// src/components/AdminLinks.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminLinks = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Admin Pages</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/admin"
            className="block p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50"
          >
            Sections Upload page
          </Link>
        </li>
        <li>
          <Link
            to="/adminmsg"
            className="block p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50"
          >
            User Message Page
          </Link>
        </li>
        <li>
          <Link
            to="/avbadmin"
            className="block p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50"
          >
            Avb Admin Page
          </Link>
        </li>
        <li>
          <Link
            to="/resumeupload"
            className="block p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50"
          >
            Add Resume Templates
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default AdminLinks;
