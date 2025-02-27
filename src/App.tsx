import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import  { Register }   from './pages/Register';
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ManageClasses from "./pages/ManageClasses";
import ManageSubjects from "./pages/ManageSubjects";
import ManageTeachers from "./pages/ManageTeachers";
import ManageTimetable from "./pages/ManageTimeTable";
import ClassList from './pages/Classlist';
import {supabase} from "./lib/supabaseClient";
import { User } from "@supabase/supabase-js";
function App() {
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null); 
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login/:role" element={<Login />} />
          <Route path="register/:role" element={<Register />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/admin/classes" element={<ManageClasses />} />
          <Route path="/admin/subjects" element={<ManageSubjects />} />
          <Route path="/admin/teachers" element={<ManageTeachers />} />
          <Route path="/admin/timetable/:classId" element={<ManageTimetable />} />
          <Route path="/Faculty/*" element={<TeacherDashboard />} />
          <Route path="/student/*" element={<StudentDashboard />} />
          <Route path="/admin/classlist" element={<ClassList />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;