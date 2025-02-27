import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

type Teacher = {
  id: string;
  full_name: string;
  email: string;
};

export default function Teacher() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  async function fetchTeachers() {
    const { data, error } = await supabase.from("profiles").select("id, full_name, email").eq("role", "faculty");
    if (error) console.error(error);
    else setTeachers(data || []);
  }

  async function handleEdit(teacher: Teacher) {
    setEditingId(teacher.id);
    setName(teacher.full_name);
    setEmail(teacher.email);
  }

  async function handleUpdateTeacher(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !editingId) return;

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: name, email })
      .eq("id", editingId);

    if (error) console.error(error);
    else setEditingId(null);
    
    setName("");
    setEmail("");
    fetchTeachers();
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Teacher Management</h1>
      {editingId && (
        <form onSubmit={handleUpdateTeacher} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Teacher
          </button>
        </form>
      )}
      <ul className="mt-6 space-y-2">
        {teachers.map((teacher) => (
          <li key={teacher.id} className="p-2 border rounded flex justify-between">
            <span>{teacher.full_name} ({teacher.email})</span>
            <button onClick={() => handleEdit(teacher)} className="text-blue-500 mr-2">Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
