import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue, remove, update } from "firebase/database";

export default function CompanyManager() {
  const [companies, setCompanies] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const companyRef = ref(db, "companies");
    onValue(companyRef, snapshot => {
      setCompanies(snapshot.val() || {});
    });
  }, []);

  const handleDelete = (id) => {
    remove(ref(db, `companies/${id}`));
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setEditData(companies[id]);
  };

  const handleUpdate = () => {
    update(ref(db, `companies/${editingId}`), editData);
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Manage Companies</h2>
      {Object.entries(companies).map(([id, item]) => (
        <div key={id} className="bg-white shadow rounded-lg p-4 mb-4">
          {editingId === id ? (
            <>
              <input className="mb-2 w-full border p-2 rounded" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} />
              <input className="mb-2 w-full border p-2 rounded" value={editData.logo} onChange={e => setEditData({ ...editData, logo: e.target.value })} />
              <input className="mb-2 w-full border p-2 rounded" value={editData.role} onChange={e => setEditData({ ...editData, role: e.target.value })} />
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleUpdate}>Update</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.role}</p>
              <img src={item.logo} alt="logo" className="w-20 h-20 object-contain my-2" />
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
