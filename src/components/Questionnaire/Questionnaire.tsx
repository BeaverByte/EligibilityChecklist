import { SetStateAction, useEffect, useState } from "react";
import Question from "../Question/Question";
import { UseQuestions } from "@/contexts/QuestionsContext";
import Button from "../Button/Button";
import styles from "../Questionnaire/Questionnaire.module.css";

function Questionnaire() {
  const { currentQuestion, updateQuestion, selectedAnswer, setSelectedAnswer } =
    UseQuestions();

  const { id, question, type, options } = currentQuestion;

  //const [selectedAnswer, setSelectedAnswer] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const answer = selectedAnswer ?? null;
    if (answer === null) {
      console.log("No answer selected, please choose one and try again.");
      return;
    }

    console.log("Answer submitted" + " : " + selectedAnswer);
    updateQuestion(selectedAnswer);
  }

  function handleOptionChange(event) {
    let chosenAnswer = event.target.value;
    setSelectedAnswer(chosenAnswer);
  }

  // useEffect(() => {
  //   console.log(selectedAnswer);
  // });

  return (
    <form className={styles.questionnaire} onSubmit={handleSubmit}>
      <Question question={question} />
      <section className="options">
        {options.map((answer: any, index: any) => (
          <div key={index}>
            <input
              value={options[index].answer}
              name="option"
              type={type}
              //checked={selectedAnswer === options.answer}
              onChange={handleOptionChange}
            />
            <label htmlFor={options[index].answer}>
              {options[index].answer}
            </label>
          </div>
        ))}
      </section>
      <Button type="previous">Previous</Button>
      <Button type="next">Next</Button>
    </form>
  );
}

export default Questionnaire;
