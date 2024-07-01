import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import { handleNavigation } from "../navigationUtils";
import { UseEffectiveDate } from "../../contexts/EffectiveDateContext";

function EffectiveDate() {
  const navigate = useNavigate();

  const {
    updateHireDate,
    months,
    days,
    provision,
    qualifyingEventDate,
    signatureDate,
  } = UseEffectiveDate();

  const handleInputChange = function (event) {
    const chosenAnswer = event.target.name;

    console.log(
      `Element is ${chosenAnswer} and value is ${event.target.value}`
    );
    switch (event.target.name) {
      case "hireDate":
        updateHireDate(event.target.value);
        break;

      // Add cases for all input types to update context

      default:
        break;
    }
  };

  return (
    <div>
      <Button
        onClick={(e) => handleNavigation(e, navigate)}
        type="back"
        name="home"
      >
        Back to menu
      </Button>
      <h1>Effective Date</h1>
      <div>
        <label>Hire Date</label>
        <input name="hireDate" onChange={handleInputChange}></input>
      </div>
      <h2>Waiting Period</h2>
      <div>
        <label>Days</label>
        <input name="waitingPeriodDays" onChange={handleInputChange}></input>
        <label>Months</label>
        <input name="waitingPeriodMonths" onChange={handleInputChange}></input>
      </div>
      <div>
        <label>Provision</label>
        <select name="Provision" onChange={handleInputChange}>
          <option>Date Of</option>
          <option>First Of Month</option>
          <option>Open Enrollment</option>
          <option>Loss of Coverage</option>
        </select>
      </div>
      <div>
        <label>Qualifying Event Date</label>
        <input name="qualifyingEventDate" onChange={handleInputChange}></input>
      </div>
      <div>
        <label>Signature Date</label>
        <input name="signatureDate" onChange={handleInputChange}></input>
      </div>
      <div>
        <label>Eligibility Date</label>
        <p>12/4/2027</p>
      </div>
      <div>
        <label>Late Date</label>
        <p>12/1/2020</p>
      </div>
    </div>
  );
}

export default EffectiveDate;
