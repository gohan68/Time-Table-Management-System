import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/logo.png" 
              alt="Guru Nanak College Logo" 
              className="w-24 h-24 mr-4"
            />
            <h1 className="text-4xl font-bold text-gray-800">Guru Nanak College</h1>
          </div>
          <h2 className="text-2xl text-gray-600">Time Table Management System</h2>
        </header>

        <main className="max-w-4xl mx-auto">
          <Outlet />
        </main>

        <footer className="mt-16 text-center text-gray-600">
          <p>© 2025 Guru Nanak College. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}