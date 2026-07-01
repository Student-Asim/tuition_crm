import api from "./api";

const ReminderService = {
  getReminders(params = {}) {
    return api.get("/reminders/", { params });
  },
};

export default ReminderService;