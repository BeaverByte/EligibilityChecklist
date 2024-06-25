import { SetStateAction, useEffect, useState } from "react";
import Question from "../Question/Question";
import { UseQuestions } from "../../contexts/QuestionsContext";
import Button from "../Button/Button";
import styles from "../Questionnaire/Questionnaire.module.css";

function Questionnaire() {
  const {
    currentQuestion,
    updateQuestion,
    selectedAnswer,
    setSelectedAnswer,
    questionsList,
  } = UseQuestions();

  const { id, text, elementType, options } = currentQuestion;

  // useEffect(() => {}, []);

  const handleSubmit = function (event) {
    event.preventDefault();

    const answer = selectedAnswer ?? null;
    if (answer === null) {
      console.log("No answer selected, please choose one and try again.");
      return;
    }
    updateQuestion(selectedAnswer);
  };

  const handleOptionChange = function (event) {
    let chosenAnswer = event.target.value;

    if (chosenAnswer === selectedAnswer) {
      console.log("Answer already chosen, deselecting");
      setSelectedAnswer(null);
    }

    console.log("Setting answer to " + chosenAnswer);
    setSelectedAnswer(chosenAnswer);
  };

  if (!options || options.length === 0) {
    return (
      <div className={styles.questionnaire}>
        <h1>Questions complete</h1>
        <Button type="reset">Reset</Button>
      </div>
    );
  }

  return (
    <form className={styles.questionnaire} onSubmit={handleSubmit}>
      <Question question={text} />
      <section className="options">
        {options.map((answer, index) => (
          <div key={index}>
            <input
              value={options[index].answer}
              name="option"
              type={elementType}
              checked={selectedAnswer === options[index].answer}
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
