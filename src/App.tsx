import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ManageClasses from "./pages/ManageClasses";
import ManageSubjects from "./pages/ManageSubjects";
import ManageTeachers from "./pages/ManageTeachers";
import ManageTimetable from "./pages/ManageTimeTable";

function App() {
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
          <Route path="/admin/timetable" element={<ManageTimetable />} />
          <Route path="/teacher/*" element={<TeacherDashboard />} />
          <Route path="/student/*" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;