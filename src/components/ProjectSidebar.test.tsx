import { render, screen } from "@testing-library/react";
import { ProjectSidebar } from "./ProjectSidebar";

describe("ProjectSidebar", () => {
  it("mostra categoria, resumo e entregaveis do projeto", () => {
    render(
      <ProjectSidebar
        title="Casamento ao Pôr do Sol"
        cover={{ src: "/images/cover.jpg", alt: "Capa" }}
        category="Casamento"
        summary="Cobertura completa da cerimonia e festa, com stories em tempo real."
        deliverables={["Stories editados durante o evento", "Video highlight em ate 24h"]}
        gallery={[]}
        onClose={() => {}}
      />
    );

    expect(screen.getByText(/casamento/i, { selector: "p" })).toBeInTheDocument();
    expect(
      screen.getByText(/cobertura completa da cerimonia e festa/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/stories editados durante o evento/i)).toBeInTheDocument();
    expect(screen.getByText(/video highlight em ate 24h/i)).toBeInTheDocument();
  });
});
