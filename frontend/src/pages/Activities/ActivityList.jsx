import { useEffect, useState } from "react";
import ActivityService from "../../services/activityService";

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

      alert(
        JSON.stringify(
          {
            status: error.response?.status,
            data: error.response?.data || error.message,
          },
          null,
          2
        )
      );

      setError("Failed to load activities.");
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Activities</h1>

      {loading ? (
        <p>Loading activities...</p>
      ) : error ? (
        <p>{error}</p>
      ) : activities.length === 0 ? (
        <p>No activity history found.</p>
      ) : (
        <table
          width="100%"
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Lead</th>
              <th>Activity Type</th>
              <th>Note</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.id || "-"}</td>
                <td>{activity.lead_name || activity.lead || "-"}</td>
                <td>{activity.activity_type || activity.type || "-"}</td>
                <td>{activity.note || activity.description || activity.remarks || "-"}</td>
                <td>{activity.created_at || activity.date || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Activities;