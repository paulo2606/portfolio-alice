import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
  it("renderiza sem quebrar", () => {
    render(<Page />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
