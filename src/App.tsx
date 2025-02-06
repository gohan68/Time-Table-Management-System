import React, { useState } from 'react';
import { Users, GraduationCap, UserCog } from 'lucide-react';

function App() {
  const [activeRole, setActiveRole] = useState<'admin' | 'faculty' | 'student' | null>(null);

  const LoginForm = ({ role }: { role: string }) => (
    <form className="space-y-4 w-full max-w-sm">
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
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Login as {role}
      </button>
      <button
        type="button"
        onClick={() => setActiveRole(null)}
        className="w-full mt-2 text-gray-600 hover:text-gray-800"
      >
        Back to roles
      </button>
    </form>
  );

  const RoleCard = ({ role, icon: Icon, title }: { role: 'admin' | 'faculty' | 'student', icon: any, title: string }) => (
    <button
      onClick={() => setActiveRole(role)}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200 space-y-4 w-full sm:w-64"
    >
      <Icon className="w-12 h-12 text-blue-600" />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm text-center">Click to login as {title}</p>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/guru-nanak-college-logo.svg" 
              alt="Guru Nanak College Logo" 
              className="w-24 h-24 mr-4"
            />
            <h1 className="text-4xl font-bold text-gray-800">Guru Nanak College</h1>
          </div>
          <h2 className="text-2xl text-gray-600">Time Table Management System</h2>
        </header>

        <main className="max-w-4xl mx-auto">
          {activeRole ? (
            <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} Login
              </h2>
              <LoginForm role={activeRole} />
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Select Your Role</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                <RoleCard role="admin" icon={UserCog} title="Admin" />
                <RoleCard role="faculty" icon={Users} title="Faculty" />
                <RoleCard role="student" icon={GraduationCap} title="Student" />
              </div>
            </div>
          )}
        </main>

        <footer className="mt-16 text-center text-gray-600">
          <p>© 2025 Guru Nanak College. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;