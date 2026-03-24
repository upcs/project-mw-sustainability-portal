var dbms = require("../routes/dbms.js");

test('checks if admin login database connects', (done) => {
    const num = 1;
    var query = 'SELECT * FROM login';
    dbms.dbquery(query, function (err, results) {
        if (err) {
            expect(1).toBe(2); //fails test
            return done();
        } else {
            console.log("Login Success");
            expect(1).toBe(1); //passes test
            return done();
        }
    });
})