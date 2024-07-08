import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import { handleNavigation } from "../navigationUtils";
import { UseEffectiveDate } from "../../contexts/EffectiveDateContext";
import EligibilityDate from "../../components/EligibilityDate/EligibilityDate";

import styles from "../EffectiveDate/EffectiveDate.module.css";
import LateDate from "../../components/LateDate/LateDate";

import dayjs from "dayjs";

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
    lateDate,
    resetEffectiveDateForm,
  } = UseEffectiveDate();

  const EFFECTIVEDATE = {
    HIREDATE: "hireDate",
    DAYS: "days",
    MONTHS: "months",
    PROVISION: "provision",
    QUALIFYINGEVENTDATE: "qualifyingEventDate",
    SIGNATUREDATE: "signatureDate",
  };
  function handleSubmit(e) {
    e.preventDefault();

    resetEffectiveDateForm();

    const buttonType = e.target.name;

    handleNavigation(e, navigate);
  }

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
      <Button onClick={handleSubmit} type="back" name="home">
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
        <div>
          <label>Days</label>
          <input
            disabled={
              months !== "" ||
              provision === "Open Enrollment" ||
              provision === "Loss of Coverage"
            }
            name={EFFECTIVEDATE.DAYS}
            onChange={handleInputChange}
          ></input>
        </div>
        <div>
          <label>Months</label>
          <input
            disabled={
              days !== "" ||
              provision === "Open Enrollment" ||
              provision === "Loss of Coverage"
            }
            name={EFFECTIVEDATE.MONTHS}
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
      <div>
        <label>Provision</label>
        <select name={EFFECTIVEDATE.PROVISION} onChange={handleInputChange}>
          <option>Date of</option>
          <option>First of Month</option>
          <option>Open Enrollment</option>
          <option>Loss of Coverage</option>
        </select>
      </div>
      <div>
        <label>Qualifying Event Date</label>
        <input
          type="date"
          disabled={
            provision !== "Open Enrollment" && provision !== "Loss of Coverage"
          }
          name={EFFECTIVEDATE.QUALIFYINGEVENTDATE}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className={styles.signaturedate}>
        <label>Signature Date</label>
        <input
          type="date"
          name={EFFECTIVEDATE.SIGNATUREDATE}
          onChange={handleInputChange}
        ></input>
        {dayjs(signatureDate).isAfter(dayjs(lateDate)) ? <p>LATE</p> : <></>}
      </div>
      <div className={styles.eligibility}>
        <label>Eligibility Date</label>
        <EligibilityDate
          className={styles.eligibility}
          eligibilityDate={eligibilityDate}
        ></EligibilityDate>
      </div>
      <div className={styles.latedate}>
        <label>Late Date</label>
        <LateDate className={styles.latedate} lateDate={lateDate}></LateDate>
        {dayjs(signatureDate).isAfter(dayjs(lateDate)) ? <p>LATE</p> : <></>}
      </div>
    </div>
  );
}

export default EffectiveDate;
