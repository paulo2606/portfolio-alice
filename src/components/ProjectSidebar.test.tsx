import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectSidebar } from "./ProjectSidebar";

const FEATURED = {
  src: "/video/projects/festa-15/01.mp4",
  poster: "/video/projects/festa-15/01-poster.jpg",
};
const GALLERY = [
  FEATURED,
  { src: "/video/projects/festa-15/02.mp4", poster: "/video/projects/festa-15/02-poster.jpg" },
  { src: "/video/projects/festa-15/03.mp4", poster: "/video/projects/festa-15/03-poster.jpg" },
];

function renderSidebar() {
  return render(
    <ProjectSidebar
      title="Festa de 15 Anos"
      category="Aniversário de 15 anos"
      summary="Cobertura completa da festa de debute."
      deliverables={["Stories em tempo real"]}
      featured={FEATURED}
      gallery={GALLERY}
      onClose={() => {}}
    />
  );
}

describe("ProjectSidebar", () => {
  it("mostra o video em destaque com controles e autoplay", () => {
    renderSidebar();
    const dialog = screen.getByRole("dialog");
    const featuredVideo = dialog.querySelector("video[autoplay]") as HTMLVideoElement;
    expect(featuredVideo).not.toBeNull();
    expect(featuredVideo).toHaveAttribute("src", FEATURED.src);
    expect(featuredVideo).toHaveAttribute("controls");
  });

  it("mostra categoria, resumo e entregaveis do projeto", () => {
    renderSidebar();
    expect(screen.getByText(/aniversário de 15 anos/i, { selector: "p" })).toBeInTheDocument();
    expect(screen.getByText(/cobertura completa da festa de debute/i)).toBeInTheDocument();
    expect(screen.getByText(/stories em tempo real/i)).toBeInTheDocument();
  });

  it("mostra a galeria com um video pausado para cada video do projeto", () => {
    renderSidebar();
    const dialog = screen.getByRole("dialog");
    const galleryButtons = within(dialog).getAllByRole("button", {
      name: /ver vídeo \d+ de festa de 15 anos/i,
    });
    expect(galleryButtons).toHaveLength(3);

    const firstThumb = galleryButtons[0].querySelector("video");
    expect(firstThumb).toHaveAttribute("src", GALLERY[0].src);
    expect(firstThumb).toHaveAttribute("poster", GALLERY[0].poster);
    expect(firstThumb).toHaveAttribute("preload", "metadata");
    expect(firstThumb).toHaveProperty("muted", true);
    expect(firstThumb).not.toHaveAttribute("autoplay");
  });

  it("abre o modal de video ao clicar num item da galeria", async () => {
    const user = userEvent.setup();
    renderSidebar();
    const dialog = screen.getByRole("dialog");
    const galleryButtons = within(dialog).getAllByRole("button", {
      name: /ver vídeo \d+ de festa de 15 anos/i,
    });

    await user.click(galleryButtons[1]);

    const modal = screen.getByRole("dialog", { name: /vídeo 2/i });
    const modalVideo = modal.querySelector("video[controls]");
    expect(modalVideo).toHaveAttribute("src", GALLERY[1].src);
  });

  it("trava o scroll da pagina de fundo enquanto o painel esta aberto", () => {
    const { unmount } = renderSidebar();

    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.position).toBe("fixed");

    unmount();

    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.position).toBe("");
  });

  it("fecha o modal de video com Esc sem fechar o painel", async () => {
    const user = userEvent.setup();
    renderSidebar();
    const dialog = screen.getByRole("dialog");
    const galleryButtons = within(dialog).getAllByRole("button", {
      name: /ver vídeo \d+ de festa de 15 anos/i,
    });
    await user.click(galleryButtons[0]);
    expect(screen.getAllByRole("dialog")).toHaveLength(2);

    await user.keyboard("{Escape}");

    expect(screen.getAllByRole("dialog")).toHaveLength(1);
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-labelledby",
      "project-sidebar-title"
    );
  });
});
