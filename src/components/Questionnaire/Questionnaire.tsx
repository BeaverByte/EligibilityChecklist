import { useState } from "react";
function Questionnaire() {
  const [question, setQuestion] = useState(1);
  return (
    <form className="questionnaire">
      <h1>Question</h1>
      <section className="answers">
        <input type="checkbox" name="option1" />
        <label htmlFor="option1">Option 1</label>
        <input type="checkbox" name="option2" />
        <label htmlFor="option2">Option 2</label>
      </section>

      <button type="button">Previous</button>
      <button type="button">Next</button>
    </form>
  );
}

export default Questionnaire;
