import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/teacher/timetable"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2"><Link to="/teacher/timetable">View Time Table</Link>
          </h2>
          <p className="text-gray-600">Check your class schedule and timetable.</p>
        </Link>
        <Link
          to="/teacher/request-change"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Request Class Change</h2>
          <p className="text-gray-600">Submit requests for class changes or adjustments.</p>
        </Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;