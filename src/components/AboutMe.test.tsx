import { render, screen } from "@testing-library/react";
import { AboutMe } from "./AboutMe";

describe("AboutMe", () => {
  it("tem um cta discreto para contato ao final do texto", () => {
    render(<AboutMe />);
    const cta = screen.getByRole("link", { name: /vamos conversar/i });
    expect(cta).toHaveAttribute("href", "#contato");
  });
});
