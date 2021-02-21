import newsController from '../controllers/newsController';
import server from "../index";
import request from 'supertest';

/*
describe('Testing routes', () => {
    it('News fetched', async () => {

        expect.assertions(1);
        const res = await newsController.getAllNews; 
        expect(res.length).toBeGreaterThanOrEqual(1);

    })
})*/

describe("GET / - The Basic Endpoint", () => {

   
    test("Hello API Request", async (done) => {

      const result = await request(server).get("/");
      expect(result.text).toEqual("Api: /api/news");
      expect(result.status).toEqual(200);
      done();

    });

    test("Hello API Request", async (done) => {

        const result = await request(server).get("/api/news");
        expect(result.text).toEqual("Api: /api/news");
        expect(result.status).toEqual(200);
        done();
  
      });

});