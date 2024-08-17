import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-3xl font-bold mb-8">Welcome</h2>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/page1')}
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go to Page 1
          </button>
          <button
            onClick={() => navigate('/page2')}
            className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Go to Page 2
          </button>
          <button
            onClick={() => navigate('/page3')}
            className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Go to Page 3
          </button>
          <button
            onClick={() => navigate('/page4')}
            className="w-full py-2 px-4 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Go to Page 4
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
