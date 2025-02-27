import { Route, Routes } from "react-router-dom";
import ManageClasses from "../pages/ManageClasses";
import ManageSubjects from "../pages/ManageSubjects";
import ManageTeachers from "../pages/ManageTeachers";
import ManageTimeTable from "../pages/Classlist";

const DashboardContent = () => {
  return (
    <div className="ml-64 p-6">
      <Routes>
        <Route path="/admin/classes" element={<ManageClasses />} />
        <Route path="/admin/subjects" element={<ManageSubjects />} />
        <Route path="/admin/teachers" element={<ManageTeachers />} />
        <Route path="/admin/classlist" element={<ManageTimeTable />} />
      </Routes>
    </div>
  );
};

export default DashboardContent;
