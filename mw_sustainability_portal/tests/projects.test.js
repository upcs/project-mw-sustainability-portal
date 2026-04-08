const request = require('supertest');
const express = require('express');

// Mock dbms BEFORE requiring router
jest.mock('../routes/dbms.js', () => ({
  dbquery: jest.fn()
}));

const dbms = require('../routes/dbms.js');
const router = require('../routes/projects.js');

describe('projects router', () => {
  let app;

  beforeEach(() => {
    app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // mock render so we don’t need a view engine
    app.response.render = function(view, options) {
      this.status(200).json({ view, ...options });
    };

    app.use('/projects', router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('✅ GET /projects returns projects list', async () => {
    const mockResults = [
      { id: 1, name: 'Project A', team: 'Team 1', image_route: '/img/a.png', html_generated: '<p>A</p>' },
      { id: 2, name: 'Project B', team: 'Team 2', image_route: '/img/b.png', html_generated: '<p>B</p>' }
    ];

    dbms.dbquery.mockImplementation((query, cb) => {
      cb(null, mockResults);
    });

    const res = await request(app).get('/projects');

    expect(res.status).toBe(200);
    expect(res.body.view).toBe('projects_list');
    expect(res.body.records).toEqual(mockResults);
  });

  test('❌ GET /projects handles DB error', async () => {
    dbms.dbquery.mockImplementation((query, cb) => {
      cb(new Error('DB error'), null);
    });

    const res = await request(app).get('/projects');

    expect(res.status).toBe(200);
    expect(res.text).toBe('Bad bad things happened');
  });

  test('🔁 POST /projects redirects to /projects', async () => {
    const res = await request(app)
      .post('/projects')
      .send({});

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/projects');
  });
});