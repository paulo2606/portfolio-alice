import { render, screen } from "@testing-library/react";
import { Services } from "./Services";

describe("Services", () => {
  it("tem o id que recebe o cta do hero", () => {
    const { container } = render(<Services />);
    expect(container.querySelector("#o-que-eu-faco")).toBeInTheDocument();
  });

  it("lista as cinco frentes de atuacao", () => {
    render(<Services />);
    expect(
      screen.getByText(/planejamento e cria(c|ç)(a|ã)o de stories estrat(e|é)gicos/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/design criativo/i)).toBeInTheDocument();
    expect(screen.getByText(/gest(a|ã)o completa de stories/i)).toBeInTheDocument();
    expect(
      screen.getByText(/cobertura de eventos com storytelling em tempo real/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/making of/i)).toBeInTheDocument();
  });
});
