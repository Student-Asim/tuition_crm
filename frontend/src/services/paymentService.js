import api from "./api";

const PaymentService = {
  getPayments: () => api.get("/payments/"),
  getPendingDashboard: () => api.get("/payments/pending-dashboard/"),
  updatePayment: (id, data) => api.patch(`/payments/${id}/`, data),
};

export default PaymentService;