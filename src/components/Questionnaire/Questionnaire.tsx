function Questionnaire() {
  return (
    <div className="questionnaire">
      <div>Question</div>
      <input type="checkbox" name="option1" />
      <label htmlFor="option1">Option 1</label>
      <input type="checkbox" name="option2" />
      <label htmlFor="option2">Option 2</label>

      <button type="button">Previous</button>
      <button type="button">Next</button>
    </div>
  );
}

export default Questionnaire;
