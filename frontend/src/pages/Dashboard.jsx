import { useEffect, useMemo, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [range, setRange] = useState("daily");
  const [allLeads, setAllLeads] = useState([]);
  const [openFollowupModal, setOpenFollowupModal] = useState(null);

  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    total_revenue: 0,
    follow_up: 0,
    converted: 0,
    lost: 0,
    daily_follow_up: 0,
    total_follow_up: 0,
    overdue_follow_up: 0,
    daily_follow_up_leads: [],
    total_follow_up_leads: [],
    overdue_follow_up_leads: [],
  });

  const loadStats = async (selectedRange = "daily") => {
    try {
      const res = await api.get(`/leads/stats/?range=${selectedRange}`);
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  const loadLeads = async () => {
    try {
      const res = await api.get("/leads/");
      setAllLeads(res.data.results || res.data || []);
    } catch (error) {
      console.error("Failed to load leads:", error);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    loadStats(range);
  }, [range]);

  const filteredLeads = useMemo(() => {
    const now = new Date();

    return allLeads.filter((lead) => {
      if (!lead.created_at) return false;

      const createdAt = new Date(lead.created_at);

      if (range === "daily") {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        return createdAt >= startOfDay;
      }

      if (range === "weekly") {
        const startOfWeek = new Date();
        const day = startOfWeek.getDay();
        const diff = day === 0 ? 6 : day - 1;
        startOfWeek.setDate(startOfWeek.getDate() - diff);
        startOfWeek.setHours(0, 0, 0, 0);
        return createdAt >= startOfWeek;
      }

      if (range === "monthly") {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);
        return createdAt >= startOfMonth;
      }

      return true;
    });
  }, [allLeads, range]);

  const followupLeads =
    openFollowupModal === "daily"
      ? stats.daily_follow_up_leads || []
      : openFollowupModal === "overdue"
      ? stats.overdue_follow_up_leads || []
      : stats.total_follow_up_leads || [];

  const followupModalTitle =
    openFollowupModal === "daily"
      ? "Today's Follow Up Leads"
      : openFollowupModal === "overdue"
      ? "Overdue Follow Up Leads"
      : "Total Follow Up Leads";

  return (
    <div className="dashboard-page">
      <div className="dashboard-head">
        <div className="dashboard-head-left">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back. Here is your lead overview.
          </p>
        </div>

        <div className="dashboard-head-right">
          <div className="dashboard-filter">
            <button
              className={range === "daily" ? "active" : ""}
              onClick={() => setRange("daily")}
            >
              Daily
            </button>
            <button
              className={range === "weekly" ? "active" : ""}
              onClick={() => setRange("weekly")}
            >
              Weekly
            </button>
            <button
              className={range === "monthly" ? "active" : ""}
              onClick={() => setRange("monthly")}
            >
              Monthly
            </button>
          </div>

          <div className="dashboard-followup-grid">
            <div
              className="dashboard-followup-highlight"
              onClick={() => setOpenFollowupModal("daily")}
            >
              <span className="followup-label">Daily Follow Up</span>

              <span className="followup-value">
                {stats.daily_follow_up || 0}

                {Number(stats.overdue_follow_up) > 0 && (
                  <span
                    className="followup-overdue-count"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenFollowupModal("overdue");
                    }}
                    title="View overdue follow-ups"
                  >
                    ({stats.overdue_follow_up})
                  </span>
                )}
              </span>
            </div>

            <div
              className="dashboard-followup-highlight secondary"
              onClick={() => setOpenFollowupModal("total")}
            >
              <span className="followup-label">Total Follow Up</span>
              <span className="followup-value">{stats.total_follow_up || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-stats-grid">
        <DashboardCard title="Total Leads" value={stats.total} />
        <DashboardCard title="New Leads" value={stats.new} />
        <DashboardCard title="Contacted" value={stats.contacted} />
        <DashboardCard
          title="Total Revenue"
          value={`Rs. ${Number(stats.total_revenue || 0).toLocaleString()}`}
        />
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
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
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

      {openFollowupModal && (
        <div
          className="followup-modal-overlay"
          onClick={() => setOpenFollowupModal(null)}
        >
          <div
            className="followup-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="followup-modal-header">
              <h2>{followupModalTitle}</h2>
              <button onClick={() => setOpenFollowupModal(null)}>×</button>
            </div>

            <div className="followup-modal-body">
              {followupLeads.length > 0 ? (
                <table className="followup-table">
                  <thead>
                    <tr>
                      <th>Lead ID</th>
                      <th>Guardian</th>
                      <th>Student</th>
                      <th>Contact</th>
                      <th>Subject</th>
                      <th>Location</th>
                      <th>Follow Up Date</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {followupLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td>{lead.lead_id || "-"}</td>
                        <td>{lead.guardian_name || "-"}</td>
                        <td>{lead.student_name || "-"}</td>
                        <td>{lead.contact_number || "-"}</td>
                        <td>{lead.subjects || "-"}</td>
                        <td>{lead.location || "-"}</td>
                        <td>{lead.follow_up_date || "-"}</td>
                        <td>{lead.remarks || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="dashboard-empty">No follow-up leads found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;