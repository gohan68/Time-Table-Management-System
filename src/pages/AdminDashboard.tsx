import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          to="/admin/classes" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Manage Classes</h2>
          <p className="text-gray-600">View and manage all classes in the system.</p>
        </Link>
        <Link 
          to="/admin/subjects" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Manage Subjects</h2>
          <p className="text-gray-600">View and manage all subjects in the system.</p>
        </Link>
        <Link 
          to="/admin/teachers" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Manage Teachers</h2>
          <p className="text-gray-600">View and manage all teachers in the system.</p>
        </Link>
        <Link 
          to="/admin/classlist" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Manage Timetable</h2>
          <p className="text-gray-600">View and manage the timetable for all classes.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;