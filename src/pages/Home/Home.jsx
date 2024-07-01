import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import Eligibility from "../Eligibility/Eligibility";
import { ROUTES } from "../routes";
import { handleNavigation } from "../navigationUtils";
import styles from "./Home.module.css";
import { UseQuestions } from "../../contexts/QuestionsContext";

export default function Home() {
  const { resetQuestionnaire } = UseQuestions();
  const navigate = useNavigate();

  return (
    <main className={styles.home}>
      <h1>Eligibility Tools</h1>
      <Button
        onClick={(e) => handleNavigation(e, navigate)}
        name={"eligibility"}
      >
        Determine Riders and PORGS
      </Button>
      <Button
        onClick={(e) => handleNavigation(e, navigate)}
        name={"effectivedate"}
      >
        Generate Effective Date
      </Button>
    </main>
  );
}
