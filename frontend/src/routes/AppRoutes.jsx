import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import LeadList from "../pages/Leads/LeadList";
import LeadCreate from "../pages/Leads/LeadCreate";
import LeadEdit from "../pages/Leads/LeadEdit";
import LeadDetails from "../pages/Leads/LeadDetails";
import TutorList from "../pages/Tutors/TutorList";
import TutorCreate from "../pages/Tutors/TutorCreate";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "./ProtectedRoutes";
import MainLayout from "../layouts/MainLayout";
import PaymentList from "../pages/Payments/PaymentList";
import ActivityList from "../pages/Activities/ActivityList";
import ReminderList from "../pages/Reminders/ReminderList";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<LeadList />} />
          <Route path="/leads/create" element={<LeadCreate />} />
          <Route path="/leads/edit/:id" element={<LeadEdit />} />
          <Route path="/leads/:id" element={<LeadDetails />} />

          <Route path="/tutors" element={<TutorList />} />
          <Route path="/tutors/create" element={<TutorCreate />} />

          <Route path="/activities" element={<ActivityList />} />
          <Route path="/payments" element={<PaymentList />} />
          <Route path="/reminders" element={<ReminderList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;