import LeadForm from "../../components/LeadForm";
import "./LeadCreate.css";

function CreateLead() {
  return (
    <div className="create-lead-page">
      <div className="create-lead-hero">
        <h1 className="create-lead-title">Create Lead</h1>
        <p className="create-lead-subtitle">
          Add a new enquiry and prepare it for follow-up and tutor assignment.
        </p>
        <p className="create-lead-description">
          Fill in the guardian, student, subject, location, timing, and budget details
          so the lead can be tracked properly and matched with an active tutor.
        </p>
      </div>

      <div className="create-lead-form-wrap">
        <LeadForm />
      </div>
    </div>
  );
}

export default CreateLead;