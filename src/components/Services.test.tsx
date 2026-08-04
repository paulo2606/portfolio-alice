import { render, screen } from "@testing-library/react";
import { Services } from "./Services";

describe("Services", () => {
  it("tem o id que recebe o cta do hero", () => {
    const { container } = render(<Services />);
    expect(container.querySelector("#o-que-eu-faco")).toBeInTheDocument();
  });

  it("apresenta os cards das frentes de atuacao", () => {
    render(<Services />);
    expect(
      screen.getByRole("heading", { name: /stories estrat(e|é)gicos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /cobertura de eventos/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /making of/i })).toBeInTheDocument();
  });

  it("tem um cta para entrar em contato", () => {
    render(<Services />);
    expect(screen.getByRole("link", { name: /entrar em contato/i })).toBeInTheDocument();
  });
});
