import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/"); // Redirect to login
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
        Logout
      </button>
    </div>
  );
};

export default AdminHeader;
