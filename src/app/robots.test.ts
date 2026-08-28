import robots from "./robots";

describe("robots", () => {
  it("permite indexacao total e aponta para o sitemap", () => {
    const result = robots();
    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toMatch(/\/sitemap\.xml$/);
  });
});
