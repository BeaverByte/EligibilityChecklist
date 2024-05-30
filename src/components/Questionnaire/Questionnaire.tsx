import { SetStateAction, useState } from "react";
import Question from "../Question/Question";
const questions = [
  {
    question: "Does the member have Medical?",
    type: "checkbox",
    options: [
      { label: "Yes", porgs: [], riders: ["MED"] },
      { label: "No", porgs: [], riders: [] },
    ],
  },
];

function Questionnaire() {
  const [answers, setAnswers] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [riders, setRiders] = useState([]);
  const [porgs, setPorgs] = useState([]);

  function handleOption(e: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) {
    e.preventDefault();

    console.log("What");
    setAnswers(e.target.value);
  }

  return (
    <form className="questionnaire">
      <Question question={currentQuestion} onChange={handleOption} />
    </form>
  );
}

export default Questionnaire;
