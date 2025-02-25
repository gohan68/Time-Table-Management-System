import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const departments = [
  'B.Sc',
  'BCA',
  'BBA',
  'B.A Defence',
  'MCA',
  'Electrical'
];

const years = ['1st Year', '2nd Year', '3rd Year',];

export function Register() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const displayRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : '';

  if (role === 'admin') {
    navigate('/');
    return null;
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {displayRole} Registration
      </h2>
      <form className="space-y-4 w-full max-w-sm">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${role} email`}
          />
        </div>

        {role === 'student' && (
          <>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                id="department"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                id="year"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year.toLowerCase().replace(/\s+/g, '-')}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                Class/Section
              </label>
              <input
                type="text"
                id="class"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your class (e.g., A, B, C)"
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>
        <div className="flex justify-between items-center mt-4">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Back to roles
          </Link>
          <Link to={`/login/${role}`} className="text-blue-600 hover:text-blue-800">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}