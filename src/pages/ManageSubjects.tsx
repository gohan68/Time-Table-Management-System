import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface SubjectData {
  id: number;
  subject_name: string;
}

const ManageSubjects = () => {
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null); // For confirmation messages

  useEffect(() => {
    const fetchSubjects = async () => {
      const { data, error } = await supabase.from("subjects").select("*");
      if (!error) setSubjects(data as SubjectData[]);
    };

    fetchSubjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName) {
      alert("Please enter a subject name.");
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from("subjects")
        .update({ subject_name: subjectName })
        .eq("id", editingId);

      if (!error) {
        setSubjects(subjects.map(sub => (sub.id === editingId ? { ...sub, subject_name: subjectName } : sub)));
        setEditingId(null);
        setConfirmationMessage("Subject updated successfully!"); // Confirmation message
      }
    } else {
      // Insert new subject
      const { data, error } = await supabase
        .from("subjects")
        .insert([{ subject_name: subjectName }])
        .select();

      if (error) {
        console.error("Insert Error:", error);
        alert("Error adding subject: " + error.message);
        return;
      }

      if (data) {
        setSubjects([...subjects, ...data as SubjectData[]]);
        setConfirmationMessage("Subject added successfully!"); // Confirmation message
      }
    }

    setSubjectName("");

    // Clear the confirmation message after 3 seconds
    setTimeout(() => {
      setConfirmationMessage(null);
    }, 3000);
  };

  const handleEdit = (subject: SubjectData) => {
    setEditingId(subject.id);
    setSubjectName(subject.subject_name);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("subjects").delete().eq("id", id);
    if (!error) setSubjects(subjects.filter(sub => sub.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Subjects</h1>

      {/* Confirmation Message */}
      {confirmationMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {confirmationMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Subject Name (e.g., Software Engineering)"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Subject" : "Add Subject"}
        </button>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Subject Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id} className="border-b">
              <td className="border p-2">{subject.subject_name}</td>
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