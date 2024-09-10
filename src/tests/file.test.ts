import initApp from "../App";
import request from "supertest";
import mongoose from "mongoose";
import { Express } from "express";

let app: Express;


beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("File Tests", () => {
    test("upload file", async () => {
        const filePath = `${__dirname}/image.png`;
        console.log("filePath",filePath);
        try {
            const response = await request(app)
            .post("/photos/upload")
            .attach('file', filePath);
               // .post("/photos/upload?file=123.png").attach('file', filePath)
            expect(response.statusCode).toEqual(200);
            let url = response.body.url;
            console.log("url",url);
            url = url.replace(/^.*\/\/[^/]+/, '')
            const res = await request(app).get(url)
            expect(res.statusCode).toEqual(200);
        } catch (err) {
            console.log(err);
            expect(1).toEqual(2);
        }
    })
})