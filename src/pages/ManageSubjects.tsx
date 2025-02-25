import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// Define Type for Subjects & Classes
interface SubjectData {
  id: number;
  subject_name: string;
  class_id: number;
}

interface ClassData {
  id: number;
  class_name: string;
}

const ManageSubjects = () => {
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [classId, setClassId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch Subjects & Classes from Supabase
  useEffect(() => {
    const fetchSubjects = async () => {
      const { data, error } = await supabase.from("subjects").select("*");
      if (!error) setSubjects(data as SubjectData[]);
    };

    const fetchClasses = async () => {
      const { data, error } = await supabase.from("classes").select("id, class_name");
      if (!error) setClasses(data as ClassData[]);
    };

    fetchSubjects();
    fetchClasses();
  }, []);

  // Add or Update Subject
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName || !classId) {
      alert("Please enter subject name and select a class.");
      return;
    }

    if (editingId) {
      // Update existing subject
      const { error } = await supabase
        .from("subjects")
        .update({ subject_name: subjectName, class_id: classId })
        .eq("id", editingId);

      if (!error) {
        setSubjects(subjects.map(sub => (sub.id === editingId ? { ...sub, subject_name: subjectName, class_id: classId } : sub)));
        setEditingId(null);
      }
    } else {
      // Insert new subject
      const { data, error } = await supabase
        .from("subjects")
        .insert([{ subject_name: subjectName, class_id: classId }])
        .select();

      if (data) {
        setSubjects([...subjects, ...data as SubjectData[]]);
      }
    }

    setSubjectName("");
    setClassId(null);
  };

  // Edit Subject
  const handleEdit = (subject: SubjectData) => {
    setEditingId(subject.id);
    setSubjectName(subject.subject_name);
    setClassId(subject.class_id);
  };

  // Delete Subject
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("subjects").delete().eq("id", id);
    if (!error) setSubjects(subjects.filter(sub => sub.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Subjects</h1>

      {/* Add / Edit Subject Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Subject Name (e.g., Software Engineering)"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          value={classId ?? ""}
          onChange={(e) => setClassId(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>Select Class</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>
              {cls.class_name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Subject" : "Add Subject"}
        </button>
      </form>

      {/* Display Subjects */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Subject Name</th>
            <th className="border p-2">Assigned Class</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id} className="border-b">
              <td className="border p-2">{subject.subject_name}</td>
              <td className="border p-2">
                {classes.find(cls => cls.id === subject.class_id)?.class_name || "Unknown"}
              </td>
              <td className="border p-2">
                <button onClick={() => handleEdit(subject)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(subject.id)} className="bg-red-500 text-white px-2 py-1 rounded">
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

export default ManageSubjects;
