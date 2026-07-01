import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LeadService from "../../services/leadService";
import LeadTable from "../../components/LeadTable";
import SearchBar from "../../components/SearchBar";
import "./LeadList.css";

function LeadList() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await LeadService.getAllLeads();
      const leadData = res.data.results || res.data || [];

      setLeads(Array.isArray(leadData) ? leadData : []);
    } catch (err) {
      console.error("Lead fetch error:", err.response?.data || err.message);
      setError("Failed to load leads.");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.guardian_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.contact_number?.includes(search) ||
      lead.student_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.lead_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="lead-page">
      <div className="lead-hero">
        <h1 className="lead-title">Lead Management</h1>
        <p className="lead-subtitle">
          Track incoming enquiries, follow-ups, and conversion progress.
        </p>
        <p className="lead-description">
          Use this page to review lead details, search by guardian or student name,
          and monitor each lead through different stages of the admission and tutor assignment process.
        </p>

        <Link to="/leads/create" className="lead-add-link">
          <button className="lead-add-btn">Add Lead</button>
        </Link>
      </div>

      <div className="lead-toolbar">
        <div className="lead-search-wrap">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="lead-table-section">
        {loading ? (
          <p className="lead-message">Loading leads...</p>
        ) : error ? (
          <p className="lead-message error">{error}</p>
        ) : filteredLeads.length > 0 ? (
          <div className="lead-table-wrap">
            <LeadTable leads={filteredLeads} />
          </div>
        ) : (
          <p className="lead-message">No leads found.</p>
        )}
      </div>
    </div>
  );
}

export default LeadList;