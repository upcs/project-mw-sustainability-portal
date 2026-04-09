const dbms = require('../routes/dbms');
const mysql = require('mysql2');
const async = require('async');

jest.mock('mysql2');
jest.mock('async');

describe('dbms.dbquery', () => {
  let mockConnection;

  beforeEach(() => {
    mockConnection = {
      connect: jest.fn((cb) => cb(null)),
      query: jest.fn(),
      end: jest.fn(),
      destroy: jest.fn(),
    };

    mysql.createConnection.mockReturnValue(mockConnection);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should successfully query database and return results', (done) => {
    const fakeRows = [{ id: 1, name: 'cheesecake' }];

    // Mock async.waterfall
    async.waterfall.mockImplementation((tasks, finalCallback) => {
      // Step 1: connect
      tasks[0]((err) => {
        if (err) return finalCallback(err);

        // Step 2: query
        mockConnection.query.mockImplementation((q, cb) =>
          cb(null, fakeRows, null)
        );

        tasks[1](null, (err, rows, fields) => {
          if (err) return finalCallback(err);

          // Step 3
          tasks[2](rows, fields, (err) => {
            finalCallback(err);
          });
        });
      });
    });

    dbms.dbquery('SELECT * FROM test', (err, results) => {
      expect(err).toBe(false);
      expect(results).toEqual(fakeRows);

      // wait for dbclient.end()
      setImmediate(() => {
        expect(mockConnection.end).toHaveBeenCalled();
        done();
      });
    });
  });

  test('should handle database query error', (done) => {
    const fakeError = new Error('DB error');

    async.waterfall.mockImplementation((tasks, finalCallback) => {
      tasks[0](() => {
        mockConnection.query.mockImplementation((q, cb) =>
          cb(fakeError, null, null)
        );

        tasks[1](null, () => {
          finalCallback(fakeError);
        });
      });
    });

    dbms.dbquery('SELECT * FROM test', (err, results) => {
      expect(err).toBe(fakeError);
      expect(results).toBeNull();

      setImmediate(() => {
        expect(mockConnection.end).toHaveBeenCalled();
        done();
      });
    });
  });

  test('should create a connection with correct config', (done) => {
    async.waterfall.mockImplementation((tasks, finalCallback) => {
      tasks[0](() => {
        tasks[1](null, (err, rows, fields) => {
          tasks[2](rows, fields, () => {
            finalCallback(null);
          });
        });
      });
    });

    mockConnection.query.mockImplementation((q, cb) =>
      cb(null, [], null)
    );

    dbms.dbquery('SELECT 1', () => {
      expect(mysql.createConnection).toHaveBeenCalledWith(
        expect.objectContaining({
          host: expect.any(String),
          user: expect.any(String),
          password: expect.any(String),
          database: expect.any(String),
          multipleStatements: true,
        })
      );
      done();
    });
  });
});