import { Users, GraduationCap, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const RoleCard = ({ role, icon: Icon, title }: { role: 'admin' | 'faculty' | 'student', icon: any, title: string }) => (
    <button
      onClick={() => navigate(`/login/${role}`)}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200 space-y-4 w-full sm:w-64"
    >
      <Icon className="w-12 h-12 text-blue-600" />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm text-center">Click to login as {title}</p>
    </button>
  );

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Select Your Role</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        <RoleCard role="admin" icon={UserCog} title="Admin" />
        <RoleCard role="faculty" icon={Users} title="Faculty" />
        <RoleCard role="student" icon={GraduationCap} title="Student" />
      </div>
    </div>
  );
}