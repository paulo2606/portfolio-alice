import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { projects } from "@/lib/projects";

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

describe("ProjectsCarousel", () => {
  it("renderiza um card acessivel para cada projeto", () => {
    render(<ProjectsCarousel onSelect={() => {}} />);
    projects.forEach((project) => {
      expect(
        screen.getByRole("button", { name: new RegExp(escapeRegExp(project.title), "i") })
      ).toBeInTheDocument();
    });
  });

  it("chama onSelect com o slug do projeto clicado", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<ProjectsCarousel onSelect={onSelect} />);
    await user.click(
      screen.getByRole("button", { name: new RegExp(escapeRegExp(projects[0].title), "i") })
    );
    expect(onSelect).toHaveBeenCalledWith(projects[0].slug);
  });
});
