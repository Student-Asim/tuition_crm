import { useEffect, useState } from "react";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import LeadService from "../services/leadService";
import TutorService from "../services/tutorService";
import "./LeadForm.css";

function LeadForm() {
  const initialFormData = {
    guardian_name: "",
    contact_number: "",
    email: "",
    student_name: "",
    class_name: "",
    subjects: "",
    location: "",
    assigned_to: "",
    preferred_timing: "",
    monthly_budget: "",
    follow_up_date: "",
    follow_up_date_bs: "",
    source: "whatsapp",
    platform: "whatsapp",
    stage: "new",
    priority: "medium",
    call_notes: "",
    weak_areas: "",
    remarks: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = async () => {
    try {
      const res = await TutorService.getTutors();
      const tutorData = res.data.results || res.data || [];

      const activeTutors = tutorData.filter(
        (tutor) => tutor.status?.toLowerCase() === "active"
      );

      setTutors(activeTutors);
    } catch (error) {
      console.error(
        "Failed to load tutors:",
        error.response?.data || error.message
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "source" ? { platform: value } : {}),
    }));
  };

  const handleAssignedTutorChange = (e) => {
    const selectedTutorName = e.target.value;

    const selectedTutor = tutors.find(
      (tutor) =>
        (tutor.tutor_name || "").toLowerCase() ===
        selectedTutorName.toLowerCase()
    );

    setFormData((prev) => ({
      ...prev,
      assigned_to: selectedTutorName,
      subjects: selectedTutor?.subjects || prev.subjects,
      location: selectedTutor?.location || prev.location,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        guardian_name: formData.guardian_name,
        contact_number: formData.contact_number,
        email: formData.email,
        student_name: formData.student_name,
        class_name: formData.class_name,
        subjects: formData.subjects,
        location: formData.location,
        assigned_to: formData.assigned_to,
        preferred_timing: formData.preferred_timing,
        monthly_budget: formData.monthly_budget,
        follow_up_date: formData.follow_up_date,
        source: formData.source,
        platform: formData.platform,
        stage: formData.stage,
        priority: formData.priority,
        call_notes: formData.call_notes,
        weak_areas: formData.weak_areas,
        remarks: formData.remarks,
      };

      const res = await LeadService.createLead(payload);
      console.log("Lead created:", res.data);
      alert("Lead created successfully");

      setFormData(initialFormData);
    } catch (error) {
      console.error(
        "Create lead error:",
        error.response?.data || error.message
      );

      alert(
        JSON.stringify(
          error.response?.data || { error: "Failed to create lead" },
          null,
          2
        )
      );
    }
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="lead-form-grid">
        <input
          name="guardian_name"
          placeholder="Guardian Name"
          value={formData.guardian_name}
          onChange={handleChange}
        />

        <input
          name="contact_number"
          placeholder="Contact Number"
          value={formData.contact_number}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="student_name"
          placeholder="Student Name"
          value={formData.student_name}
          onChange={handleChange}
        />

        <input
          name="class_name"
          placeholder="Class"
          value={formData.class_name}
          onChange={handleChange}
        />

        <input
          name="subjects"
          placeholder="Subjects"
          value={formData.subjects}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <select
          name="assigned_to"
          value={formData.assigned_to}
          onChange={handleAssignedTutorChange}
        >
          <option value="">Select Active Tutor</option>
          {tutors.map((tutor) => (
            <option key={tutor.id} value={tutor.tutor_name}>
              {tutor.tutor_name}
            </option>
          ))}
        </select>

        <input
          name="preferred_timing"
          placeholder="Preferred Timing"
          value={formData.preferred_timing}
          onChange={handleChange}
        />

        <input
          name="monthly_budget"
          placeholder="Monthly Budget"
          value={formData.monthly_budget}
          onChange={handleChange}
        />

        <Calendar
        className="lead-nepali-date"
        calendarClassName="lead-nepali-calendar"
        value={formData.follow_up_date_bs}
        language="en"
        dateFormat="YYYY-MM-DD"
        onChange={({ bsDate, adDate }) =>
          setFormData((prev) => ({
            ...prev,
            follow_up_date_bs: bsDate || "",
            follow_up_date: adDate ? String(adDate).slice(0, 10) : "",
            stage: bsDate ? "follow_up" : prev.stage,
          }))
        }
      />
        

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
        >
          <option value="whatsapp">WhatsApp</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="website">Website</option>
          <option value="referral">Referral</option>
        </select>

        <select
          name="stage"
          value={formData.stage}
          onChange={handleChange}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="follow_up">Follow Up</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="lead-form-textareas">
        <textarea
          name="call_notes"
          placeholder="Call Notes"
          value={formData.call_notes}
          onChange={handleChange}
        />

        <textarea
          name="weak_areas"
          placeholder="Weak Areas"
          value={formData.weak_areas}
          onChange={handleChange}
        />

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
        />
      </div>

      <div className="lead-form-actions">
        <button type="submit">Save Lead</button>
      </div>
    </form>
  );
}

export default LeadForm;