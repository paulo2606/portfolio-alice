import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Projects } from "./Projects";

function getDesktopMosaic() {
  return screen.getByTestId("desktop-mosaic");
}

function getMobileMosaic() {
  return screen.getByTestId("mobile-mosaic");
}

describe("Projects", () => {
  it("tem o id que recebe o cta do hero", () => {
    const { container } = render(<Projects />);
    expect(container.querySelector("#o-que-eu-faco")).toBeInTheDocument();
  });

  it("usa o titulo O que faço", () => {
    render(<Projects />);
    expect(screen.getByRole("heading", { name: /o que fa(c|ç)o/i })).toBeInTheDocument();
  });

  it("renderiza 8 cards de video no mosaico desktop, 2 para cada um dos 4 projetos", () => {
    render(<Projects />);
    const desktop = getDesktopMosaic();
    expect(
      within(desktop).getAllByRole("button", { name: /ver projeto: festa de 15 anos/i })
    ).toHaveLength(2);
    expect(
      within(desktop).getAllByRole("button", { name: /ver projeto: casamento.chá de panela/i })
    ).toHaveLength(2);
    expect(
      within(desktop).getAllByRole("button", { name: /ver projeto: aniversários/i })
    ).toHaveLength(2);
    expect(
      within(desktop).getAllByRole("button", { name: /ver projeto: eventos/i })
    ).toHaveLength(2);
  });

  it("cada card usa video com poster, tocando automaticamente em loop e mudo", () => {
    render(<Projects />);
    const [firstCard] = within(getDesktopMosaic()).getAllByRole("button", {
      name: /ver projeto: festa de 15 anos/i,
    });
    const video = firstCard.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("src", "/video/projects/festa-15/festa-15-1.mp4");
    expect(video).toHaveAttribute("poster", "/video/projects/festa-15/festa-15-1-poster.jpg");
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveProperty("muted", true);
    expect(video).toHaveProperty("loop", true);
  });

  it("renderiza um mosaico mobile cobrindo os 4 projetos", () => {
    render(<Projects />);
    const mobile = getMobileMosaic();
    expect(
      within(mobile).getAllByRole("button", { name: /ver projeto: festa de 15 anos/i })
    ).toHaveLength(2);
    expect(
      within(mobile).getAllByRole("button", { name: /ver projeto: casamento.chá de panela/i })
    ).toHaveLength(1);
    expect(
      within(mobile).getAllByRole("button", { name: /ver projeto: aniversários/i })
    ).toHaveLength(1);
    expect(
      within(mobile).getAllByRole("button", { name: /ver projeto: eventos/i })
    ).toHaveLength(1);
  });

  it("nao mostra nenhum dialogo antes de um clique", () => {
    render(<Projects />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("clicar num card de festa de 15 anos abre o painel lateral com a galeria completa", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    const [firstCard] = within(getDesktopMosaic()).getAllByRole("button", {
      name: /ver projeto: festa de 15 anos/i,
    });
    await user.click(firstCard);

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(/festa de 15 anos/i)).toBeInTheDocument();
    expect(dialog.querySelectorAll("video")).toHaveLength(7);
  });

  it("clicar num card de eventos abre direto o modal de video, sem painel lateral", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    const [firstCard] = within(getDesktopMosaic()).getAllByRole("button", {
      name: /ver projeto: eventos/i,
    });
    await user.click(firstCard);

    const dialog = screen.getByRole("dialog");
    expect(dialog.querySelector("#video-modal-title")).toHaveTextContent(/eventos/i);
    const video = dialog.querySelector("video");
    expect(video).toHaveAttribute("src", "/video/projects/eventos/eventos-1.mp4");
    expect(dialog.querySelector("#project-sidebar-title")).not.toBeInTheDocument();
  });

  it("fecha o painel com Esc e devolve o foco ao card que abriu", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    const trigger = within(getDesktopMosaic()).getAllByRole("button", {
      name: /ver projeto: aniversários/i,
    })[0];
    await user.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
