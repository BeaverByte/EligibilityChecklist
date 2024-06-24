import { render, screen } from "@testing-library/react";
import {
  QuestionsProvider,
  UseQuestions,
} from "../../src/contexts/QuestionsContext";
import Questionnaire from "../../src/components/Questionnaire/Questionnaire";

describe("Questions", () => {
  it("should not submit if user submitted without selected option", () => {
    render(<Questionnaire />);

    // const button = screen.getByRole("button");
    // expect(button).toBeInTheDocument;
  });
});
