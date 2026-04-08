const request = require("supertest");
const express = require("express");
const router = require("../routes/render_project");
const dbms = require("../routes/dbms.js");
const fs = require("fs").promises;

// Mock DB + FS
jest.mock("../routes/dbms.js");
jest.spyOn(fs, "readFile");

function makeApp() {
    const app = express();
    app.use(express.json());
    app.use("/", router);

    // Intercept res.render
    app.response.render = jest.fn(function (view, data) {
        this.send({ view, data });
    });

    return app;
}

describe("render_project router", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders project_page with images + description", async () => {
        const fakeResults = [
            { is_text: 1, asset_route: "desc.txt" },
            { is_image: 1, asset_route: "img1.jpg" },
            { is_image: 1, asset_route: "img2.jpg" }
        ];

        dbms.dbquery.mockImplementation((query, callback) => {
            callback(null, fakeResults);
        });

        fs.readFile.mockResolvedValue("This is the project description");

        const app = makeApp();

        const res = await request(app)
            .post("/")
            .send({
                proj_name: "Solar Panels",
                proj_team: "Team Green",
                proj_id: 42
            });

        expect(res.body).toEqual({
            view: "project_page",
            data: {
                images: ["img1.jpg", "img2.jpg"],
                description: "This is the project description",
                proj_name: "Solar Panels",
                proj_team: "Team Green"
            }
        });
    });

    test("renders project_page with only images", async () => {
        const fakeResults = [
            { is_image: 1, asset_route: "img1.jpg" }
        ];

        dbms.dbquery.mockImplementation((query, callback) => {
            callback(null, fakeResults);
        });

        const app = makeApp();

        const res = await request(app)
            .post("/")
            .send({
                proj_name: "Wind Turbines",
                proj_team: "Team Blue",
                proj_id: 99
            });

        expect(res.body).toEqual({
            view: "project_page",
            data: {
                images: ["img1.jpg"],
                description: "",
                proj_name: "Wind Turbines",
                proj_team: "Team Blue"
            }
        });
    });

    test("renders project_page with only description", async () => {
        const fakeResults = [
            { is_text: 1, asset_route: "desc.txt" }
        ];

        dbms.dbquery.mockImplementation((query, callback) => {
            callback(null, fakeResults);
        });

        fs.readFile.mockResolvedValue("Only text here");

        const app = makeApp();

        const res = await request(app)
            .post("/")
            .send({
                proj_name: "Hydro Project",
                proj_team: "Team Aqua",
                proj_id: 7
            });

        expect(res.body).toEqual({
            view: "project_page",
            data: {
                images: [],
                description: "Only text here",
                proj_name: "Hydro Project",
                proj_team: "Team Aqua"
            }
        });
    });

    test("handles DB error", async () => {
        dbms.dbquery.mockImplementation((query, callback) => {
            callback(new Error("DB failed"), null);
        });

        const app = makeApp();

        const res = await request(app)
            .post("/")
            .send({
                proj_name: "Solar Panels",
                proj_team: "Team Green",
                proj_id: 42
            });

        expect(res.text).toBe("Bad bad things happened");
    });

    test("handles missing description file", async () => {
        const fakeResults = [
            { is_text: 1, asset_route: "missing.txt" }
        ];

        dbms.dbquery.mockImplementation((query, callback) => {
            callback(null, fakeResults);
        });

        fs.readFile.mockRejectedValue(new Error("File not found"));

        const app = makeApp();

        const res = await request(app)
            .post("/")
            .send({
                proj_name: "Biofuel",
                proj_team: "Team Yellow",
                proj_id: 55
            });

        expect(res.body).toEqual({
            view: "project_page",
            data: {
                images: [],
                description: "Error loading description",
                proj_name: "Biofuel",
                proj_team: "Team Yellow"
            }
        });
    });

});
