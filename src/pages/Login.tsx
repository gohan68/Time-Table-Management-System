import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export function Login() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const displayRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("Logging in with:", email, password);

    // Sign in with Supabase auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("Supabase Response:", data, error);

    if (error) {
      console.error("Login Failed:", error.message);
      setError(error.message);
      return;
    }

    // Fetch the authenticated user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      console.error("User Fetch Error:", userError?.message);
      setError("Failed to get user session.");
      return;
    }

    const user = userData.user;

    // Fetch the user's role from the 'profiles' table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error("Profile Fetch Error:", profileError?.message);
      setError("Failed to fetch user profile.");
      return;
    }

    console.log("User Role:", profile.role);

    // Redirect user based on their role
    if (profile.role === "admin") {
      navigate("/admin");
    } else if (profile.role === "faculty") {
      navigate("/faculty");
    } else {
      navigate("/student");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{displayRole} Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-4 w-full max-w-sm" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${role} email`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
          {role !== "admin" && (
            <Link to={`/register/${role}`} className="text-blue-600 hover:text-blue-800">
              Create account
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
