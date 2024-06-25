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
    resetQuestionnaire,
  } = UseQuestions();

  const { id, text, elementType, options } = currentQuestion;

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

  const handleReset = function (event) {
    resetQuestionnaire();
  };

  // If answer has no options, then questions exhausted
  if (!options || options.length === 0) {
    return (
      <div className={styles.questionnaire}>
        <h1>Questions complete</h1>
        <Button type="reset" onClick={handleReset}>
          Reset
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.questionnaire}>
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
      {/* <Button type="button" onClick={handlePrevious}>
        Previous
      </Button> */}
      <Button type="button" onClick={handleSubmit}>
        Next
      </Button>
    </form>
  );
}

export default Questionnaire;
