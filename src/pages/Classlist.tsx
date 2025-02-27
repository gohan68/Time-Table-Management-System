import { useState, useEffect } from "react";  // <-- Add useEffect here
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const ClassList = () => {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        const { data, error } = await supabase.from("classes").select("*");
        if (error) console.error("Error fetching classes:", error);
        else setClasses(data || []);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center mb-4 bg-primary text-white p-2 rounded-md">Class List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map(cls => (
                    <div key={cls.id} className="p-4 border rounded-md shadow-md bg-gray-100 text-center">
                        <h3 className="text-lg font-semibold">{cls.class_name}</h3>
                        <button
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                            onClick={() => navigate(`/admin/timetable/${cls.id}`)}
                        >
                            View/Edit Time Table
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassList;
