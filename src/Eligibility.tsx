import Questionnaire from "./components/Questionnaire/Questionnaire";

function Eligibility() {
  return (
    <div>
      <Questionnaire />
      <div>
        <dl>
          <dt>Hire Date</dt>
          <dd>01/01/1990</dd>

          <dt>Eligibility Date</dt>
          <dd>01/01/1990</dd>

          <dt>Late Date</dt>
          <dd>01/01/1990</dd>
        </dl>
      </div>
      <div>
        <dl>
          <dt>Porg 1</dt>
          <dd>ABCD</dd>

          <dt>Porg 2</dt>
          <dd>ABCD</dd>
        </dl>
      </div>
    </div>
  );
}

export default Eligibility;
