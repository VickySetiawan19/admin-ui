/// <reference types="cypress" />

/**
 * ============================================================
 * E2E Test: User Mengakses Halaman Dashboard (Overview)
 * ============================================================
 *
 * Skenario yang diuji:
 *  1. Redirect ke Login jika Belum Autentikasi
 *  2. Login & Tampil Dashboard
 *  3. Verifikasi Layout & Komponen Dashboard
 *  4. Interaksi Filter Transaksi
 *  5. Navigasi Sidebar
 *  6. Logout dari Dashboard
 */

describe("Dashboard (Overview) Page", () => {
  // ──────────────────────────────────────────────────────
  // Helper: Setup intercept untuk API goals dan bills
  // ──────────────────────────────────────────────────────
  const setupApiIntercepts = () => {
    cy.intercept("GET", "**/goals", {
      fixture: "goals.json",
    }).as("getGoals");

    cy.intercept("GET", "**/bills", {
      fixture: "bills.json",
    }).as("getBills");
  };

  // ──────────────────────────────────────────────────
  // Helper: Login secara programmatic + intercept API
  // ──────────────────────────────────────────────────
  const loginAndVisitDashboard = () => {
    setupApiIntercepts();
    cy.loginByToken();
    cy.visit("/");
    cy.wait(["@getGoals", "@getBills"]);
  };

  // ============================================================
  // SKENARIO 1: Redirect ke Login jika Belum Autentikasi
  // ============================================================
  describe("Skenario 1: Redirect ke Login jika Belum Autentikasi", () => {
    it("harus redirect ke /login ketika user mengakses / tanpa login", () => {
      // Pastikan tidak ada token di localStorage
      cy.clearLocalStorage();
      cy.visit("/");

      // User harus di-redirect ke halaman login
      cy.url().should("include", "/login");
    });
  });

  // ============================================================
  // SKENARIO 2: Login & Tampil Dashboard
  // ============================================================
  describe("Skenario 2: Login & Tampil Dashboard", () => {
    it("harus berhasil login via UI dan redirect ke dashboard", () => {
      // Intercept login API
      cy.intercept("POST", "**/login", {
        statusCode: 200,
        body: {
          refreshToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
            "eyJuYW1lIjoiVGVzdCBVc2VyIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9." +
            "mock_signature",
        },
      }).as("loginRequest");

      // Intercept dashboard API calls
      setupApiIntercepts();

      // Buka halaman login
      cy.visit("/login");

      // Verifikasi form login tampil
      cy.get("#email").should("be.visible");
      cy.get("#password").should("be.visible");

      // Isi form
      cy.fixture("user").then((user) => {
        cy.get("#email").type(user.email);
        cy.get("#password").type(user.password);
      });

      // Klik tombol Login
      cy.get("button").contains("Login").click();

      // Tunggu request login selesai
      cy.wait("@loginRequest");

      // Verifikasi redirect ke dashboard
      cy.url().should("eq", Cypress.config("baseUrl") + "/");

      // Verifikasi dashboard tampil (ada nama user di header)
      cy.contains("Test User").should("be.visible");
    });
  });

  // ============================================================
  // SKENARIO 3: Verifikasi Layout & Komponen Dashboard
  // ============================================================
  describe("Skenario 3: Verifikasi Layout & Komponen Dashboard", () => {
    beforeEach(() => {
      loginAndVisitDashboard();
    });

    // ── 3a. Sidebar ──
    it("harus menampilkan sidebar dengan logo, menu navigasi, dan logout", () => {
      // Logo FINEbank.IO
      cy.get("aside").within(() => {
        cy.contains("FINE").should("be.visible");
        cy.contains("bank").should("be.visible");
        cy.contains(".IO").should("be.visible");
      });

      // Menu navigasi lengkap
      const menus = [
        "Overview",
        "Balances",
        "Transaction",
        "Bills",
        "Expenses",
        "Goals",
        "Settings",
      ];
      menus.forEach((menuName) => {
        cy.get("aside nav").contains(menuName).should("exist");
      });

      // Menu Overview harus aktif (memiliki class bg-primary)
      cy.get("aside nav a")
        .contains("Overview")
        .closest("a")
        .should("have.class", "bg-primary");

      // Tombol Logout tampil
      cy.get("aside").contains("Logout").should("exist");
    });

    // ── 3b. Header ──
    it("harus menampilkan header dengan nama user dan notifikasi", () => {
      cy.get("header").within(() => {
        // Nama user
        cy.contains("Test User").should("be.visible");

        // Tanggal
        cy.contains("May 19, 2023").should("be.visible");

        // Ikon notifikasi (MUI NotificationsIcon)
        cy.get("[data-testid='NotificationsIcon']").should("exist");

        // Search input
        cy.get("input").should("exist");
      });
    });

    // ── 3c. Card Total Balance ──
    it('harus menampilkan card "Total Balance" dengan informasi saldo', () => {
      cy.contains("Total Balance").should("be.visible");

      // Verifikasi ada informasi balance (dari static data: $25000)
      cy.contains("$25000").should("exist");

      // Verifikasi ada link "All account"
      cy.contains("All account").should("exist");

      // Verifikasi ada tipe akun
      cy.contains("Account Type").should("exist");
    });

    // ── 3d. Card Goals ──
    it('harus menampilkan card "Goals" dengan data dari API', () => {
      cy.contains("Goals").should("be.visible");

      // Data dari fixture: target_amount=20000, present_amount=12500
      cy.contains("20000").should("exist");
      cy.contains("12500").should("exist");

      // Label
      cy.contains("Target Achieved").should("exist");
      cy.contains("This Month Target").should("exist");
      cy.contains("Target vs Achievement").should("exist");
    });

    // ── 3e. Card Bills ──
    it('harus menampilkan card "Bills" dengan data dari API', () => {
      // Judul card
      cy.contains("div.text-2xl", "Bills").should("be.visible");

      // Data dari fixture
      cy.contains("Figma - Yearly Plan").should("exist");
      cy.contains("$150").should("exist");

      cy.contains("Adobe Inc - Yearly Plan").should("exist");
      cy.contains("$559").should("exist");

      // Last Charge info
      cy.contains("Last Charge").should("exist");
    });

    // ── 3f. Card Recent Transactions ──
    it('harus menampilkan card "Recent Transactions" dengan tab filter dan daftar transaksi', () => {
      cy.contains("Recent Transactions").should("be.visible");

      // Tab filter
      cy.contains("button", "All").should("be.visible");
      cy.contains("button", "Revenue").should("be.visible");
      cy.contains("button", "Expense").should("be.visible");

      // Tab "All" harus aktif secara default (memiliki border-primary)
      cy.contains("button", "All").should("have.class", "border-primary");

      // Daftar transaksi (dari static data)
      cy.contains("GTR 5").should("exist");
      cy.contains("Gadget & Gear").should("exist");
      cy.contains("Polo Shirt").should("exist");
      cy.contains("Biriyani").should("exist");
      cy.contains("Project Fee").should("exist");
    });

    // ── 3g. Card Statistics ──
    it('harus menampilkan card "Statistics" dengan chart', () => {
      cy.contains("Statistics").should("be.visible");

      // Dropdown Weekly Comparison
      cy.get("select").contains("Weekly Comparison").should("exist");

      // Chart bar (MUI BarChart menggunakan SVG)
      cy.get(".MuiBarChart-root, svg.MuiChartsSurface-root").should("exist");
    });

    // ── 3h. Card Expenses Breakdown ──
    it('harus menampilkan card "Expenses Breakdown" dengan kategori pengeluaran', () => {
      cy.contains("Expenses Breakdown").should("be.visible");

      // Kategori (dari static data)
      const categories = [
        "Housing",
        "Food",
        "Transportation",
        "Entertainment",
        "Shopping",
        "Others",
      ];
      categories.forEach((category) => {
        cy.contains(category).should("exist");
      });

      // Amounts
      cy.contains("$250").should("exist");
      cy.contains("$350").should("exist");
    });
  });

  // ============================================================
  // SKENARIO 4: Interaksi Filter Transaksi
  // ============================================================
  describe("Skenario 4: Interaksi Filter Transaksi", () => {
    beforeEach(() => {
      loginAndVisitDashboard();
    });

    it('harus menampilkan hanya transaksi Revenue ketika tab "Revenue" diklik', () => {
      // Klik tab Revenue
      cy.contains("button", "Revenue").click();

      // Tab Revenue harus aktif
      cy.contains("button", "Revenue").should("have.class", "border-primary");

      // Transaksi Revenue harus tampil ("Project Fee" adalah satu-satunya Revenue)
      cy.contains("Project Fee").should("exist");
    });

    it('harus menampilkan hanya transaksi Expense ketika tab "Expense" diklik', () => {
      // Klik tab Expense
      cy.contains("button", "Expense").click();

      // Tab Expense harus aktif
      cy.contains("button", "Expense").should("have.class", "border-primary");

      // Transaksi Expense harus tampil
      cy.contains("GTR 5").should("exist");
      cy.contains("Polo Shirt").should("exist");
      cy.contains("Biriyani").should("exist");
    });

    it('harus menampilkan semua transaksi ketika tab "All" diklik kembali', () => {
      // Klik Expense dulu, lalu kembali ke All
      cy.contains("button", "Expense").click();
      cy.contains("button", "All").click();

      // Tab All harus aktif
      cy.contains("button", "All").should("have.class", "border-primary");

      // Semua transaksi harus tampil (termasuk Revenue & Expense)
      cy.contains("GTR 5").should("exist");
      cy.contains("Project Fee").should("exist");
    });
  });

  // ============================================================
  // SKENARIO 5: Navigasi Sidebar
  // ============================================================
  describe("Skenario 5: Navigasi Sidebar", () => {
    beforeEach(() => {
      loginAndVisitDashboard();
    });

    it("harus navigasi ke halaman /balance ketika menu Balances diklik", () => {
      cy.get("aside nav").contains("Balances").click();
      cy.url().should("include", "/balance");
    });

    it("harus navigasi ke halaman /expense ketika menu Expenses diklik", () => {
      cy.get("aside nav").contains("Expenses").click();
      cy.url().should("include", "/expense");
    });

    it("harus kembali ke dashboard (/) ketika menu Overview diklik", () => {
      // Navigasi ke Balances dulu
      cy.get("aside nav").contains("Balances").click();
      cy.url().should("include", "/balance");

      // Setup intercept lagi karena akan fetch ulang
      setupApiIntercepts();

      // Kembali ke Overview
      cy.get("aside nav").contains("Overview").click();
      cy.url().should("eq", Cypress.config("baseUrl") + "/");
    });
  });

  // ============================================================
  // SKENARIO 6: Logout dari Dashboard
  // ============================================================
  describe("Skenario 6: Logout dari Dashboard", () => {
    it("harus logout dan redirect ke /login", () => {
      loginAndVisitDashboard();

      // Intercept logout API
      cy.intercept("POST", "**/logout", {
        statusCode: 200,
        body: { msg: "Logout berhasil" },
      }).as("logoutRequest");

      // Klik tombol Logout
      cy.get("aside").contains("Logout").click();

      // Loading backdrop "Logging Out" harus tampil
      cy.contains("Logging Out").should("be.visible");

      // Setelah timeout (1200ms), user harus di-redirect ke /login
      cy.url({ timeout: 5000 }).should("include", "/login");

      // Token harus dihapus dari localStorage
      cy.window().then((win) => {
        expect(win.localStorage.getItem("token")).to.be.null;
      });
    });

    it("tidak bisa mengakses dashboard setelah logout", () => {
      // Pastikan tidak ada token
      cy.clearLocalStorage();

      // Coba akses dashboard
      cy.visit("/");

      // Harus tetap di halaman login
      cy.url().should("include", "/login");
    });
  });
});
