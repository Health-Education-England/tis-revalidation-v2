import { DataTable } from "@badeball/cypress-cucumber-preprocessor";

export class Page {
  private static pages = [
    { label: "Connections", url: "connections" },
    { label: "Connection", url: "connection/$id" },

    {
      label: "Discrepancies",
      url: "connections?active=gmcReferenceNumber&direction=asc&pageIndex=0&filter=discrepancies"
    },
    { label: "Recommendations", url: "recommendations" },
    { label: "Recommendation", url: "recommendation/$id" },

    {
      label: "Under notice",
      url: "recommendations?active=submissionDate&direction=asc&pageIndex=0&filter=underNotice"
    }
  ];

  private static getPageUrl(pageName: string, id: string = ""): string | null {
    let pageUrl: string | null =
      this.pages.find((page) => page.label === pageName)?.url || null;
    if (pageUrl && pageUrl.includes("$id") && id) {
      pageUrl = pageUrl.replace("$id", id);
    }
    return pageUrl;
  }

  static load(pageName: string, id: string = "") {
    const pageUrl = this.getPageUrl(pageName, id);
    cy.visit(pageUrl);
    cy.wait(2000);
  }

  static verifyElements(
    selector: string,
    keyValues?: DataTable,
    status: string = "exist"
  ) {
    keyValues.hashes().forEach((item) => {
      let element;
      const value = item["value"];
      if (item["selector"]) {
        element = item["selector"];
      } else {
        element = selector;
      }
      Page.verifyElement(element, value, status);
    });
  }
  static verifyElement(
    selector: string,
    value?: string,
    status: string = "exist"
  ) {
    if (value) {
      cy.get(selector).contains(value).should(status);
    } else {
      cy.get(selector).should(status);
    }
  }

  static verifyLoaded(pageName, id?) {
    cy.url().should("include", this.getPageUrl(pageName, id));
  }

  static verifyDialogMessage(message: string) {
    cy.wait(1000);
    cy.get("mat-dialog-container mat-dialog-content").contains(message);
  }

  static generateValue(valueType: string) {
    switch (valueType) {
      case "$randomGMCNumber":
        return Math.floor(Math.random() * 10000000).toString();
      case "$randomNumber":
        return Math.floor(Math.random() * 100).toString();
      case "$randomString":
        return Math.random().toString(36).substring(2, 12);
    }
  }
}
