import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders a loading spinner", () => {
      // setup request mock wait some time before continuing
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
        delay: 1000, // Add a delay to show the loading spinner
      }).as("getProjectsDelayed");

      // during wait, open project page
      cy.visit(`http://localhost:3000/dashboard`);

      // fetch spinner
      cy.get('[data-cy="loading"]').should("be.visible");

      // wait for request to resolve
      cy.wait("@getProjectsDelayed");

      // spinner should be removed
      cy.get('[data-cy="loading"]').should("not.exist");
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
          // Add new assertions for status text
          if (mockProjects[index].status === "error") {
            cy.wrap($el).contains("Critical");
          } else if (mockProjects[index].status === "info") {
            cy.wrap($el).contains("Stable");
          } else if (mockProjects[index].status === "warning") {
            cy.wrap($el).contains("Warning");
          }
        });
    });
  });
});
