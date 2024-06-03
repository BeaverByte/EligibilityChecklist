import { SetStateAction, useState } from "react";
import Question from "../Question/Question";

function Questionnaire() {
  const [answers, setAnswers] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Question submitted");
    setAnswers(e.target.value);
  }

  return (
    <form className="questionnaire" onSubmit={handleSubmit}>
      <Question />
    </form>
  );
}

export default Questionnaire;
