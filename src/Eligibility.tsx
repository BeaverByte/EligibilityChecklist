import Questionnaire from "./components/Questionnaire/Questionnaire";

function Eligibility() {
  return (
    <div>
      <Questionnaire />
      <div>
        <dl>
          <dt>Hire Date</dt>
          <dd>01/01/1990</dd>

          <dt>Eligibility Date</dt>
          <dd>01/01/1990</dd>

          <dt>Late Date</dt>
          <dd>01/01/1990</dd>
        </dl>
      </div>
      <div>
        <dl>
          <dt>Porg 1</dt>
          <dd>ABCD</dd>

          <dt>Porg 2</dt>
          <dd>ABCD</dd>
        </dl>
        <h2>Riders</h2>
        <section>
          <table className="riders">
            <thead>
              <tr>
                <th>Header 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default Eligibility;
