import { useEffect, useState } from "react";
import PaymentService from "../../services/paymentService";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await PaymentService.getPayments();
      console.log("Payments API response:", res.data);

      const paymentData = res.data.results || res.data || [];
      setPayments(Array.isArray(paymentData) ? paymentData : []);
    } catch (error) {
      console.error("Payments fetch error:", error.response?.data || error.message);
      setError("Failed to load payments.");
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Payments</h1>

      {loading ? (
        <p>Loading payments...</p>
      ) : error ? (
        <p>{error}</p>
      ) : payments.length === 0 ? (
        <p>No payment records found.</p>
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
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id || "-"}</td>
                <td>
                  {payment.lead_name ||
                    payment.lead?.guardian_name ||
                    payment.lead ||
                    "-"}
                </td>
                <td>{payment.amount || payment.paid_amount || "-"}</td>
                <td>{payment.method || payment.payment_method || "-"}</td>
                <td>{payment.status || "-"}</td>
                <td>{payment.payment_date || payment.created_at || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Payments;