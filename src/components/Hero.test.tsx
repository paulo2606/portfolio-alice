import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("exibe o nome e a chamada de storymaker", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { name: /alice santos/i })).toBeInTheDocument();
    expect(screen.getByText(/storymaker/i)).toBeInTheDocument();
  });

  it("reproduz o video de fundo em loop, mudo e com poster", () => {
    const { container } = render(<Hero />);
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("src", "/video/hero.mp4");
    expect(video).toHaveAttribute("poster", "/video/hero-poster.jpg");
    expect(video).toHaveProperty("loop", true);
    expect(video).toHaveProperty("muted", true);
    expect(video).toHaveAttribute("playsInline");
  });

  it("tem um cta acessivel para rolar para a proxima secao", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /conhecer o trabalho|ver mais|descubra/i });
    expect(cta).toHaveAttribute("href", "#o-que-eu-faco");
  });

  it("exibe as redes sociais no canto superior direito", () => {
    render(<Hero />);
    const instagram = screen.getByRole("link", { name: /instagram/i });
    expect(instagram).toHaveAttribute("href", expect.stringContaining("instagram.com"));
    expect(instagram).toHaveAttribute("target", "_blank");
    expect(instagram.getAttribute("rel")).toEqual(expect.stringContaining("noopener"));
  });
});
