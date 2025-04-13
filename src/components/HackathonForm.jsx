import { useState } from "react";
import { db } from "../../firebase";
import { ref, push } from "firebase/database";

export default function HackathonForm() {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    registrationStart: "",
    startDate: "",
    endDate: "",
    themes: "",
    prizes: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...data,
      themes: data.themes.split(",").map((t) => t.trim()),
      prizes: data.prizes.split(",").map((p) => p.trim()),
    };

    const hackathonRef = ref(db, "hackathons");
    push(hackathonRef, formattedData);
    setData({
      title: "",
      description: "",
      image: "",
      date: "",
      registrationStart: "",
      startDate: "",
      endDate: "",
      themes: "",
      prizes: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto mb-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add Hackathon</h2>

      {[ 
        { name: "title", type: "text", placeholder: "Hackathon Title" },
        { name: "description", type: "textarea", placeholder: "Hackathon Description" },
        { name: "image", type: "text", placeholder: "Banner Image URL" },
        { name: "date", type: "text", placeholder: "Displayed Date (e.g. April 20 - 22, 2025)" },
        { name: "registrationStart", type: "date", placeholder: "Registration Start Date" },
        { name: "startDate", type: "date", placeholder: "Hackathon Start Date" },
        { name: "endDate", type: "date", placeholder: "Hackathon End Date" },
        { name: "themes", type: "text", placeholder: "Themes (comma-separated)" },
        { name: "prizes", type: "text", placeholder: "Prizes (comma-separated)" },
      ].map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block font-semibold text-gray-700 mb-2">
            {field.placeholder}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={data[field.name]}
              onChange={handleChange}
              required={field.name === "title" || field.name === "description"}
              className="block w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={data[field.name]}
              onChange={handleChange}
              required={field.name === "title" || field.name === "description"}
              className="block w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      ))}
      
      <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition duration-200">
        Save Hackathon
      </button>
    </form>
  );
}
