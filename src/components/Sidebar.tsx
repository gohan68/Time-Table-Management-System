import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Book, Users, Calendar } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Manage Classes", path: "/admin/classes", icon: <Book className="w-5 h-5" /> },
    { name: "Manage Subjects", path: "/admin/subjects", icon: <Book className="w-5 h-5" /> },
    { name: "Manage Teachers", path: "/admin/teachers", icon: <Users className="w-5 h-5" /> },
    { name: "Time Table", path: "/admin/timetable", icon: <Calendar className="w-5 h-5" /> }
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6 fixed">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.path} className={`p-2 rounded-md ${location.pathname === item.path ? "bg-blue-500" : "hover:bg-gray-700"}`}>
            <Link to={item.path} className="flex items-center gap-3">
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
