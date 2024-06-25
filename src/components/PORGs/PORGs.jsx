/** Show visual for PORGs that member has. A PORG is a Provider Organization
 * @component
 * @returns
 */

import { UseBenefits } from "../../contexts/QuestionsContext";

function PORGs() {
  const { porgs } = UseBenefits();
  return (
    <dl>
      {porgs.map((porg, index) => (
        <div key={index}>
          <dt>{`PORG ${index + 1}`}</dt>
          <dd>{porg}</dd>
        </div>
      ))}
    </dl>
  );
}

export default PORGs;
