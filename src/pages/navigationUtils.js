import { ROUTES } from "./routes";
export function handleNavigation(e, navigate) {
  e.preventDefault();

  const buttonType = e.target.name;

  // Code here to handle button clicks

  switch (buttonType) {
    case "eligibility":
      navigate(ROUTES.ELIGIBILITY);
      break;

    case "home":
      navigate(ROUTES.ROOT);
      break;

    default:
      break;
  }
}
