import Dates from "./components/Dates/Dates";
import PORGs from "./components/PORGs/PORGs";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Riders from "./components/Riders/Riders";

function Eligibility() {
  return (
    <div>
      <Questionnaire />
      <div>
        <h2>Relevant Dates</h2>
        <Dates />
      </div>
      <div>
        <h2>PORG & Riders</h2>
        <PORGs />
        <Riders />
      </div>
    </div>
  );
}

export default Eligibility;
