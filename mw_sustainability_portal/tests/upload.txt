/**
 * @jest-environment node
 */

const router = require("../routes/upload.js");
const dbms = require("../routes/dbms.js");
const multer = require("multer");

// Mock dbms.dbquery
jest.mock("../routes/dbms.js", () => ({
    dbquery: jest.fn()
}));

// Mock multer so upload.single("uploadFile") doesn't try to write files
jest.mock("multer", () => {
    const multerMock = () => ({
        single: () => (req, res, next) => {
            req.file = req.mockFile || null;
            next();
        }
    });

    multerMock.diskStorage = () => ({});

    return multerMock;
});


describe("upload router", () => {

    let req, res, next;

    beforeEach(() => {
        req = {
            method: "POST",
            url: "/",
            headers: {},
            xhr: false,
            mockFile: null
        };

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
            redirect: jest.fn()
        };

        next = jest.fn();
    });

    // -----------------------------
    // NO FILE PROVIDED
    // -----------------------------
    test("POST / returns 400 when no file is uploaded", () => {
        req.mockFile = null; // multer will set req.file = null

        router.handle(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ message: "please select an image file" });
    });

    // -----------------------------
    // SUCCESSFUL UPLOAD (JSON fetch)
    // -----------------------------
    test("POST / returns JSON when request is fetch/XHR", () => {
        req.mockFile = {
            filename: "uploadFile-123.png"
        };

        req.xhr = true;

        dbms.dbquery.mockImplementation((sql, callback) => {
            callback(null, { insertId: 1 });
        });

        router.handle(req, res, next);

        expect(dbms.dbquery).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            filePath: "images/uploadFile-123.png"
        });
    });

    // -----------------------------
    // SUCCESSFUL UPLOAD (redirect)
    // -----------------------------
    test("POST / redirects to /indivProj on normal browser request", () => {
        req.mockFile = {
            filename: "uploadFile-999.jpg"
        };

        req.headers.accept = "text/html";

        dbms.dbquery.mockImplementation((sql, callback) => {
            callback(null, { insertId: 1 });
        });

        router.handle(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith("/indivProj");
    });

    // -----------------------------
    // DB ERROR
    // -----------------------------
    test("POST / returns 500 when DB insert fails", () => {
        req.mockFile = {
            filename: "uploadFile-555.png"
        };

        dbms.dbquery.mockImplementation((sql, callback) => {
            callback("SQL ERROR", null);
        });

        router.handle(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "DB insert failed" });
    });

});
