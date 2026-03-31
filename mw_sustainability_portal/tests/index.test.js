/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

describe("index.html structure tests", () => {
  let html;

  beforeAll(() => {
    const filePath = path.join(__dirname, "../public/index.html");
    html = fs.readFileSync(filePath, "utf8");
    document.documentElement.innerHTML = html.toString();
  });

  test("Header text is correct", () => {
    const header = document.getElementById("Header");
    expect(header).not.toBeNull();
    expect(header.textContent.trim()).toBe("Malawi Sustainablity Development");
  });

  test("Admin login button exists and links to login.html", () => {
    const btn = document.querySelector(".rounded-square-button");
    expect(btn).not.toBeNull();
    expect(btn.textContent.trim()).toBe("ADMIN LOGIN");
    expect(btn.getAttribute("onclick")).toBe("window.location.href='login.html'");
  });

  test("Image loads correctly", () => {
    const img = document.querySelector("img");
    expect(img).not.toBeNull();
    expect(img.getAttribute("src")).toBe("images/MWSustainabilityProjects_Products3.jpeg");
  });

  test("Mission button links to mission.html", () => {
    const missionBtn = [...document.querySelectorAll(".circle-button")]
      .find(btn => btn.textContent.trim() === "MISSION");

    expect(missionBtn).not.toBeNull();
    expect(missionBtn.getAttribute("onclick")).toBe("window.location.href='mission.html'");
  });

  test("Projects button calls getProjectsPost()", () => {
    const projectsBtn = [...document.querySelectorAll(".circle-button")]
      .find(btn => btn.textContent.trim() === "PROJECTS");

    expect(projectsBtn).not.toBeNull();
    expect(projectsBtn.getAttribute("onclick")).toBe("getProjectsPost()");
  });

  test("Contact button links to contactpage.html", () => {
    const contactBtn = [...document.querySelectorAll(".circle-button")]
      .find(btn => btn.textContent.trim() === "CONTACT");

    expect(contactBtn).not.toBeNull();
    expect(contactBtn.getAttribute("onclick")).toBe("window.location.href='contactpage.html'");
  });

  test("Gallery Demo button calls getindivpost()", () => {
    const galleryBtn = [...document.querySelectorAll(".circle-button")]
      .find(btn => btn.textContent.trim() === "GALLERY DEMO");

    expect(galleryBtn).not.toBeNull();
    expect(galleryBtn.getAttribute("onclick")).toBe("getindivpost()");
  });

  test("Database Demo button calls getProjectsPost()", () => {
    const dbDemoBtn = [...document.querySelectorAll(".circle-button")]
      .find(btn => btn.textContent.trim() === "DATABASE DEMO");

    expect(dbDemoBtn).not.toBeNull();
    expect(dbDemoBtn.getAttribute("onclick")).toBe("getProjectsPost()");
  });
});
