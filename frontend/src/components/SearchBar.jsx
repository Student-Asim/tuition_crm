function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search Lead..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "300px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
      }}
    />
  );
}

export default SearchBar;