/**
 * @jest-environment node
 */

const router = require("../routes/mylogin.js");
const dbms = require("../routes/dbms.js");

// Mock dbms.dbquery
jest.mock("../routes/dbms.js", () => ({
    dbquery: jest.fn()
}));

describe("POST / (mylogin router)", () => {

    let req, res;

    beforeEach(() => {
        req = {
            method: "POST",
            url: "/",
            body: {
                user: "admin",
                pass: "secret123"
            }
        };

        res = {
            render: jest.fn(),
            send: jest.fn()
        };
    });

    test("renders admin_view when password is correct", () => {
        const fakeResults = [{ pass: "secret123" }];

        dbms.dbquery.mockImplementation((query, callback) => {
            callback(null, fakeResults);
        });

        router.handle(req, res, () => {});

        expect(dbms.dbquery).toHaveBeenCalledWith(
            "select * from login",
            expect.any(Function)
        );

        expect(res.render).toHaveBeenCalledWith("admin_view");
    });

    test("renders admin_error when password is incorrect", () => {
        const fakeResults = [{ pass: "wrongpass" }];

        dbms.dbquery.mockImplementation((query, callback) => {
            callback(null, fakeResults);
        });

        router.handle(req, res, () => {});

        expect(res.render).toHaveBeenCalledWith("admin_error");
    });

    test("handles DB error gracefully (no render)", () => {
        dbms.dbquery.mockImplementation((query, callback) => {
            callback("SQL ERROR", null);
        });

        router.handle(req, res, () => {});

        expect(res.render).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});
