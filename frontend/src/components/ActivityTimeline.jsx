function ActivityTimeline({ activities }) {
  return (
    <div>
      <h3>Lead Activities</h3>

      {activities?.map((activity) => (
        <div
          key={activity.id}
          style={{
            borderLeft: "3px solid #2563eb",
            paddingLeft: "15px",
            marginBottom: "15px",
          }}
        >
          <strong>{activity.activity_type}</strong>

          <p>{activity.notes}</p>

          <small>
            {activity.created_by} | {activity.created_at}
          </small>
        </div>
      ))}
    </div>
  );
}

export default ActivityTimeline;