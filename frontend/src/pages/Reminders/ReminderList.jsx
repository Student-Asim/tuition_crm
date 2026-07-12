import { useEffect, useState } from "react";
import ReminderService from "../../services/reminderService";
import "./RemaindersList.css";

function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await ReminderService.getReminders();
      console.log("Reminders API response:", res.data);

      const reminderData = res.data.results || res.data || [];
      setReminders(Array.isArray(reminderData) ? reminderData : []);
    } catch (error) {
      console.error("Reminders fetch error:", error.response?.data || error.message);
      setError("Failed to load reminders.");
      setReminders([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (value) => {
    if (!value) return "-";
    try {
      return new Intl.DateTimeFormat("en-NP", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(value));
    } catch {
      return value;
    }
  };

  return (
  <div className="reminders-page">
    <h1 className="reminders-title">Reminders</h1>

    {loading ? (
      <p className="reminders-message">Loading reminders...</p>
    ) : error ? (
      <p className="reminders-message">{error}</p>
    ) : reminders.length === 0 ? (
      <p className="reminders-message">No reminder records found.</p>
    ) : (
      <table className="reminders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Lead Code</th>
            <th>Guardian</th>
            <th>Student</th>
            <th>Message</th>
            <th>Reminder Date</th>
            <th>Reminder Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {reminders.map((reminder) => (
            <tr key={reminder.id}>
              <td>{reminder.id || "-"}</td>
              <td>{reminder.lead_code || "-"}</td>
              <td>{reminder.guardian_name || "-"}</td>
              <td>{reminder.student_name || "-"}</td>
              <td>{reminder.message || reminder.notes || "-"}</td>
              <td>{formatDate(reminder.reminder_date)}</td>
              <td>{reminder.reminder_time || "-"}</td>
              <td>{reminder.status || reminder.reminder_status || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
}

export default Reminders;