import request from "supertest";

import app from "../../app";
import conn from "../../db/conn";
import userModel from "../../models/userModel";

let connection: any;

beforeAll(async () => {
    connection = await conn("localhost", 27017, "todo-api-test");
    await userModel.deleteMany({});
});

afterAll(async () => {
    await userModel.deleteMany({});
    connection.disconnect();
});

describe("POST /user", () => {
    it("should fail with missing fields", async () => {
        const response = await request(app).post("/api/v1/user");

        expect(response.status).toBe(400);
    });

    it("should fail with invalid values", async () => {
        const response = await request(app).post("/api/v1/user").send({
            username: "a",
            password: "123",
            email: "foo",
        });

        expect(response.status).toBe(400);
    });

    it("should fail with additional fields", async () => {
        const response = await request(app).post("/api/v1/user").send({
            username: "jhondoe",
            password: "testPwd123",
            email: "johndoe@email.com",
            genre: "M",
        });

        expect(response.status).toBe(400);
    });

    it("should success with valid values", async () => {
        const response = await request(app).post("/api/v1/user").send({
            username: "jhondoe",
            password: "testPwd123",
            email: "johndoe@email.com",
        });

        expect(response.status).toBe(201);
    });

    it("should fail with busy email", async () => {
        const response = await request(app).post("/api/v1/user").send({
            username: "jhondoe",
            password: "testPwd123",
            email: "johndoe@email.com",
        });

        expect(response.status).toBe(409);
    });
});
