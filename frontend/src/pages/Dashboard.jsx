import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import LeadService from "../services/leadService";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    follow_up: 0,
    future: 0,
    converted: 0,
    lost: 0,
  });

  const [leads, setLeads] = useState([]);

  const loadStats = async () => {
    try {
      const res = await LeadService.getStats();
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  const loadLeads = async () => {
    try {
      const res = await api.get("/leads/");
      setLeads(res.data.results || []);
    } catch (error) {
      console.error("Failed to load leads:", error);
    }
  };

  useEffect(() => {
    loadStats();
    loadLeads();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-head">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">
          Welcome back. Here is your lead overview.
        </p>
      </div>

      <div className="dashboard-stats-grid">
        <DashboardCard title="Total Leads" value={stats.total} />
        <DashboardCard title="New Leads" value={stats.new} />
        <DashboardCard title="Contacted" value={stats.contacted} />
        <DashboardCard title="Follow Up" value={stats.follow_up} />
        <DashboardCard title="Future" value={stats.future} />
        <DashboardCard title="Converted" value={stats.converted} />
        <DashboardCard title="Lost" value={stats.lost} />
      </div>

      <div className="dashboard-table-section">
        <div className="dashboard-section-header">
          <h2>Recent Leads</h2>
        </div>

        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Guardian Name</th>
                <th>Student Name</th>
                <th>Contact Number</th>
                <th>Stage</th>
                <th>Platform</th>
              </tr>
            </thead>
            <tbody>
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.lead_id || "-"}</td>
                    <td>{lead.guardian_name || "-"}</td>
                    <td>{lead.student_name || "-"}</td>
                    <td>{lead.contact_number || "-"}</td>
                    <td>{lead.stage || "-"}</td>
                    <td>{lead.platform || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="dashboard-empty">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;