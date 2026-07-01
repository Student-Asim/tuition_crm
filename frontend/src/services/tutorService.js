import api from "./api";

const TutorService = {
  getTutors() {
    return api.get("/tutors/");
  },

  createTutor(data) {
    return api.post("/tutors/", data);
  },

  getTutor(id) {
    return api.get(`/tutors/${id}/`);
  },

  updateTutor(id, data) {
    return api.put(`/tutors/${id}/`, data);
  },

  deleteTutor(id) {
    return api.delete(`/tutors/${id}/`);
  },
};

export default TutorService;