import { version } from "../../package.json";

describe("Footer Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  it("should display the correct version number", () => {
    cy.get("footer").contains(`Version: ${version}`).should("be.visible");
  });
});
