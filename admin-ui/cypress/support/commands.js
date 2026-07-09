// ***********************************************
// Custom commands untuk E2E test admin-ui
// ***********************************************

/**
 * Custom command: Login via programmatic (set token langsung ke localStorage)
 * Menggunakan mock JWT token agar test independen dari backend.
 *
 * Payload JWT yang di-encode:
 *   { "name": "Test User", "email": "test@example.com", "iat": ..., "exp": ... }
 */
Cypress.Commands.add("loginByToken", () => {
  // Mock JWT token (header.payload.signature)
  // Payload: {"name":"Test User","email":"test@example.com","iat":1700000000,"exp":9999999999}
  const mockToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJuYW1lIjoiVGVzdCBVc2VyIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9." +
    "mock_signature";

  localStorage.setItem("token", mockToken);
});

/**
 * Custom command: Login via UI form
 * Mengisi form login dan klik tombol Login.
 */
Cypress.Commands.add("loginViaUI", (email, password) => {
  cy.visit("/login");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("button").contains("Login").click();
});
