import { render, screen } from "@testing-library/react";
import Example from "../app/components/Example";

describe("Example Component", () => {
  it("renders Hello Jest", () => {
    render(<Example />);
    expect(screen.getByText("Hello Jest")).toBeInTheDocument();
  });
});
