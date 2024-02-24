const request = require("supertest");
const app = require("../app");
const { tokenSign } = require("../utils/handleJwt");
const { userModel } = require("../models");
const { storageModel } = require("../models");
const { testAuthRegister } = require("./helper/helperData");
let JWT_TOKEN = "";
const filePath = `${__dirname}/dump/track.mp3`;

beforeAll(async () => {
  await userModel.deleteMany({});
  await storageModel.deleteMany({});
  const user = userModel.create(testAuthRegister);
  JWT_TOKEN = await tokenSign(user);
});

test("should uplaod file", async () => {
  const res = await request(app)
    .post("/api/storage")
    .set("Authorization", `Bearer ${JWT_TOKEN}`)
    .attach("myFile", filePath);
  const { body } = res;
  expect(res.statusCode).toEqual(201);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.url");
});

test("should create a return all", async () => {
  const res = await request(app)
    .get("/api/storage")
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  const { data } = body;
  expect(body).toHaveProperty("data");
});

test("debe retornar todo el detalle del item", async () => {
  const { _id } = await storageModel.findOne();
  id = _id.toString();

  const res = await request(app)
    .get(`/api/storage/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
});

test("debe eliminar el item", async () => {
  const { _id } = await storageModel.findOne();
  id = _id.toString();

  // Elimina el archivo
  const res = await request(app)
    .delete(`/api/storage/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.deleted", 1);
});
