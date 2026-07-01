import { useState } from "react";
import TutorService from "../services/tutorService";
import "./TutorForm.css";

function TutorForm() {
  const [formData, setFormData] = useState({
    tutor_code: "",
    tutor_name: "",
    phone: "",
    gender: "",
    subjects: "",
    location: "",
    status: "active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await TutorService.createTutor(formData);
      console.log("Tutor created:", res.data);
      alert("Tutor created successfully");

      setFormData({
        tutor_code: "",
        tutor_name: "",
        phone: "",
        gender: "",
        subjects: "",
        location: "",
        status: "active",
      });
    } catch (error) {
      console.error("Tutor create error:", error.response?.data || error.message);
      alert(
        JSON.stringify(
          error.response?.data || { error: "Failed to create tutor" },
          null,
          2
        )
      );
    }
  };

  return (
    <form className="tutor-form" onSubmit={handleSubmit}>
      <div className="tutor-form-grid">
        <input
          type="text"
          name="tutor_code"
          placeholder="Tutor Code"
          value={formData.tutor_code}
          onChange={handleChange}
        />

        <input
          type="text"
          name="tutor_name"
          placeholder="Tutor Name"
          value={formData.tutor_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="text"
          name="subjects"
          placeholder="Subjects"
          value={formData.subjects}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="tutor-form-actions">
        <button type="submit">Save Tutor</button>
      </div>
    </form>
  );
}

export default TutorForm;