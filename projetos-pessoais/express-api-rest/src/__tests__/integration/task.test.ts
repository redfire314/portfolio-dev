import request from "supertest";

import app from "../../app";
import conn from "../../db/conn";
import taskModel from "../../models/taskModel";
import userModel from "../../models/userModel";

let connection: any;
let accessToken: string;

beforeAll(async () => {
    connection = await conn("localhost", 27017, "todo-api-test");

    await taskModel.deleteMany({});
    await userModel.deleteMany({});

    const responseCreateUser = await request(app).post("/api/v1/user").send({
        username: "jhondoe",
        password: "testPwd123",
        email: "johndoe@email.com",
    });

    expect(responseCreateUser.status).toBe(201);

    const responseLogin = await request(app).post("/api/v1/auth").send({
        email: "johndoe@email.com",
        password: "testPwd123",
    });

    expect(responseLogin.status).toBe(200);
    expect(responseLogin.body.accessToken).not.toBeNull();

    accessToken = responseLogin.body.accessToken;
});

beforeEach(async () => {
    await taskModel.deleteMany({});
});

afterAll(async () => {
    await taskModel.deleteMany({});
    await userModel.deleteMany({});

    connection.disconnect();
});

describe("POST /task", () => {
    it("should fail if not authenticated", async () => {
        const response = await request(app).post("/api/v1/task");

        expect(response.status).toBe(401);
    });

    it("should fail with missing fields", async () => {
        const response = await request(app).post("/api/v1/task").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(400);
    });

    it("should fail with invalid fields", async () => {
        const response = await request(app).post("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            title: "a",
            description: "b",
        });

        expect(response.status).toBe(400);
    });

    it("should fail with additional fields", async () => {
        const response = await request(app).post("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            title: "a",
            description: "b",
            owner: "c",
        });

        expect(response.status).toBe(400);
    });

    it("should success with valid fields", async () => {
        const response = await request(app).post("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            title: "Title",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum",
        });

        expect(response.status).toBe(201);
    });
});

describe("GET /task", () => {
    it("should fail if not authenticated", async () => {
        const response = await request(app).get("/api/v1/task");

        expect(response.status).toBe(401);
    });

    it("should return an empty array if authenticated and with no task created", async () => {
        const response = await request(app).get("/api/v1/task").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.tasks).toHaveLength(0);
    });

    it("should return an array with length 1 if authenticated and with tasks created", async () => {
        const responseCreateTask = await request(app).post("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            title: "Title",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum",
        });

        expect(responseCreateTask.status).toBe(201);

        const response = await request(app).get("/api/v1/task").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.tasks).toHaveLength(1);
    });
});

describe("GET /task/:id", () => {
    it("should fail if not authenticated", async () => {
        const response = await request(app).get("/api/v1/task/123");

        expect(response.status).toBe(401);
    });

    it("should fail if task is not found", async () => {
        const response = await request(app).get("/api/v1/task/123").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(204);
    });

    it("should fail if task owner is not the user", async () => {
        await new taskModel({
            _id: "123",
            title: "Title",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum",
            owner: "bbfb4637-8c75-4084-be61-f5d5c858bcf3", // random generated
        }).save();

        const response = await request(app).get("/api/v1/task/123").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(204);
    });

    it("should return an object if authenticated and with tasks created", async () => {
        const responseCreateTask = await request(app).post("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            title: "Title",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum",
        });

        expect(responseCreateTask.status).toBe(201);

        const responseGetAllTasks = await request(app).get("/api/v1/task").set("Authorization", `Bearer ${accessToken}`);

        expect(responseGetAllTasks.body.tasks).toHaveLength(1);

        const response = await request(app).get(`/api/v1/task/${responseGetAllTasks.body.tasks[0]._id}`).set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.task).not.toBeNull();
    });
});

