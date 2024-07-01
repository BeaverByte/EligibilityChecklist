import { QuestionsProvider } from "./contexts/QuestionsContext";

import Dates from "./components/Dates/Dates";
import PORGs from "./components/PORGs/PORGs";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Riders from "./components/Riders/Riders";
import Button from "./components/Button/Button";
import { handleNavigation } from "./pages/navigationUtils";
import { useNavigate } from "react-router";

function Eligibility() {
  const navigate = useNavigate();

  return (
    <QuestionsProvider>
      <Button
        onClick={(e) => handleNavigation(e, navigate)}
        type="back"
        name="home"
      >
        Back to menu
      </Button>
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
