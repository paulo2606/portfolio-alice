import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Projects } from "./Projects";

function getDesktopMosaic() {
  return screen.getByTestId("desktop-mosaic");
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

  it("renderiza uma foto com nome para cada projeto do mosaico", () => {
    render(<Projects />);
    const desktop = getDesktopMosaic();
    expect(within(desktop).getByAltText(/casamento ao p(o|ô)r do sol/i)).toBeInTheDocument();
    expect(within(desktop).getAllByText(/casamento ao p(o|ô)r do sol/i).length).toBeGreaterThan(0);
    expect(within(desktop).getByAltText(/anivers(a|á)rio de 15 anos/i)).toBeInTheDocument();
    expect(within(desktop).getByAltText(/documentário de marca/i)).toBeInTheDocument();
  });

  it("renderiza um mosaico reduzido e proprio para mobile", () => {
    render(<Projects />);
    const mobile = screen.getByTestId("mobile-mosaic");
    expect(within(mobile).queryByAltText(/ch(a|á) revela(c|ç)(a|ã)o/i)).not.toBeInTheDocument();
    expect(within(mobile).getByAltText(/casamento ao p(o|ô)r do sol/i)).toBeInTheDocument();
  });

  it("nao mostra o painel lateral antes de um clique", () => {
    render(<Projects />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("abre o painel com o player ao clicar no projeto de video", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    await user.click(
      within(getDesktopMosaic()).getByRole("button", { name: /ver projeto: making of casamento/i })
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(/making of casamento/i)).toBeInTheDocument();
    expect(
      within(dialog).getByAltText(/alian(c|ç)as e buqu(e|ê) nas m(a|ã)os dos noivos/i)
    ).toBeInTheDocument();
  });

  it("abre o painel so com foto de capa e galeria para projetos sem video", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    await user.click(
      within(getDesktopMosaic()).getByRole("button", {
        name: /ver projeto: casamento ao p(o|ô)r do sol/i,
      })
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog.querySelector("video")).not.toBeInTheDocument();
    expect(
      within(dialog).getByAltText(/noivos de m(a|ã)os dadas ao entardecer/i)
    ).toBeInTheDocument();
  });

  it("as fotos da galeria comecam em preto e branco e ficam coloridas no hover", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    await user.click(
      within(getDesktopMosaic()).getByRole("button", { name: /ver projeto: making of casamento/i })
    );

    const dialog = screen.getByRole("dialog");
    const photo = within(dialog).getByAltText(
      /alian(c|ç)as e buqu(e|ê) nas m(a|ã)os dos noivos/i
    );
    expect(photo).toHaveClass("grayscale");
    expect(photo).toHaveClass("group-hover:grayscale-0");
  });

  it("amplia a foto da galeria ao clicar nela", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    await user.click(
      within(getDesktopMosaic()).getByRole("button", { name: /ver projeto: making of casamento/i })
    );

    await user.click(
      screen.getByRole("button", {
        name: /ampliar foto: alian(c|ç)as e buqu(e|ê) nas m(a|ã)os dos noivos/i,
      })
    );

    expect(
      screen.getAllByAltText(/alian(c|ç)as e buqu(e|ê) nas m(a|ã)os dos noivos/i)
    ).toHaveLength(2);
  });

  it("fecha o painel com Esc e devolve o foco ao card que abriu", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    const trigger = within(getDesktopMosaic()).getByRole("button", {
      name: /ver projeto: making of casamento/i,
    });
    await user.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
