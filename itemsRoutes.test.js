const request = require("supertest");

const app = require("./app");
let { items } = require('./fakeDb');

let pizza = { "name": "pizza", "price": 3.95 };
let cookie = { "name": "cookie", "price": 1.23 };
let cereal = { "name": "cereal", "price": 7.89 };

beforeEach(function () {
    items.push(pizza);
    items.push(cookie);
});

afterEach(function () {
    items = [];
});

describe("GET /items", function () {
    it("Gets all items", async function () {
        const resp = await request(app)
            .get(`/items`);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            "response": [
                {
                    "name": "pizza",
                    "price": 3.95
                },
                {
                    "name": "cookie",
                    "price": 1.23
                }
            ]
        });
    });
});

describe("GET /items/:name", function () {
    it("Gets specific item", async function () {
        const resp = await request(app)
            .get(`/items/cookie`);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            "response": 
                {
                    "name": "cookie",
                    "price": 1.23
                }
        });
    });
});

describe("POST /items", function () {
    it("Adds new item", async function () {
        const resp = await request(app)
            .post(`/items`)
            .send({ "name": "chocolate", "price": 4.56 });
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            "response": {
              "added": {
                "name": "chocolate",
                "price": 4.56
              }
            }
        });
    });
});

describe("PATCH /items/:name", function () {
    it("Updates item", async function () {
        const resp = await request(app)
            .patch(`/items/pizza`)
            .send(cereal);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            "response": {
              "updated": {
                "name": "cereal",
                "price": 7.89
              }
            }
        });
    });
});

describe("DELETE /items/:name", function () {
    it("Deletes item", async function () {
        const resp = await request(app)
            .delete(`/items/pizza`);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            "response": {
              "message": "Item deleted!"
            }
          });
    });
});