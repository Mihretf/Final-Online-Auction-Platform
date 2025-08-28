import { useNavigate } from "react-router-dom";

export default function BackToDashboardButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/admin")}
      style={{
        marginBottom: "20px",
        padding: "8px 16px",
        backgroundColor: "#4f46e5",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      ← Back to Dashboard
    </button>
  );
}
