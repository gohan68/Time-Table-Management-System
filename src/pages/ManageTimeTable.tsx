import React, { useState } from 'react';

const ManageTimeTable = () => {
    const [timeTable, setTimeTable] = useState([
        { timeSlot: '9:00 AM - 10:00 AM', monday: 'NA', tuesday: 'NA', wednesday: 'NA', thursday: 'NA', friday: 'NA' },
        { timeSlot: '10:00 AM - 11:00 AM', monday: 'NA', tuesday: 'NA', wednesday: 'NA', thursday: 'NA', friday: 'NA' },
        { timeSlot: '11:00 AM - 12:00 PM', monday: 'NA', tuesday: 'NA', wednesday: 'NA', thursday: 'NA', friday: 'NA' },
        { timeSlot: '12:00 PM - 1:00 PM', monday: 'NA', tuesday: 'NA', wednesday: 'NA', thursday: 'NA', friday: 'NA' },
        { timeSlot: '1:00 PM - 2:00 PM', monday: 'NA', tuesday: 'NA', wednesday: 'NA', thursday: 'NA', friday: 'NA' },
    ]);
    
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('9:00 AM - 10:00 AM');
    const [selectedCourse, setSelectedCourse] = useState('Mathematics');
    const [selectedTeacher, setSelectedTeacher] = useState('Mr. Smith');

    const handleAddTimeTable = () => {
        setTimeTable(prevTimeTable => 
            prevTimeTable.map(row => 
                row.timeSlot === selectedTimeSlot 
                    ? { ...row, [selectedDay.toLowerCase()]: `${selectedCourse} - ${selectedTeacher}` } 
                    : row
            )
        );
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center mb-4 bg-primary text-white p-2 rounded-md">Add Time Table</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Day</label>
                    <select 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                        value={selectedDay} 
                        onChange={(e) => setSelectedDay(e.target.value)}
                    >
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Time Slot</label>
                    <select 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={selectedTimeSlot} 
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    >
                        <option>9:00 AM - 10:00 AM</option>
                        <option>10:00 AM - 11:00 AM</option>
                        <option>11:00 AM - 12:00 PM</option>
                        <option>12:00 PM - 1:00 PM</option>
                        <option>1:00 PM - 2:00 PM</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Course</label>
                    <select 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={selectedCourse} 
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Computer Science</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Teacher</label>
                    <select 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={selectedTeacher} 
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                    >
                        <option>Mr. Smith</option>
                        <option>Ms. Johnson</option>
                        <option>Dr. Brown</option>
                    </select>
                </div>
            </div>
            <button 
                className="mt-4 w-full bg-primary text-white p-2 rounded-md" 
                onClick={handleAddTimeTable}
            >
                Add
            </button>
            <h2 className="text-xl font-bold text-center my-4 bg-primary text-white p-2 rounded-md">Time Table</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-primary text-white">
                        <th className="border border-gray-300 p-2">Time Slot \ Day</th>
                        <th className="border border-gray-300 p-2">Monday</th>
                        <th className="border border-gray-300 p-2">Tuesday</th>
                        <th className="border border-gray-300 p-2">Wednesday</th>
                        <th className="border border-gray-300 p-2">Thursday</th>
                        <th className="border border-gray-300 p-2">Friday</th>
                    </tr>
                </thead>
                <tbody>
                    {timeTable.map((row, index) => (
                        <tr key={index} className="text-center">
                            <td className="border border-gray-300 p-2">{row.timeSlot}</td>
                            <td className="border border-gray-300 p-2">{row.monday}</td>
                            <td className="border border-gray-300 p-2">{row.tuesday}</td>
                            <td className="border border-gray-300 p-2">{row.wednesday}</td>
                            <td className="border border-gray-300 p-2">{row.thursday}</td>
                            <td className="border border-gray-300 p-2">{row.friday}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageTimeTable;
