import { render, screen } from "@testing-library/react";
import { WhyHireMe } from "./WhyHireMe";

describe("WhyHireMe", () => {
  it("lista os diferenciais principais", () => {
    render(<WhyHireMe />);
    expect(screen.getByText(/aten(c|ç)(a|ã)o aos m(i|í)nimos detalhes/i)).toBeInTheDocument();
    expect(screen.getByText(/trends do momento/i)).toBeInTheDocument();
    expect(screen.getByText(/edi(c|ç)(a|ã)o em tempo real/i)).toBeInTheDocument();
    expect(screen.getByText(/menos de 1 hora/i)).toBeInTheDocument();
    expect(screen.getByText(/trends personalizadas/i)).toBeInTheDocument();
  });
});
