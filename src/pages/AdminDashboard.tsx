import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-4">
        <Link to="/admin/classes" className="block py-2 text-blue-600">Manage Classes</Link>
        <Link to="/admin/subjects" className="block py-2 text-blue-600">Manage Subjects</Link>
        <Link to="/admin/teachers" className="block py-2 text-blue-600">Manage Teachers</Link>
        <Link to="/admin/classlist" className="block py-2 text-blue-600">Manage Timetable</Link>
      </div>
    </div>
  );
};

export default AdminDashboard; 
