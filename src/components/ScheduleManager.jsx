import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue, remove, update } from "firebase/database";

export default function ScheduleManager() {
  const [schedule, setSchedule] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const scheduleRef = ref(db, "schedule");
    onValue(scheduleRef, snapshot => {
      setSchedule(snapshot.val() || {});
    });
  }, []);

  const handleDelete = (id) => {
    remove(ref(db, `schedule/${id}`));
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setEditData(schedule[id]);
  };

  const handleUpdate = () => {
    update(ref(db, `schedule/${editingId}`), editData);
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Manage Schedule</h2>
      {Object.entries(schedule).map(([id, item]) => (
        <div key={id} className="bg-white shadow rounded-lg p-4 mb-4">
          {editingId === id ? (
            <>
              <input className="mb-2 w-full border p-2 rounded" value={editData.time} onChange={e => setEditData({ ...editData, time: e.target.value })} />
              <input className="mb-2 w-full border p-2 rounded" value={editData.activity} onChange={e => setEditData({ ...editData, activity: e.target.value })} />
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleUpdate}>Update</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-lg">{item.time}</h3>
              <p className="text-sm text-gray-600">{item.activity}</p>
              <div>
                <button className="text-blue-600 mr-4" onClick={() => handleEdit(id)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
