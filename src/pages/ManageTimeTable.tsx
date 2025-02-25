import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

type TimeTableEntry = {
  id: string;
  subject_id: string;
  teacher_id: string;
  class_id: string;
  day: string;
  start_time: string;
  end_time: string;
};

type Subject = { id: string; name: string };
type Teacher = { id: string; full_name: string };
type Class = { id: string; class_name: string };

export default function TimeTable() {
  const [timetable, setTimetable] = useState<TimeTableEntry[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [classId, setClassId] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTimetable();
    fetchSubjects();
    fetchTeachers();
    fetchClasses();
  }, []);

  async function fetchTimetable() {
    const { data, error } = await supabase.from("timetable").select("*");
    if (error) console.error(error);
    else setTimetable(data || []);
  }

  async function fetchSubjects() {
    const { data, error } = await supabase
      .from("subjects")
      .select("id, subject_name, class_id, semester");
  
    if (error) {
      console.error("Error fetching subjects:", error);
    } else {
      console.log("Fetched Subjects:", data); // Debugging
  
      const formattedData = data.map((subject) => ({
        id: subject.id,
        name: subject.subject_name, 
        class_id: subject.class_id,
        semester: subject.semester,
      }));
  
      setSubjects(formattedData); 
    }
  }
  
  
  

  async function fetchTeachers() {
    const { data, error } = await supabase.from("profiles").select("id, full_name").eq("role", "teacher");
    if (error) console.error(error);
    else setTeachers(data || []);
  }

  async function fetchClasses() {
    const { data, error } = await supabase.from("classes").select("id, class_name");
    if (error) console.error(error);
    else setClasses(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subjectId || !teacherId || !classId || !day || !startTime || !endTime) return;

    if (editingId) {
      const { error } = await supabase
        .from("timetable")
        .update({ subject_id: subjectId, teacher_id: teacherId, class_id: classId, day, start_time: startTime, end_time: endTime })
        .eq("id", editingId);

      if (error) console.error(error);
      else setEditingId(null);
    } else {
      const { error } = await supabase.from("timetable").insert([
        { subject_id: subjectId, teacher_id: teacherId, class_id: classId, day, start_time: startTime, end_time: endTime }
      ]);
      if (error) console.error(error);
    }
    fetchTimetable();
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("timetable").delete().eq("id", id);
    if (error) console.error(error);
    fetchTimetable();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Time Table</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>{t.full_name}</option>
          ))}
        </select>
        <select value={classId} onChange={(e) => setClassId(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.class_name}</option>
          ))}
        </select>
        <input type="text" placeholder="Day" value={day} onChange={(e) => setDay(e.target.value)} className="w-full p-2 border rounded" />
        <input type="time" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full p-2 border rounded" />
        <input type="time" placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingId ? "Update" : "Add"} Entry</button>
      </form>
      <ul className="mt-6 space-y-2">
        {timetable.map((entry) => (
          <li key={entry.id} className="p-2 border rounded flex justify-between">
            <span>{entry.day}: {entry.start_time} - {entry.end_time}</span>
            <button onClick={() => handleDelete(entry.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
