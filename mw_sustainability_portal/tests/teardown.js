const dbms = require('../routes/dbms.js');

afterAll(() => {
    dbms.close();
});