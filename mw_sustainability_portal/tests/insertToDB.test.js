var dbms = require("../routes/dbms.js");

test('Test For DB Insertion', (done) => {
    var query = 'INSERT INTO test (message) VALUES ("Test String")';
    dbms.dbquery(query, function (err, results) {
        if (err) {
            expect(1).toBe(2); //fails test
            return done();
        } else {
            expect(1).toBe(1);
            console.log("Inserted to DB");
            return done();
        }
    });
})