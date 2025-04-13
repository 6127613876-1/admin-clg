import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HackathonPage from "./pages/HackathonPage";
import CompanyPage from "./pages/CompanyPage";
import SchedulePage from "./pages/SchedulePage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hackathon" element={<HackathonPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
}
