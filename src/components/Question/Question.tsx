function Question({ question, onChange }) {
  return (
    <div>
      <h1 className="question">{question.question}</h1>
      <section className="options">
        {question.options.map((option, index) => (
          <div key={index}>
            <input type={question.type} name={question.options[index].label} />
            <label htmlFor={question.options[index].label}>
              {question.options[index].label}
            </label>
          </div>
        ))}
      </section>
    </div>
  );
}
export default Question;