describe("PUT /task", () => {
    it("should fail if not authenticated", async () => {
        const response = await request(app).put("/api/v1/task");

        expect(response.status).toBe(401);
    });

    it("should fail with missing fields", async () => {
        const response = await request(app).put("/api/v1/task").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(400);
    });

    it("should fail with invalid fields", async () => {
        const response = await request(app).put("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            id: "a",
            title: "b",
            description: "c",
        });

        expect(response.status).toBe(400);
    });

    it("should fail with additional fields", async () => {
        const response = await request(app).put("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            id: "a",
            title: "b",
            description: "c",
            owner: "d",
        });

        expect(response.status).toBe(400);
    });

    it("should fail if task is not found", async () => {
        const response = await request(app).put("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            id: "bbfb4637-8c75-4084-be61-f5d5c858bcf3", // random generated
            title: "Title Updated",
            description: "Lorem ipsum",
        });

        expect(response.status).toBe(204);
    });

    it("should success with valid fields", async () => {
        const responseCreateTask = await request(app).post("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            title: "Title",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum",
        });

        expect(responseCreateTask.status).toBe(201);

        const responseGetAllTasks = await request(app).get("/api/v1/task").set("Authorization", `Bearer ${accessToken}`);

        expect(responseGetAllTasks.body.tasks).toHaveLength(1);

        const response = await request(app).put("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            id: responseGetAllTasks.body.tasks[0]._id,
            title: "Title Updated",
            description: "Lorem ipsum",
        });

        expect(response.status).toBe(200);
    });
});

describe("DELETE /task", () => {
    it("should fail if not authenticated", async () => {
        const response = await request(app).delete("/api/v1/task");

        expect(response.status).toBe(401);
    });

    it("should fail with missing fields", async () => {
        const response = await request(app).delete("/api/v1/task").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(400);
    });

    it("should fail with invalid fields", async () => {
        const response = await request(app).delete("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            id: "a",
        });

        expect(response.status).toBe(400);
    });

    it("should fail with additional fields", async () => {
        const response = await request(app).delete("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            id: "a",
            title: "b",
            description: "c",
        });

        expect(response.status).toBe(400);
    });

    it("should fail if task is not found", async () => {
        const response = await request(app).delete("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            id: "bbfb4637-8c75-4084-be61-f5d5c858bcf3", // random generated
        });

        expect(response.status).toBe(204);
    });

    it("should success with valid fields", async () => {
        const responseCreateTask = await request(app).post("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            title: "Title",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum",
        });

        expect(responseCreateTask.status).toBe(201);

        const responseGetAllTasks = await request(app).get("/api/v1/task").set("Authorization", `Bearer ${accessToken}`);

        expect(responseGetAllTasks.body.tasks).toHaveLength(1);

        const response = await request(app).delete("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            id: responseGetAllTasks.body.tasks[0]._id,
        });

        expect(response.status).toBe(200);
    });
});

describe("PATCH /task", () => {
    it("should fail if not authenticated", async () => {
        const response = await request(app).patch("/api/v1/task");

        expect(response.status).toBe(401);
    });

    it("should fail with missing fields", async () => {
        const response = await request(app).patch("/api/v1/task").set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(400);
    });

    it("should fail with invalid fields", async () => {
        const response = await request(app).patch("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            id: "a",
            status: "b",
        });

        expect(response.status).toBe(400);
    });

    it("should fail with additional fields", async () => {
        const response = await request(app).patch("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            id: "a",
            status: "b",
            title: "c",
        });

        expect(response.status).toBe(400);
    });

    it("should fail if task is not found", async () => {
        const response = await request(app).patch("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            id: "bbfb4637-8c75-4084-be61-f5d5c858bcf3", // random generated
            status: true,
        });

        expect(response.status).toBe(204);
    });

    it("should success with valid fields", async () => {
        const responseCreateTask = await request(app).post("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            title: "Title",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum",
        });

        expect(responseCreateTask.status).toBe(201);

        const responseGetAllTasks = await request(app).get("/api/v1/task").set("Authorization", `Bearer ${accessToken}`);

        expect(responseGetAllTasks.body.tasks).toHaveLength(1);

        const response = await request(app).patch("/api/v1/task").set("Authorization", `Bearer ${accessToken}`).send({
            id: responseGetAllTasks.body.tasks[0]._id,
            status: true,
        });

        expect(response.status).toBe(200);
    });
});
