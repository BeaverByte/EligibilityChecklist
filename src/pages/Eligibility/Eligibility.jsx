import { QuestionsProvider } from "../../contexts/QuestionsContext";

import Dates from "../../components/Dates/Dates";
import PORGs from "../../components/PORGs/PORGs";
import Questionnaire from "../../components/Questionnaire/Questionnaire";
import Riders from "../../components/Riders/Riders";
import Button from "../../components/Button/Button";
//import { handleNavigation } from "../../pages/navigationUtils";
import { useNavigate } from "react-router";
import { UseQuestions } from "../../contexts/QuestionsContext";
import { ROUTES } from "../../pages/routes";
import { handleNavigation } from "../navigationUtils";

function Eligibility() {
  const navigate = useNavigate();
  const { resetQuestionnaire } = UseQuestions();

  function handleSubmit(e) {
    e.preventDefault();

    resetQuestionnaire();

    const buttonType = e.target.name;

    handleNavigation(e, navigate);
  }
  return (
    <>
      <Button onClick={handleSubmit} type="back" name="home">
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
    </>
  );
}

export default Eligibility;
