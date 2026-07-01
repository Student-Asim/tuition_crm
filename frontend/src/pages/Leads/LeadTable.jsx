import { useNavigate } from "react-router-dom";
import "./LeadTable.css";

function LeadTable({ leads }) {
  const navigate = useNavigate();

  return (
    <div className="lead-table-wrapper">
      <table className="lead-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Student</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              onClick={() => navigate(`/leads/${lead.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(`/leads/${lead.id}`);
                }
              }}
              tabIndex="0"
              role="button"
              className="clickable-row"
            >
              <td>{lead.lead_id || "-"}</td>
              <td>{lead.guardian_name || "-"}</td>
              <td>{lead.contact_number || "-"}</td>
              <td>{lead.student_name || "-"}</td>
              <td>{lead.status || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;