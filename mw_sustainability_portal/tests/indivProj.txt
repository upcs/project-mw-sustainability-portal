/**
 * @jest-environment node
 */

const router = require("../routes/indivProj.js");
const dbms = require("../routes/dbms.js");

// Mock dbms.dbquery
jest.mock("../routes/dbms.js", () => ({
    dbquery: jest.fn()
}));

describe("indivProj router", () => {

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
    test("GET / renders indivProj with results on success", () => {
        const fakeResults = [{ asset_route: "img/a.png" }];

        dbms.dbquery.mockImplementation((query, callback) => {
            callback(null, fakeResults);
        });

        req.method = "GET";

        router.handle(req, res, next);

        expect(dbms.dbquery).toHaveBeenCalledWith(
            "SELECT asset_route FROM project_assets WHERE project_id = 72",
            expect.any(Function)
        );

        expect(res.render).toHaveBeenCalledWith("indivProj", {
            records: fakeResults
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
    test("POST / renders indivProj with results on success", () => {
        const fakeResults = [{ asset_route: "img/b.png" }];

        dbms.dbquery.mockImplementation((query, callback) => {
            callback(null, fakeResults);
        });

        req.method = "POST";

        router.handle(req, res, next);

        expect(res.render).toHaveBeenCalledWith("indivProj", {
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
