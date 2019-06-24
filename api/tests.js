// const request = require('supertest');

const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('`/health` URI', () => {
  it('GET responds with an object', () => {
    return supertest // test HTTP req/res
      .get('/api/health') // makes an HTTP request
      .expect(200) // tests response status code
      .expect(res => {
        expect(res.body).to.eql({}); // tests response body
      });
  });
});
