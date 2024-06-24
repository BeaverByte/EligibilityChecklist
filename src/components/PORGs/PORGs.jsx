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
        <>
          <dt key={index}>{`PORG ${index + 1}`}</dt>
          <dd>{porg}</dd>
        </>
      ))}
      {/* <dt>Porg 1</dt>
      <dd>ABCD</dd>

      <dt>Porg 2</dt>
      <dd>ABCD</dd> */}
    </dl>
  );
}

export default PORGs;
