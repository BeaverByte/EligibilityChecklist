function Question({ question, onChange }) {
  return (
    <div>
      <h1 className="question">Question</h1>
      <section className="options">
        <input
          type="checkbox"
          name="option1"
          onChange={(e) => onChange(e)}
          checked
        />
        <label htmlFor="option1">Option 1</label>
        <input type="checkbox" name="option2" />
        <label htmlFor="option2">Option 2</label>
      </section>
    </div>
  );
}
export default Question;
