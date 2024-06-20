import { Key, useEffect } from "react";
import { UseQuestions } from "../../contexts/QuestionsContext";

function Question({ question }) {
  return (
    <div>
      <h1 className="question">{question}</h1>
    </div>
  );
}
export default Question;
