import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// Define a Type for Class Data
interface ClassData {
  id: number;
  class_name: string;
  batch: string;
  academic_year: string;
}

const ManageClasses = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [className, setClassName] = useState("");
  const [batch, setBatch] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch Classes from Supabase
  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase.from("classes").select("*");
      if (error) {
        console.error("Error fetching classes:", error);
      } else {
        setClasses(data as ClassData[]);
      }
    };

    fetchClasses();
  }, []);

  // Add or Update Class
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!className || !batch || !academicYear) {
      alert("All fields are required!");
      return;
    }

    if (editingId) {
      // Update existing class
      const { error } = await supabase
        .from("classes")
        .update({ class_name: className, batch, academic_year: academicYear })
        .eq("id", editingId);

      if (!error) {
        setClasses(classes.map(cls => (cls.id === editingId ? { ...cls, class_name: className, batch, academic_year: academicYear } : cls)));
        setEditingId(null);
      }
    } else {
      // Insert new class
      const { data, error } = await supabase
        .from("classes")
        .insert([{ class_name: className, batch, academic_year: academicYear }])
        .select();

      if (data) {
        setClasses([...classes, ...data as ClassData[]]);
      }
    }

    setClassName("");
    setBatch("");
    setAcademicYear("");
  };

  // Edit Class
  const handleEdit = (cls: ClassData) => {
    setEditingId(cls.id);
    setClassName(cls.class_name);
    setBatch(cls.batch);
    setAcademicYear(cls.academic_year);
  };

  // Delete Class
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("classes").delete().eq("id", id);
    if (!error) {
      setClasses(classes.filter(cls => cls.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Classes</h1>

      {/* Add / Edit Class Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Class Name (e.g., Class I A)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Batch (e.g., 2024-2025)"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Academic Year (e.g., 2024-2025)"
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Class" : "Add Class"}
        </button>
      </form>

      {/* Display Classes */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Class Name</th>
            <th className="border p-2">Batch</th>
            <th className="border p-2">Academic Year</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id} className="border-b">
              <td className="border p-2">{cls.class_name}</td>
              <td className="border p-2">{cls.batch}</td>
              <td className="border p-2">{cls.academic_year}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(cls)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(cls.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClasses;
