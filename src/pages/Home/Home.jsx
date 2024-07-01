import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import Eligibility from "../../Eligibility";
import { ROUTES } from "../routes";
import { handleNavigation } from "../navigationUtils";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={(e) => handleNavigation(e, navigate)}
        name={"eligibility"}
      >
        Eligibility
      </Button>
    </>
  );
}
