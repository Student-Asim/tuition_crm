import { useEffect, useState } from "react";
import ActivityService from "../../services/activityService";
import "./ActivityList.css";
function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await ActivityService.getAllActivities();
      console.log("Activities API response:", res.data);

      const activityData = res.data.results || res.data || [];
      setActivities(Array.isArray(activityData) ? activityData : []);
    } catch (error) {
      console.error("Activities fetch error:", error.response?.data || error.message);
      console.error("Activities status:", error.response?.status);

      setError("Failed to load activities.");
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (value) => {
    if (!value) return "-";
    try {
      return new Intl.DateTimeFormat("en-NP", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(value));
    } catch {
      return value;
    }
  };

  return (
    <div className="activities-page">
      <h1 className="activities-title">Activities</h1>

      {loading ? (
        <p className="activities-message">Loading activities...</p>
      ) : error ? (
        <p className="activities-message activities-error">{error}</p>
      ) : activities.length === 0 ? (
        <p className="activities-message">No activity history found.</p>
      ) : (
        <div className="activities-table-wrap">
          <table className="activities-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Lead Code</th>
                <th>Guardian</th>
                <th>Student</th>
                <th>Activity Type</th>
                <th>Note</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.id || "-"}</td>
                  <td>{activity.lead_code || "-"}</td>
                  <td>{activity.guardian_name || "-"}</td>
                  <td>{activity.student_name || "-"}</td>
                  <td>{activity.activity_type || activity.type || "-"}</td>
                  <td>{activity.note || activity.description || activity.remarks || "-"}</td>
                  <td>{formatDateTime(activity.created_at || activity.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;