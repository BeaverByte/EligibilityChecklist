/**
 * @component
 * @returns
 */

import { UseBenefits } from "../../contexts/QuestionsContext";

function Riders() {
  const { riders } = UseBenefits();
  return (
    <section>
      {riders.length === 0 ? (
        <div></div>
      ) : (
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
            </tr>
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Riders;
