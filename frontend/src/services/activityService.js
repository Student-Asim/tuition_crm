import api from "./api";

const ActivityService = {
  getAllActivities(params = {}) {
    return api.get("/activities/", { params });
  },

  getActivity(id) {
    return api.get(`/activities/${id}/`);
  },
};

export default ActivityService;