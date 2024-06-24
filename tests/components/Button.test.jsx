import { render, screen } from "@testing-library/react";
import Button from "../../src/components/Button/Button";

// itr for import snippet from testing-library

describe("Button", () => {
  it("should render Button that can take children", () => {
    render(<Button>Ugh</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument;
  });
});
