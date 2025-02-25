import { Link } from "react-router-dom";
const StudentDashboard = () => {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <div className="mt-4">
          <Link to="/student/timetable" className="block py-2 text-blue-600">View Timetable</Link>
        </div>
      </div>
    );
  };
  
  export default StudentDashboard; 
  