/**
 * @component
 * @returns
 */

import { UseBenefits } from "../../contexts/QuestionsContext";

function Riders() {
  const { riders, porgs } = UseBenefits();
  return (
    <section>
      <table className="riders">
        <thead>
          <tr>
            <th>Riders</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {riders.map((rider, index) => (
              <td key={index}>{rider}</td>
            ))}
            {/*
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
            <td>Data 4</td>
            <td>Data 5</td>
            */}
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Riders;
