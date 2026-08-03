import { render } from "@testing-library/react";
import { RuleGrid } from "./RuleGrid";

describe("RuleGrid", () => {
  it("e puramente decorativa e nao interfere na leitura de tela", () => {
    const { container } = render(<RuleGrid />);
    const grid = container.firstElementChild;
    expect(grid).toHaveAttribute("aria-hidden", "true");
  });

  it("renderiza reguas horizontais e verticais", () => {
    const { container } = render(<RuleGrid />);
    expect(container.querySelectorAll("[data-rule='horizontal']").length).toBeGreaterThan(0);
    expect(container.querySelectorAll("[data-rule='vertical']").length).toBeGreaterThan(0);
  });
});
