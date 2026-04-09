/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

describe("admin_error.ejs", () => {

    let template;

    beforeAll(() => {
        const filePath = path.join(
            __dirname,
            "../views/admin_error.ejs"
        );
        template = fs.readFileSync(filePath, "utf8");
    });

    beforeEach(() => {
        // Reset DOM and mocks
        document.body.innerHTML = "";
        document.cookie = "admin=wrongpass";
        console.log = jest.fn();
    });

    test("renders the INVALID USERNAME OR PASSWORD message", () => {
        const html = ejs.render(template);

        document.body.innerHTML = html;

        expect(document.body.textContent).toContain("INVALID USERNAME OR PASSWORD");
    });

    test("renders the Try Again button", () => {
        const html = ejs.render(template);
        document.body.innerHTML = html;

        const button = document.querySelector("button#submitloginbutton");

        expect(button).not.toBeNull();
        expect(button.textContent).toContain("Try Again");
    });

    test("inline script logs document.cookie", () => {
        const html = ejs.render(template);
        document.body.innerHTML = html;

        // Execute the inline script manually
        const scriptContent = template.match(/<script>([\s\S]*?)<\/script>/)[1];
        eval(scriptContent);

        expect(console.log).toHaveBeenCalledWith("admin=wrongpass");
    });

});
