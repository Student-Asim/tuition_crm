import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LeadService from "../../services/leadService";

function LeadDetail() {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [formData, setFormData] = useState({
    guardian_name: "",
    contact_number: "",
    student_name: "",
    status: "",
  });
  const [comment, setComment] = useState("");
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadLead();
  }, [id]);

  const loadLead = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await LeadService.getLead(id);
      setLead(res.data);

      setFormData({
        guardian_name: res.data.guardian_name || "",
        contact_number: res.data.contact_number || "",
        student_name: res.data.student_name || "",
        status: res.data.status || "",
      });
    } catch (err) {
      console.error("Lead detail error:", err.response?.data || err.message);
      setError("Failed to load lead details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveLead = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const res = await LeadService.updateLead(id, formData);
      setLead(res.data);
      setSuccess("Lead updated successfully.");
    } catch (err) {
      console.error("Lead update error:", err.response?.data || err.message);
      setError("Failed to update lead.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;

    const newLog = {
      id: Date.now(),
      text: comment,
      created_at: new Date().toLocaleString(),
    };

    setCallLogs([newLog, ...callLogs]);
    setComment("");
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading lead details...</p>;
  if (error && !lead) return <p style={{ padding: "20px" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/leads">← Back to Leads</Link>
      </div>

      <div
        style={{
          background: "#111827",
          color: "#e5e7eb",
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "20px" }}>Lead Detail</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          <div>
            <label>Guardian Name</label>
            <input
              type="text"
              name="guardian_name"
              value={formData.guardian_name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Student Name</label>
            <input
              type="text"
              name="student_name"
              value={formData.student_name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={handleSaveLead} style={primaryBtn} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {success && <p style={{ color: "#86efac", marginTop: "12px" }}>{success}</p>}
        {error && <p style={{ color: "#fca5a5", marginTop: "12px" }}>{error}</p>}
      </div>

      <div
        style={{
          background: "#111827",
          color: "#e5e7eb",
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Call Logs / Comments</h2>

        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write call note or comment..."
          style={{
            ...inputStyle,
            minHeight: "100px",
            resize: "vertical",
          }}
        />

        <div style={{ marginTop: "12px" }}>
          <button onClick={handleAddComment} style={primaryBtn}>
            Add Comment
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          {callLogs.length === 0 ? (
            <p>No call logs yet.</p>
          ) : (
            callLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  border: "1px solid #374151",
                  borderRadius: "10px",
                  padding: "12px",
                  marginBottom: "12px",
                  background: "#1f2937",
                }}
              >
                <p style={{ margin: 0 }}>{log.text}</p>
                <small style={{ color: "#9ca3af" }}>{log.created_at}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: "6px",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #374151",
  background: "#1f2937",
  color: "#fff",
};

const primaryBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default LeadDetail;