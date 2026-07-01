function StatusBadge({ status }) {
  const colors = {
    new: "#3b82f6",
    contacted: "#8b5cf6",
    follow_up: "#f59e0b",
    future: "#06b6d4",
    converted: "#22c55e",
    lost: "#ef4444",
  };

  return (
    <span
      style={{
        background: colors[status] || "#6b7280",
        color: "#fff",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;