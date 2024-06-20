import { QuestionsProvider } from "./contexts/QuestionsContext";

import Dates from "./components/Dates/Dates";
import PORGs from "./components/PORGs/PORGs";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Riders from "./components/Riders/Riders";

function Eligibility() {
  return (
    <QuestionsProvider>
      <div id="root">
        <Questionnaire />
        <div className="dates">
          <h2>Relevant Dates</h2>
          <Dates />
        </div>
        <div className="riders">
          <h2>PORG & Riders</h2>
          <PORGs />
          <Riders />
        </div>
      </div>
    </QuestionsProvider>
  );
}

export default Eligibility;
