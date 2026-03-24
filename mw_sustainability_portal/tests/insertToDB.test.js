var dbms = require("../routes/dbms.js");

test('Test For DB Insertion', () => {
    var query = 'INSERT INTO test (message) VALUES ("Test String")';
    dbms.dbquery(query, function (err, results) {
        if (err) {
            expect(1).toBe(2); //fails test
            //return done();
        } else {
            console.log("Inserted to DB");
            expect(1).toBe(1);
            //return done();
        }
    });
})