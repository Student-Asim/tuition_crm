import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TutorService from "../../services/tutorService";
import "./TutorList.css";

function TutorList() {
  const [tutors, setTutors] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = async () => {
    try {
      const res = await TutorService.getTutors();
      setTutors(res.data.results || res.data || []);
    } catch (error) {
      console.error("Failed to load tutors:", error);
    }
  };

  const handleStatusChange = async (tutorId, newStatus) => {
    try {
      setUpdatingId(tutorId);

      const selectedTutor = tutors.find((tutor) => tutor.id === tutorId);
      if (!selectedTutor) return;

      const updatedTutor = {
        ...selectedTutor,
        status: newStatus,
      };

      await TutorService.updateTutor(tutorId, updatedTutor);

      setTutors((prevTutors) =>
        prevTutors.map((tutor) =>
          tutor.id === tutorId ? { ...tutor, status: newStatus } : tutor
        )
      );
    } catch (error) {
      console.error("Failed to update tutor status:", error);
      alert("Failed to update tutor status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="tutor-page">
      <div className="tutor-hero">
        <h1 className="tutor-title">Tutors</h1>
        <p className="tutor-subtitle">
          Manage tutor records, subjects, locations, and availability.
        </p>
        <p className="tutor-description">
          Keep your tutor database updated so active tutors can be assigned properly
          to leads based on subject and location.
        </p>

        <Link to="/tutors/create" className="tutor-add-link">
          <button className="tutor-add-btn">Add Tutor</button>
        </Link>
      </div>

      <div className="tutor-table-card">
        <div className="tutor-table-wrap">
          <table className="tutor-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Subjects</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {tutors.length > 0 ? (
                tutors.map((tutor) => (
                  <tr key={tutor.id}>
                    <td>{tutor.tutor_code || "-"}</td>
                    <td>{tutor.tutor_name || "-"}</td>
                    <td>{tutor.phone || "-"}</td>
                    <td>{tutor.gender || "-"}</td>
                    <td>{tutor.subjects || "-"}</td>
                    <td>{tutor.location || "-"}</td>
                    <td>
                      <select
                        className={`status-select ${
                          tutor.status?.toLowerCase() === "active"
                            ? "active"
                            : "inactive"
                        }`}
                        value={tutor.status?.toLowerCase() || "inactive"}
                        onChange={(e) =>
                          handleStatusChange(tutor.id, e.target.value)
                        }
                        disabled={updatingId === tutor.id}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="tutor-empty">
                    No tutors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TutorList;