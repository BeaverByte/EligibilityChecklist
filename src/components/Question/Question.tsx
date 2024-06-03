import { Key, useEffect } from "react";
import { UseQuestions } from "../../contexts/QuestionsContext";
import styles from "../Questionnaire/Questionnaire.module.css";
import Button from "../Button/Button";

function Question({}) {
  const { getQuestion, currentQuestion } = UseQuestions();

  const { id, question, type, options } = currentQuestion;

  useEffect(() => {
    // For debugging
    console.log("Current Question is ");
    console.log(currentQuestion);
    console.log("Options are ");
    console.log(options);
  }, [currentQuestion, options]);

  return (
    <div className={styles.box}>
      <h1 className="question">{question}</h1>

      <section className="options">
        {options.map((answer: any, index: any) => (
          <div key={index}>
            <input type={type} name="option" />
            <label htmlFor={options[index].answer}>
              {options[index].answer}
            </label>
          </div>
        ))}
      </section>

      <Button className="previous">Previous</Button>
      <Button className="next">Next</Button>
    </div>
  );
}
export default Question;
