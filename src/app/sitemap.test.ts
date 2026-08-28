import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lista a home com prioridade maxima", () => {
    const result = sitemap();
    expect(result).toHaveLength(1);
    expect(result[0].url).toMatch(/^https?:\/\/.+$/);
    expect(result[0].priority).toBe(1);
    expect(result[0].lastModified).toBeInstanceOf(Date);
  });
});
