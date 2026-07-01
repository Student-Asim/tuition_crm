import api from "./api";

const LeadService = {
  getAllLeads(params = {}) {
    return api.get("/leads/", { params });
  },

  getLead(id) {
    return api.get(`/leads/${id}/`);
  },

  createLead(data) {
    return api.post("/leads/", data);
  },

  updateLead(id, data) {
    return api.put(`/leads/${id}/`, data);
  },

  deleteLead(id) {
    return api.delete(`/leads/${id}/`);
  },

  getStats() {
    return api.get("/leads/stats/");
  },
};

export default LeadService;