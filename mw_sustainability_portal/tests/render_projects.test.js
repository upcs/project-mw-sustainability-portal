const express = require("express");
const request = require("supertest");
const router = require("../routes/render_project");
const dbms = require("../routes/dbms.js");
const fs = require("fs").promises;

jest.mock("../routes/dbms.js");
jest.spyOn(fs, "readFile");

function createApp() {
    const app = express();
    app.use(express.json());

    // Replace res.render so we can inspect output
    app.response.render = jest.fn(function (view, data) {
        this.send({ view, data });
    });

    app.use("/", router);
    return app;
}

describe("render_project router (fresh test suite)", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // -------------------------------------------------------
    // GET — full successful load
    // -------------------------------------------------------
    test("GET /:id loads project info, assets, and description text", async () => {
        const projectInfo = [{ name: "Rain Garden", team: "Eco Crew" }];
        const assets = [
            { is_text: 1, asset_route: "info.txt" },
            { is_image: 1, asset_route: "garden1.jpg" },
            { is_image: 1, asset_route: "garden2.jpg" }
        ];

        dbms.dbquery.mockImplementation((sql, cb) => {
            if (sql.includes("projects_list")) cb(null, projectInfo);
            else cb(null, assets);
        });

        fs.readFile.mockResolvedValue("Rain garden project details");

        const app = createApp();
        const res = await request(app).get("/5");

        expect(res.body).toEqual({
            view: "project_page",
            data: {
                images: ["garden1.jpg", "garden2.jpg"],
                description: "Rain garden project details",
                proj_name: "Rain Garden",
                proj_team: "Eco Crew"
            }
        });
    });

    // -------------------------------------------------------
    // GET — project info DB failure
    // -------------------------------------------------------
    test("GET /:id returns error when project info query fails", async () => {
        dbms.dbquery.mockImplementation((sql, cb) => {
            cb(new Error("fail"), null);
        });

        const app = createApp();
        const res = await request(app).get("/22");

        expect(res.text).toBe("Error loading project info");
    });

    // -------------------------------------------------------
    // GET — asset query failure
    // -------------------------------------------------------
    test("GET /:id returns error when asset query fails", async () => {
        const projectInfo = [{ name: "Solar Roof", team: "Sky Energy" }];

        dbms.dbquery.mockImplementation((sql, cb) => {
            if (sql.includes("projects_list")) cb(null, projectInfo);
            else cb(new Error("asset error"), null);
        });

        const app = createApp();
        const res = await request(app).get("/9");

        expect(res.text).toBe("Error loading assets");
    });

    // -------------------------------------------------------
    // GET — missing description file
    // -------------------------------------------------------
    test("GET /:id uses fallback description when file read fails", async () => {
        const projectInfo = [{ name: "Wetland Filter", team: "AquaLab" }];
        const assets = [{ is_text: 1, asset_route: "missing.txt" }];

        dbms.dbquery.mockImplementation((sql, cb) => {
            if (sql.includes("projects_list")) cb(null, projectInfo);
            else cb(null, assets);
        });

        fs.readFile.mockRejectedValue(new Error("no file"));

        const app = createApp();
        const res = await request(app).get("/14");

        expect(res.body).toEqual({
            view: "project_page",
            data: {
                images: [],
                description: "Error loading description",
                proj_name: "Wetland Filter",
                proj_team: "AquaLab"
            }
        });
    });

    // -------------------------------------------------------
    // POST — redirect behavior
    // -------------------------------------------------------
    test("POST / redirects with correct encoded query parameters", async () => {
        const app = createApp();

        const res = await request(app)
            .post("/")
            .send({
                proj_name: "Urban Forest",
                proj_team: "Tree Squad",
                proj_id: 300
            });

        expect(res.status).toBe(302);

        const parsed = new URL("http://localhost" + res.headers.location);

        expect(parsed.pathname).toBe("/render_project");
        expect(parsed.searchParams.get("name")).toBe("Urban Forest");
        expect(parsed.searchParams.get("team")).toBe("Tree Squad");
        expect(parsed.searchParams.get("id")).toBe("300");
    });

});
