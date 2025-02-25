import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, useParams, Link } from 'react-router-dom';

const departments = ['B.Sc', 'BCA', 'BBA', 'B.A Defence', 'MCA'];
const years = ['1st Year', '2nd Year', '3rd Year'];

export function Register() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const displayRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : '';

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: role || 'student',
    department: '',
    year: '',
    class_section: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (role === 'admin') {
    navigate('/');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      const user = data.user;
      if (!user) throw new Error('User creation failed');

      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: user.id,
          full_name: formData.full_name,
          email: formData.email,
          role: formData.role,
          department: formData.role === 'student' ? formData.department : null,
          year: formData.role === 'student' ? formData.year : null,
          class_section: formData.role === 'student' ? formData.class_section : null,
          created_at: new Date(),
        },
      ]);

      if (profileError) {
        console.error('Profile Insert Error:', profileError);
        setError(`Profile Insert Error: ${profileError.message}`);
        return;
      }

      alert('Registration successful! Redirecting to login...');
      navigate(`/login/${role}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Database Error:', err);
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{displayRole} Registration</h2>
      <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="full_name"
            value={formData.full_name}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${role} email`}
            onChange={handleChange}
            required
          />
        </div>

        {role === 'student' && (
          <>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Department"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
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
            name="password"
            value={formData.password}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}
