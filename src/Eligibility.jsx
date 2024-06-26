import { QuestionsProvider } from "./contexts/QuestionsContext";

import Dates from "./components/Dates/Dates";
import PORGs from "./components/PORGs/PORGs";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Riders from "./components/Riders/Riders";

function Eligibility() {
  return (
    <QuestionsProvider>
      <Questionnaire />
      {/* <div className="dates">
          <h2>Relevant Dates</h2>
          <Dates />
        </div> */}
      <div className="riders">
        <PORGs />
        <Riders />
      </div>
    </QuestionsProvider>
  );
}

export default Eligibility;
