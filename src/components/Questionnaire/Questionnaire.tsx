import { SetStateAction, useState } from "react";
import Question from "../Question/Question";
import Button from "../Button/Button";
const questions = [
  {
    id: "q1",
    question: "Does the member have Medical?",
    type: "checkbox",
    options: [{ answer: "Yes", nextQuestion: "q2" }, { answer: "No" }],
  },
  {
    id: "q2",
    question: "Does the member have a high deductible plan?",
    type: "checkbox",
    options: [
      { answer: "Yes", riders: ["HDP"], nextQuestion: "q3" },
      { answer: "No" },
    ],
  },
  {
    id: "q3",
    question: "What is the Medical Network?",
    type: "checkbox",
    options: [
      {
        answer: "Aetna (Aetna Signature Administrators)",
        nextQuestion: "q4a",
      },
      { answer: "Cofinity or Cofinity Advantage", nextQuestion: "q4b" },
      { answer: "PHCS", nextQuestion: "q4c" },
      { answer: "First Health", nextQuestion: "q4d" },
    ],
  },
  {
    id: "q4a",
    question:
      "Does the Nidd policy tab show same copay for Generalist and Specialist?",
    type: "radio",
    options: [
      {
        answer: "yes",
        porgs: ["AETN"],
        riders: ["AET, AAH, COR"],
      },
      {
        answer: "no",
        porgs: ["AEPC"],
        riders: ["AET, AAH, COR"],
      },
    ],
  },
  {
    question: "Does the member have Dental?",
    type: "checkbox",
    options: [
      { answer: "Yes", porgs: [], riders: ["DEN"] },
      { answer: "No", porgs: [], riders: [] },
    ],
  },
  {
    question: "Does the member have Vision?",
    type: "checkbox",
    options: [
      { answer: "Yes", porgs: [], riders: ["VIS"] },
      { answer: "No", porgs: [], riders: [] },
    ],
  },
  {
    question: "Does the member have Life?",
    type: "checkbox",
    options: [
      { answer: "Yes", porgs: [], riders: [""] },
      { answer: "No", porgs: [], riders: [] },
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
