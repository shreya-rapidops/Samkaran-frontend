// components/UserProgress.jsx
import React from 'react';

const UserProgress = ({ progressData }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">📈 Your Progress</h2>
      <ul>
        {progressData.map((course) => (
          <li key={course.title} className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">{course.title}</span>
              <span>{course.completedModules}/{course.totalModules} Modules</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(course.completedModules / course.totalModules) * 100}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProgress;
