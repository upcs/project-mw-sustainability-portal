var dbms = require("../routes/dbms.js");

test('Test For DB Insertion', (done) => {
    var query = 'INSERT INTO test (message) VALUES ("Test String")';

    dbms.dbquery(query, function (err, results) {
        try {
            if (err) {
                expect(err).toBeNull(); // force failure
            } else {
                expect(results).not.toBeNull();
                console.log("Inserted to DB");
            }
            done();
        } catch (e) {
            done(e); // ensures Jest fails properly
        }
    });
});
