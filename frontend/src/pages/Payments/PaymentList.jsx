import { useEffect, useState } from "react";
import PaymentService from "../../services/paymentService";
import "./PaymentList.css";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadPayments();
    loadPendingDashboard();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await PaymentService.getPayments();
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

  const loadPendingDashboard = async () => {
    try {
      setDashboardLoading(true);
      const res = await PaymentService.getPendingDashboard();
      setDashboard(res.data || null);
    } catch (error) {
      console.error("Pending dashboard fetch error:", error.response?.data || error.message);
      setDashboard(null);
    } finally {
      setDashboardLoading(false);
    }
  };

  const handleStatusChange = async (paymentId, fieldName, newValue) => {
    try {
      setUpdatingId(paymentId);

      await PaymentService.updatePayment(paymentId, {
        [fieldName]: newValue,
      });

      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment.id === paymentId
            ? { ...payment, [fieldName]: newValue }
            : payment
        )
      );

      await loadPendingDashboard();
    } catch (error) {
      console.error("Status update failed:", error.response?.data || error.message);
      alert("Failed to update payment status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined || value === "") return "-";
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return value;
    return `Rs. ${numberValue.toFixed(2)}`;
  };

  const formatDate = (value) => {
    if (!value) return "-";
    return value;
  };

  return (
    <div className="payments-page">
      <div className="payments-header">
        <div>
          <h1 className="payments-title">Payments</h1>
          <p className="payments-subtitle">
            Track guardian fees, tutor commissions, and pending payment status.
          </p>
        </div>
      </div>

      <div className="payments-dashboard-grid">
        <div className="payment-summary-card">
          <p className="summary-label">Guardian Pending</p>
          <h3>{dashboardLoading ? "..." : dashboard?.guardian_pending_count ?? 0}</h3>
          <span>{dashboardLoading ? "..." : formatCurrency(dashboard?.guardian_pending_total)}</span>
        </div>

        <div className="payment-summary-card overdue-card">
          <p className="summary-label">Guardian Overdue</p>
          <h3>{dashboardLoading ? "..." : dashboard?.guardian_overdue_count ?? 0}</h3>
          <span>{dashboardLoading ? "..." : formatCurrency(dashboard?.guardian_overdue_total)}</span>
        </div>

        <div className="payment-summary-card">
          <p className="summary-label">Tutor Pending</p>
          <h3>{dashboardLoading ? "..." : dashboard?.tutor_pending_count ?? 0}</h3>
          <span>{dashboardLoading ? "..." : formatCurrency(dashboard?.tutor_pending_total)}</span>
        </div>

        <div className="payment-summary-card overdue-card">
          <p className="summary-label">Tutor Overdue</p>
          <h3>{dashboardLoading ? "..." : dashboard?.tutor_overdue_count ?? 0}</h3>
          <span>{dashboardLoading ? "..." : formatCurrency(dashboard?.tutor_overdue_total)}</span>
        </div>
      </div>

      {loading ? (
        <p className="payments-message">Loading payments...</p>
      ) : error ? (
        <p className="payments-message error">{error}</p>
      ) : payments.length === 0 ? (
        <p className="payments-message">No payment records found.</p>
      ) : (
        <div className="payments-table-section">
          <div className="payments-table-wrapper">
            <table className="payments-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Payment Code</th>
                  <th>Lead ID</th>
                  <th>Guardian Name</th>
                  <th>Guardian Number</th>
                  <th>Guardian Fee</th>
                  <th>Guardian Status</th>
                  <th>Tutor Monthly Fee</th>
                  <th>Tutor Commission</th>
                  <th>Tutor Status</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Month</th>
                  <th>Date</th>
                  <th>Remarks</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id || "-"}</td>
                    <td>{payment.payment_code || "-"}</td>
                    <td>{payment.client_lead_id || "-"}</td>
                    <td>{payment.guardian_name || payment.client_guardian_name || "-"}</td>
                    <td>{payment.guardian_contact_number || payment.client_contact_number || "-"}</td>
                    <td>{formatCurrency(payment.guardian_service_fee)}</td>

                    <td>
                      <select
                        className={`status-select ${payment.guardian_payment_status || "pending"}`}
                        value={payment.guardian_payment_status || "pending"}
                        disabled={updatingId === payment.id}
                        onChange={(e) =>
                          handleStatusChange(
                            payment.id,
                            "guardian_payment_status",
                            e.target.value
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </td>

                    <td>{formatCurrency(payment.tutor_monthly_tuition_fee)}</td>
                    <td>{formatCurrency(payment.tutor_commission)}</td>

                    <td>
                      <select
                        className={`status-select ${payment.tutor_payment_status || "pending"}`}
                        value={payment.tutor_payment_status || "pending"}
                        disabled={updatingId === payment.id}
                        onChange={(e) =>
                          handleStatusChange(
                            payment.id,
                            "tutor_payment_status",
                            e.target.value
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </td>

                    <td>{formatCurrency(payment.amount)}</td>
                    <td>{payment.payment_method || "-"}</td>
                    <td>{payment.payment_month || "-"}</td>
                    <td>{formatDate(payment.payment_date || payment.created_at)}</td>
                    <td>{payment.remarks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;