
import Navbar from "../components/Navbar";
import HackathonManager from "../components/HackathonManager";
import CompanyManager from "../components/CompanyManager";
import ScheduleManager from "../components/ScheduleManager";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="space-y-10">
        <Navbar/>
        <HackathonManager />
        <CompanyManager />
        <ScheduleManager />
      </div>
    </div>
  );
}
