import { useEffect, useState } from "react";
import ReminderService from "../../services/reminderService";

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

  return (
    <>
      <h1>Reminders</h1>

      {loading ? (
        <p>Loading reminders...</p>
      ) : error ? (
        <p>{error}</p>
      ) : reminders.length === 0 ? (
        <p>No reminder records found.</p>
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
              <th>Title</th>
              <th>Message</th>
              <th>Reminder Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {reminders.map((reminder) => (
              <tr key={reminder.id}>
                <td>{reminder.id || "-"}</td>
                <td>
                  {reminder.lead_name ||
                    reminder.lead?.guardian_name ||
                    reminder.lead ||
                    "-"}
                </td>
                <td>{reminder.title || reminder.subject || "-"}</td>
                <td>{reminder.message || reminder.note || reminder.description || "-"}</td>
                <td>{reminder.reminder_date || reminder.date || "-"}</td>
                <td>{reminder.status || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Reminders;