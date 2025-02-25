import { useNavigate, useParams, Link } from 'react-router-dom';

export function Login() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const displayRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : '';

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {displayRole} Login
      </h2>
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
          Login
        </button>
        <div className="flex justify-between items-center mt-4">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Back to roles
          </Link>
          {role !== 'admin' && (
            <Link to={`/register/${role}`} className="text-blue-600 hover:text-blue-800">
              Create account
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}