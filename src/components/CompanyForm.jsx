import { useState } from "react";
import { db } from "../../firebase";
import { ref, push } from "firebase/database";

export default function CompanyForm() {
  const [data, setData] = useState({ name: "", logo: "", role: "" });

  const handleSubmit = e => {
    e.preventDefault();
    const companyRef = ref(db, "companies");
    push(companyRef, data);
    setData({ name: "", logo: "", role: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mb-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Company</h2>
      <div className="space-y-4">
        <input
          className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Company Name"
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
          required
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Logo URL"
          value={data.logo}
          onChange={e => setData({ ...data, logo: e.target.value })}
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Role (e.g. Sponsor)"
          value={data.role}
          onChange={e => setData({ ...data, role: e.target.value })}
        />
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition duration-200">
          Save Company
        </button>
      </div>
    </form>
  );
}
