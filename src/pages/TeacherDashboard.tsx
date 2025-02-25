import { Link } from "react-router-dom";

const TeacherDashboard = () => {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <div className="mt-4">
          <Link to="/teacher/timetable" className="block py-2 text-blue-600">View Timetable</Link>
          <Link to="/teacher/request-change" className="block py-2 text-blue-600">Request Class Change</Link>
        </div>
      </div>
    );
  };

  export default TeacherDashboard; 