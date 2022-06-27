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

describe("POST /auth", () => {
    it("should fail with missing fields", async () => {
        const response = await request(app).post("/api/v1/auth");

        expect(response.status).toBe(400);
    });

    it("should fail with invalid values", async () => {
        const response = await request(app).post("/api/v1/auth").send({
            email: "foo",
            password: "123",
        });

        expect(response.status).toBe(400);
    });

    it("should fail with additional fields", async () => {
        const response = await request(app).post("/api/v1/auth").send({
            email: "johndoe@email.com",
            password: "testPwd123",
            username: "jhondoe",
        });

        expect(response.status).toBe(400);
    });

    it("should fail with not found user by email", async () => {
        const response = await request(app).post("/api/v1/auth").send({
            email: "johndoe@email.com",
            password: "testPwd123",
        });

        expect(response.status).toBe(204);
    });

    it("should success with valid credentials", async () => {
        const responseCreateUser = await request(app).post("/api/v1/user").send({
            username: "jhondoe",
            password: "testPwd123",
            email: "johndoe@email.com",
        });

        expect(responseCreateUser.status).toBe(201);

        const response = await request(app).post("/api/v1/auth").send({
            email: "johndoe@email.com",
            password: "testPwd123",
        });

        expect(response.status).toBe(200);
        expect(response.body.accessToken).not.toBeNull();
    });

    it("should fail with invalid password", async () => {
        const response = await request(app).post("/api/v1/auth").send({
            email: "johndoe@email.com",
            password: "321dwPtset",
        });

        expect(response.status).toBe(204);
    });
});
