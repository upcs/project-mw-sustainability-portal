/**
 * @jest-environment node
 */

const router = require("../routes/render_project.js");
//const router2 = require("../routes/index.js");
const router7 = require("../routes/users.js");
const dbms = require("../routes/dbms.js");

jest.mock("../routes/dbms.js", () => ({
    dbquery: jest.fn()
}));

describe("POST / (render_projects router)", () => {

    let req, res;

    beforeEach(() => {
        req = {
            method: "POST",
            url: "/",
            body: {
                proj_name: "Solar Panels",
                proj_team: "Team Green",
                proj_id: 42
            }
        };

        res = {
            send: jest.fn(),
            render: jest.fn()
        };
    });

    test("renders project_page on successful DB query", () => {
        const fakeResults = [{ asset: "panel1.jpg" }];

        dbms.dbquery.mockImplementation((query, callback) => {
            callback(null, fakeResults);
        });

        router.handle(req, res, () => {});

        expect(dbms.dbquery).toHaveBeenCalledWith(
            "SELECT * FROM project_assets WHERE project_id = 42",
            expect.any(Function)
        );

        expect(res.render).toHaveBeenCalledWith("project_page", {
            records: fakeResults,
            proj_name: "Solar Panels",
            proj_team: "Team Green"
        });
    });

    test("sends error message when DB query fails", () => {
        dbms.dbquery.mockImplementation((query, callback) => {
            callback("SQL ERROR", null);
        });

        router.handle(req, res, () => {});

        expect(res.send).toHaveBeenCalledWith("Bad bad things happened");
    });
});
