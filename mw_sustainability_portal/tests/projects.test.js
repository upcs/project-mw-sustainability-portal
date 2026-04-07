/**
 * @jest-environment node
 */

const router = require("../routes/projects.js");
const dbms = require("../routes/dbms.js");

// Mock dbms.dbquery
jest.mock("../routes/dbms.js", () => ({
    dbquery: jest.fn()
}));

describe("projects router", () => {

    let req, res, next;

    beforeEach(() => {
        req = {
            method: "",
            url: "/"
        };

        res = {
            send: jest.fn(),
            render: jest.fn()
        };

        next = jest.fn();
    });

    // -----------------------------
    // GET /
    // -----------------------------
    test("GET / renders projects with items on success", () => {
        const fakeResults = [
            { id: 1, name: "Proj A" },
            { id: 2, name: "Proj B" }
        ];

        dbms.dbquery.mockImplementation((query, callback) => {
            callback(null, fakeResults);
        });

        req.method = "GET";

        router.handle(req, res, next);

        expect(dbms.dbquery).toHaveBeenCalledWith(
            "SELECT * FROM projects_list",
            expect.any(Function)
        );

        expect(res.render).toHaveBeenCalledWith("projects", {
            items: fakeResults
        });
    });

    test("GET / sends error message when DB fails", () => {
        dbms.dbquery.mockImplementation((query, callback) => {
            callback("SQL ERROR", null);
        });

        req.method = "GET";

        router.handle(req, res, next);

        expect(res.send).toHaveBeenCalledWith(
            "There are no projects or I cannot collect data"
        );
    });

    // -----------------------------
    // POST /
    // -----------------------------
    test("POST / renders projects_list with records on success", () => {
        const fakeResults = [
            { id: 1, name: "Proj A", team: "Alpha" }
        ];

        dbms.dbquery.mockImplementation((query, callback) => {
            callback(null, fakeResults);
        });

        req.method = "POST";

        router.handle(req, res, next);

        expect(dbms.dbquery).toHaveBeenCalledWith(
            "SELECT id, name, team, image_route, html_generated FROM projects_list",
            expect.any(Function)
        );

        expect(res.render).toHaveBeenCalledWith("projects_list", {
            records: fakeResults
        });
    });

    test("POST / sends error message when DB fails", () => {
        dbms.dbquery.mockImplementation((query, callback) => {
            callback("SQL ERROR", null);
        });

        req.method = "POST";

        router.handle(req, res, next);

        expect(res.send).toHaveBeenCalledWith("Bad bad things happened");
    });

});
