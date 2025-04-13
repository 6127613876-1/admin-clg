import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/hackathon" className="text-blue-600 hover:underline">Hackathon</Link>
          <Link to="/company" className="text-blue-600 hover:underline">Company</Link>
          <Link to="/schedule" className="text-blue-600 hover:underline">Schedule</Link>
        </div>
      </div>
    </nav>
  );
}
