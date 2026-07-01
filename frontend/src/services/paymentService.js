import api from "./api";

const PaymentService = {
  getPayments(params = {}) {
    return api.get("/payments/", { params });
  },
};

export default PaymentService;