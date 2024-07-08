import { ROUTES } from "./routes";

export function handleNavigation(e, navigate) {
  e.preventDefault();

  const buttonType = e.target.name;

  switch (buttonType) {
    case "eligibility":
      navigate(ROUTES.ELIGIBILITY);
      break;

    case "home":
      navigate(ROUTES.ROOT);
      break;

    case "effectivedate":
      navigate(ROUTES.EFFECTIVEDATE);
      break;

    default:
      break;
  }
}
