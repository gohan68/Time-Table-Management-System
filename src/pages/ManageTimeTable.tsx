import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const ManageTimeTable = () => {
    const [timeTable, setTimeTable] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedDay, setSelectedDay] = useState('DAY I');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('1:10 PM - 2:05 PM');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');

    useEffect(() => {
        fetchSubjects();
        fetchTeachers();
        fetchClasses();
        fetchTimeTable();
    }, []);

    const fetchSubjects = async () => {
        const { data, error } = await supabase.from('subjects').select('id, subject_name');
        if (error) console.error('Error fetching subjects:', error);
        else setSubjects(data || []);
    };

    const fetchTeachers = async () => {
        const { data, error } = await supabase.from('profiles').select('id, full_name').eq('role', 'faculty');
        if (error) console.error('Error fetching teachers:', error);
        else setTeachers(data || []);
    };

    const fetchClasses = async () => {
        const { data, error } = await supabase.from('classes').select('*');
        if (error) console.error('Error fetching classes:', error);
        else setClasses(data || []);
    };

    const fetchTimeTable = async () => {
        const { data, error } = await supabase
            .from('time_table')
            .select('*, classes(class_name), subjects(subject_name), profiles(full_name)');
        if (error) console.error('Error fetching timetable:', error);
        else setTimeTable(data || []);
    };

    const handleAddTimeTable = async () => {
        if (!selectedClass || !selectedYear || !selectedSubject || !selectedTeacher || !selectedDay || !selectedTimeSlot) {
            alert('Please select all fields before adding.');
            return;
        }

        const { data: existingEntry } = await supabase
            .from('timetable')
            .select('*')
            .eq('class_id', selectedClass)
            .eq('day', selectedDay)
            .eq('time_slot', selectedTimeSlot)
            .single();

        if (existingEntry) {
            alert('A timetable entry already exists for this class, day, and time slot.');
            return;
        }

        const { error } = await supabase.from('timetable').insert([
            { class_id: selectedClass, year: selectedYear, day: selectedDay, time_slot: selectedTimeSlot, subject_id: selectedSubject, teacher_id: selectedTeacher }
        ]);
        if (error) console.error('Error adding timetable:', error);
        else fetchTimeTable();
    };

    const handleDeleteTimeTable = async (id) => {
        const { error } = await supabase.from('timetable').delete().eq('id', id);
        if (error) console.error('Error deleting timetable:', error);
        else fetchTimeTable();
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center mb-4 bg-primary text-white p-2 rounded-md">Add Time Table</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Class</label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                        <option value="">Select Class</option>
                        {classes.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.class_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Year</label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value="">Select Year</option>
                        {['1st Year', '2nd Year', '3rd Year'].map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Day</label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                        {['DAY I', 'DAY II', 'DAY III', 'DAY IV', 'DAY V', 'DAY VI'].map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Time Slot</label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)}>
                        {['1:10 PM - 2:05 PM', '2:05 PM - 3:00 PM', '3:00 PM - 5:55 PM', '4:15 PM - 5:10 PM', '5:10 PM - 6:05 PM'].map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Subject</label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        <option value="">Select Subject</option>
                        {subjects.map(subject => (
                            <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Teacher</label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                        <option value="">Select Teacher</option>
                        {teachers.map(teacher => (
                            <option key={teacher.id} value={teacher.id}>{teacher.full_name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md" onClick={handleAddTimeTable}>
                Add
            </button>

            <h2 className="text-xl font-bold text-center mt-6">Time Table</h2>
            <table className="w-full mt-4 border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Class</th>
                        <th className="border border-gray-300 p-2">Day</th>
                        <th className="border border-gray-300 p-2">Time Slot</th>
                        <th className="border border-gray-300 p-2">Subject</th>
                        <th className="border border-gray-300 p-2">Teacher</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {timeTable.map((entry) => (
                        <tr key={entry.id}>
                            <td className="border border-gray-300 p-2">{entry.classes.class_name}</td>
                            <td className="border border-gray-300 p-2">{entry.day}</td>
                            <td className="border border-gray-300 p-2">{entry.time_slot}</td>
                            <td className="border border-gray-300 p-2">{entry.subjects.subject_name}</td>
                            <td className="border border-gray-300 p-2">{entry.profiles.full_name}</td>
                            <td className="border border-gray-300 p-2">
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                                    onClick={() => handleDeleteTimeTable(entry.id)}
                                >
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

export default ManageTimeTable;