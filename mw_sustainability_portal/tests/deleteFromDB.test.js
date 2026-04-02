var dbms = require("../routes/dbms.js");

test('Test For DB Deletion', (done) => {
    var query = 'DELETE FROM test WHERE message="Test String"';

    dbms.dbquery(query, function (err, results) {
        try {
            if (err) {
                expect(err).toBeNull(); // forces failure
            } else {
                expect(results).not.toBeNull();
                console.log("Deleted From DB");
            }
            done();
        } catch (e) {
            done(e); // ensures Jest fails properly
        }
    });
});
