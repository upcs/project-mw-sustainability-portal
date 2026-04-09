const request = require('supertest');
const express = require('express');
const session = require('express-session');

// Mock dbms BEFORE requiring router
jest.mock('../routes/dbms.js', () => ({
  dbquery: jest.fn()
}));

const dbms = require('../routes/dbms.js');
const router = require('../routes/mylogin.js');

describe('mylogin router', () => {
  let app;

  beforeEach(() => {
    app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(session({
      secret: 'test-secret',
      resave: false,
      saveUninitialized: true
    }));

    // mock render to avoid needing a template engine
    app.response.render = function(view, options) {
      this.status(200).json({ view, ...options });
    };

    app.use('/mylogin', router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('✅ successful login redirects to admin_view', async () => {
    dbms.dbquery.mockImplementation((query, cb) => {
      cb(null, [{ pass: 'correctpass' }]);
    });

    const res = await request(app)
      .post('/mylogin')
      .send({ user: 'admin', pass: 'correctpass' });

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/mylogin/admin_view');
  });

  test('❌ wrong password redirects to admin_error', async () => {
    dbms.dbquery.mockImplementation((query, cb) => {
      cb(null, [{ pass: 'correctpass' }]);
    });

    const res = await request(app)
      .post('/mylogin')
      .send({ user: 'admin', pass: 'wrongpass' });

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('admin_error');
  });

  test('❌ db error redirects to admin_error', async () => {
  dbms.dbquery.mockImplementation((query, cb) => {
    cb(new Error('DB error'), null);
  });

  const res = await request(app)
    .post('/mylogin')
    .send({ user: 'admin', pass: 'whatever' });

  expect(res.status).toBe(302);
  expect(res.headers.location).toBe('/mylogin/admin_error');
    });

  test('🔒 protected route blocks unauthenticated users', async () => {
    const res = await request(app)
      .get('/mylogin/admin_view');

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/mylogin/admin_error');
  });

  test('🔓 protected route allows authenticated users', async () => {
    const agent = request.agent(app);

    dbms.dbquery.mockImplementation((query, cb) => {
      cb(null, [{ pass: 'correctpass' }]);
    });

    // First login
    await agent
      .post('/mylogin')
      .send({ user: 'admin', pass: 'correctpass' });

    // Then access protected route
    const res = await agent.get('/mylogin/admin_view');

    expect(res.status).toBe(200);
    expect(res.body.view).toBe('admin_view');
    expect(res.body.user.username).toBe('admin');
  });
});