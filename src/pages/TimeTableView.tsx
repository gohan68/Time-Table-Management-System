import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useParams } from "react-router-dom";

type TimeTableEntry = {
  id: string;
  day: string;
  time_slot: string;
  subject_name: string;
  teacher_name: string;
};

export default function TimeTableView() {
  const { role } = useParams<{ role: string }>();
  const [timetable, setTimetable] = useState<TimeTableEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [classId, setClassId] = useState<string | null>(null);
  const [teacherId, setTeacherId] = useState<string | null>(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  async function fetchUserDetails() {
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) throw new Error("User not found");
      setUserId(user.id);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("class_id, id")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) throw new Error("Profile not found");

      if (role === "student") {
        setClassId(profile.class_id);
        fetchTimeTable(profile.class_id, null);
      } else if (role === "faculty") {
        setTeacherId(profile.id);
        fetchTimeTable(null, profile.id);
      }
    } catch (err) {
      setError("Failed to fetch user details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTimeTable(classId: string | null, teacherId: string | null) {
    if (!classId && !teacherId) return;

    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("time_table")
        .select(`
          id, day, time_slot, 
          subjects(subject_name), 
          profiles(full_name)
        `);

      if (classId) {
        query = query.eq("class_id", classId);
      } else if (teacherId) {
        query = query.eq("teacher_id", teacherId);
      }

      const { data, error } = await query;

      if (error) throw error;

      const formattedData = data.map((entry) => ({
        id: entry.id,
        day: entry.day,
        time_slot: entry.time_slot,
        subject_name: entry.subjects.subject_name,
        teacher_name: entry.profiles.full_name,
      }));

      setTimetable(formattedData);
    } catch (err) {
      setError("Failed to fetch timetable.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {role === "student" ? "Your Class Timetable" : "Your Teaching Schedule"}
      </h1>

      {loading ? (
        <p>Loading timetable...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : timetable.length === 0 ? (
        <p>No timetable available.</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4">Day</th>
              <th className="py-2 px-4">Time Slot</th>
              <th className="py-2 px-4">Subject</th>
              <th className="py-2 px-4">Teacher</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((entry) => (
              <tr key={entry.id} className="border-b">
                <td className="py-2 px-4">{entry.day}</td>
                <td className="py-2 px-4">{entry.time_slot}</td>
                <td className="py-2 px-4">{entry.subject_name}</td>
                <td className="py-2 px-4">{entry.teacher_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
