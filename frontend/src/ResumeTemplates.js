import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumeTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/templates');
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching resume templates:', error);
    }
  };

  const openPreview = (template) => {
    setSelectedTemplate(template);
  };

  const closePreview = () => {
    setSelectedTemplate(null);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500/40">
      <h1 className="text-4xl font-bold mb-4">Resume Templates</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {templates.map(template => (
          <div key={template._id} className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500/40">
            <img 
              src="./resume.png"
              alt="resume-template" 
              className="w-full h-40 object-cover rounded-lg mb-3" 
            />
            <h2 className="text-2xl font-bold mb-2">{template.name}</h2>
            <p className="text-gray-700 mb-4">Click below to preview or download this template.</p>
            <div className="flex space-x-4">
              <button
                onClick={() => openPreview(template)}
                className="bg-gradient-to-r from-purple-500/20 to-indigo-500/50 text-white px-4 py-2 rounded-full shadow-md transition duration-300"
              >
                Preview
              </button>
              <a
                href={`http://localhost:5000${template.filePath}`}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-md transition duration-300"
                download
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for previewing template */}
      {selectedTemplate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative">
            <h2 className="text-2xl font-bold mb-2">{selectedTemplate.name}</h2>
            <iframe
              src={`http://localhost:5000${selectedTemplate.filePath}`}
              title="Template Preview"
              width="100%"
              height="600"
              className="mb-4"
            ></iframe>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closePreview}
                className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md transition duration-300"
              >
                Close Preview
              </button>
              <button
                onClick={closePreview}
                className="bg-gray-500 text-white px-4 py-2 rounded-full shadow-md transition duration-300"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeTemplates;
