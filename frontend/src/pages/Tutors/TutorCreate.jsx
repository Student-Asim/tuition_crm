import TutorForm from "../../components/TutorForm";
import "./TutorCreate.css";

function TutorCreate() {
  return (
    <div className="tutor-create-page">
      <div className="tutor-create-card">
        <h1 className="tutor-create-title">Create Tutor</h1>
        <TutorForm />
      </div>
    </div>
  );
}

export default TutorCreate;