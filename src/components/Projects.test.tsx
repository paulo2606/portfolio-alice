import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Projects } from "./Projects";
import { projects } from "@/lib/projects";

const firstProject = projects[0];

describe("Projects", () => {
  it("nao mostra o modal antes de um clique", () => {
    render(<Projects />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("abre o modal com o texto editorial do projeto ao clicar no card", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    await user.click(screen.getByRole("button", { name: /passeio, os detalhes/i }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(firstProject.description[0].slice(0, 20), "i"))
    ).toBeInTheDocument();
  });

  it("abre a visualizacao ampliada ao clicar numa miniatura do mosaico", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    await user.click(screen.getByRole("button", { name: /passeio, os detalhes/i }));

    const thumbnail = screen.getByRole("button", {
      name: firstProject.gallery[1].alt,
    });
    await user.click(thumbnail);

    expect(screen.getByTestId("lightbox-image")).toHaveAttribute(
      "alt",
      firstProject.gallery[1].alt
    );
  });

  it("fecha com Esc e devolve o foco ao card que abriu o modal", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    const trigger = screen.getByRole("button", { name: /passeio, os detalhes/i });
    await user.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
