import { useEffect, useState } from "react";
import { ref, onValue, update, remove } from "firebase/database";
import { db } from "../../firebase";

export default function HackathonManager() {
  const [hackathons, setHackathons] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const hackathonRef = ref(db, "hackathons");
    onValue(hackathonRef, (snapshot) => {
      const data = snapshot.val() || {};
      const formatted = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
        bannerUrl: data[key].image, // map Firebase "image" to "bannerUrl"
        displayedDate: data[key].date, // map Firebase "date" to "displayedDate"
      }));
      setHackathons(formatted);
    });
  }, []);

  const handleEdit = (hackathon) => {
    setEditId(hackathon.id);
    setEditData(hackathon);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  const handleUpdate = () => {
    update(ref(db, `hackathons/${editId}`), editData);
    setEditId(null);
    setEditData({});
  };

  const handleDelete = (id) => {
    remove(ref(db, `hackathons/${id}`));
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Manage Hackathons</h2>
      {hackathons.map((hackathon) => (
        <div key={hackathon.id} className="mb-6 bg-white p-4 rounded shadow">
          {editId === hackathon.id ? (
            <div>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
              />
              <input
                type="text"
                value={editData.bannerUrl}
                onChange={(e) => setEditData({ ...editData, bannerUrl: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
                placeholder="Banner Image URL"
              />
              <input
                type="text"
                value={editData.displayedDate}
                onChange={(e) => setEditData({ ...editData, displayedDate: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
                placeholder="Displayed Date"
              />
              <input
                type="text"
                value={editData.registrationStart}
                onChange={(e) => setEditData({ ...editData, registrationStart: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
                placeholder="Registration Start Date"
              />
              <input
                type="text"
                value={editData.startDate}
                onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
                placeholder="Hackathon Start Date"
              />
              <input
                type="text"
                value={editData.endDate}
                onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
                placeholder="Hackathon End Date"
              />
              <input
                type="text"
                value={editData.themes}
                onChange={(e) => setEditData({ ...editData, themes: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
                placeholder="Themes (comma separated)"
              />
              <input
                type="text"
                value={editData.prizes}
                onChange={(e) => setEditData({ ...editData, prizes: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
                placeholder="Prizes (comma separated)"
              />

              <div className="flex gap-2">
                <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Update
                </button>
                <button onClick={handleCancel} className="bg-gray-600 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold">{hackathon.title}</h3>
              <p className="text-gray-700 mb-2">{hackathon.description}</p>
              {/* Display the banner image */}
              {hackathon.bannerUrl && (
                <img src={hackathon.bannerUrl} alt={hackathon.title} className="w-96 h-96 mb-2 rounded" />
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(hackathon)}
                  className="text-blue-600 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(hackathon.id)}
                  className="text-red-600 mr-4"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
