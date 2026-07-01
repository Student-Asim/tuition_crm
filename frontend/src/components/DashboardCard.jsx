function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        minWidth: "200px",
      }}
    >
      <h4>{title}</h4>

      <h2
        style={{
          marginTop: "10px",
          color: "#2563eb",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default DashboardCard;