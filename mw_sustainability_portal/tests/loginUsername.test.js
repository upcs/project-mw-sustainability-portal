var dbms = require("../routes/dbms.js");

test('checks if admin login database has the login saved', (done) => {
    const num = 1;
    var query = 'SELECT * FROM login';
    dbms.dbquery(query, function (err, results) {
        console.log(results);
        if (err) {
            expect(1).toEqual(2); //fails test
            return done();
        } else {

            expect(results[0].user).toEqual("admin"); //passes test
            console.log("Admin User Ready");
            return done();
        }
    });
})