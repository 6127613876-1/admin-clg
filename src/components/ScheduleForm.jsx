import { useState } from "react";
import { db } from "../../firebase";
import { ref, push } from "firebase/database";

export default function ScheduleForm() {
  const [data, setData] = useState({ time: "", activity: "" });

  const handleSubmit = e => {
    e.preventDefault();
    const scheduleRef = ref(db, "schedule");
    push(scheduleRef, data);
    setData({ time: "", activity: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mb-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Schedule Item</h2>
      <div className="space-y-4">
        <input
          className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Time (e.g. 10:00 AM)"
          value={data.time}
          onChange={e => setData({ ...data, time: e.target.value })}
          required
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Activity"
          value={data.activity}
          onChange={e => setData({ ...data, activity: e.target.value })}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition duration-200">
          Save Schedule
        </button>
      </div>
    </form>
  );
}
