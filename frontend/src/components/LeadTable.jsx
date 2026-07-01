import { useNavigate } from "react-router-dom";
import "./LeadTable.css";

function LeadTable({ leads }) {
  const navigate = useNavigate();

  return (
    <div className="lead-table-wrapper">
      <table className="lead-table">
        <thead>
          <tr>
            <th>Lead ID</th>
            <th>Guardian</th>
            <th>Student</th>
            <th>Contact</th>
            <th>Stage</th>
            <th>Platform</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              onClick={() => navigate(`/leads/${lead.id}`)}
              className="lead-row"
            >
              <td>{lead.lead_id || "-"}</td>
              <td>{lead.guardian_name || "-"}</td>
              <td>{lead.student_name || "-"}</td>
              <td>{lead.contact_number || "-"}</td>
              <td>{lead.stage || lead.status || "-"}</td>
              <td>{lead.platform || "-"}</td>
              <td>
                <span
                  className="lead-view-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/leads/${lead.id}`);
                  }}
                >
                  View
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;