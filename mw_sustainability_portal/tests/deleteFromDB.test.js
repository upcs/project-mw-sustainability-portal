var dbms = require("../routes/dbms.js");

test('Test For DB Deletion', () => {
    var query = 'DELETE FROM test WHERE message="Test String"';
    dbms.dbquery(query, function (err, results) {
        if (err) {
            expect(1).toBe(2); //fails test
            //return done();
        } else {
            expect(1).toBe(1); //passes test
            console.log("Deleted From DB");
            //return done();
        }
    });
})