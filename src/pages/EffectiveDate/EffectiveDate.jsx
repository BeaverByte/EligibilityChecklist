import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import { handleNavigation } from "../navigationUtils";
import { UseEffectiveDate } from "../../contexts/EffectiveDateContext";
import EligibilityDate from "../../components/EligibilityDate/EligibilityDate";

import styles from "../EffectiveDate/EffectiveDate.module.css";

function EffectiveDate() {
  const navigate = useNavigate();

  const {
    updateField,
    eligibilityDate,
    months,
    days,
    provision,
    qualifyingEventDate,
    signatureDate,
  } = UseEffectiveDate();

  const EFFECTIVEDATE = {
    HIREDATE: "hireDate",
    DAYS: "days",
    MONTHS: "months",
    PROVISION: "provision",
    QUALIFYINGEVENTDATE: "qualifyingEventDate",
    SIGNATUREDATE: "signatureDate",
  };

  const handleInputChange = function (event) {
    const chosenAnswer = event.target.name;

    console.log(
      `Element is ${chosenAnswer} and value is ${event.target.value}`
    );
    const name = event.target.name;
    const value = event.target.value;
    updateField(name, value);
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
        <input
          type="date"
          name={EFFECTIVEDATE.HIREDATE}
          onChange={handleInputChange}
        ></input>
      </div>
      <h2>Waiting Period</h2>
      <div className={styles.waitingperiod}>
        <label>Days</label>
        <input
          disabled={months !== ""}
          name={EFFECTIVEDATE.DAYS}
          onChange={handleInputChange}
        ></input>
        <label>Months</label>
        <input
          disabled={days !== ""}
          name={EFFECTIVEDATE.MONTHS}
          onChange={handleInputChange}
        ></input>
      </div>
      <div>
        <label>Provision</label>
        <select name={EFFECTIVEDATE.PROVISION} onChange={handleInputChange}>
          <option>Date Of</option>
          <option>First Of Month</option>
          <option>Open Enrollment</option>
          <option>Loss of Coverage</option>
        </select>
      </div>
      <div>
        <label>Qualifying Event Date</label>
        <input
          type="date"
          name={EFFECTIVEDATE.QUALIFYINGEVENTDATE}
          onChange={handleInputChange}
        ></input>
      </div>
      <div>
        <label>Signature Date</label>
        <input
          type="date"
          name={EFFECTIVEDATE.SIGNATUREDATE}
          onChange={handleInputChange}
        ></input>
      </div>
      <label>Eligibility Date</label>
      <EligibilityDate
        className={styles.eligibility}
        eligibilityDate={eligibilityDate}
      ></EligibilityDate>
      <div>
        <label>Late Date</label>
        <p>12/1/2020</p>
      </div>
    </div>
  );
}

export default EffectiveDate;
