import { Key, useEffect } from "react";
import { useQuestions } from "../../contexts/QuestionsContext";
import styles from "../Questionnaire/Questionnaire.module.css";
import Button from "../Button/Button";

function Question({}) {
  const { getQuestion, currentQuestion } = useQuestions();

  const { id, question, type, options } = currentQuestion;

  useEffect(() => {
    console.log(currentQuestion);
    console.log(options);
  }, [currentQuestion, options]);

  return (
    <div className={styles.box}>
      <h1 className="question">{question}</h1>

      <section className="options">
        {options.map((answer: any, index: any) => (
          <div key={index}>
            <input type={type} name={options[index].answer} />
            <label htmlFor={options[index].answer}>
              {options[index].answer}
            </label>
          </div>
        ))}
      </section>

      {/* <h1 className="question">{question.question}</h1>
      <section className="options">
        {question.options.map((option: any, index: any) => (
          <div key={index}>
            <input type={question.type} name={question.options[index].answer} />
            <label htmlFor={question.options[index].answer}>
              {question.options[index].answer}
            </label>
          </div>
        ))}
      </section> */}

      <Button className="previous">Previous</Button>
      <Button className="next">Next</Button>
    </div>
  );
}
export default Question;
