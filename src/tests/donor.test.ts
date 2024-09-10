
import request from "supertest";
import initApp from "../App";
import mongoose from "mongoose";
import Donor from "../models/donor_model";
import { Express } from "express";

let app: Express;
let accessToken: string;

interface IDonor {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  mainAddress: string;
  isAdmin?: boolean;
}

const donor: IDonor = {
  firstName: "John",
  lastName: "Doe",
  email: "testDonor@test.com",
  password: "123456",
  phoneNumber: "1234567890",
  mainAddress: "123 Test Street",
  isAdmin: false,
};

const newDonor: IDonor = {
  firstName: "Jane",
  lastName: "Doe",
  email: "testNewDonor@test.com",
  password: "123456",
  phoneNumber: "1234567890",
  mainAddress: "456 New Street",
  isAdmin: false,
};
let DonorId: string;

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await Donor.deleteMany();
  await request(app).post("/auth/register").send(donor);
  const response = await request(app).post("/auth/login").send(donor);
  DonorId= response.body._id;
  accessToken = response.body.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
});

 let createdDonorId: string;

describe("Donor tests", () => {
  const addDonor = async (donor: IDonor) => {
    const response = await request(app)
      .post("/donor")
      .set("Authorization", "Bearer " + accessToken)
      .send(donor);
    expect(response.statusCode).toBe(201);
    return response.body._id; 
  };

  test("Test Get All Donors with one donor in DB", async () => {
    const response = await request(app)
      .get("/donor")
      //.set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const donorData = response.body[0];
    expect(donorData.firstName).toBe(donor.firstName);
    expect(donorData.lastName).toBe(donor.lastName);
    expect(donorData.email).toBe(donor.email);
    expect(donorData.phoneNumber).toBe(donor.phoneNumber);
    expect(donorData.mainAddress).toBe(donor.mainAddress);
  });

  test("Test Post Donor", async () => {
     createdDonorId = await addDonor(newDonor);
    expect(createdDonorId).toBeDefined(); 
  });

  test("Test Post duplicate Donor", async () => {
    const response = await request(app)
      .post("/donor")
      .set("Authorization", "Bearer " + accessToken)
      .send(donor);
    expect(response.statusCode).toBe(500);
  });

  test("Test get donor by id", async () => {
    const response = await request(app)
      .get("/donor/" + createdDonorId);
    expect(response.statusCode).toBe(200);
    expect(response.body.firstName).toBe(newDonor.firstName);
    expect(response.body.lastName).toBe(newDonor.lastName);
    expect(response.body.email).toBe(newDonor.email);
    expect(response.body.phoneNumber).toBe(newDonor.phoneNumber);
    expect(response.body.mainAddress).toBe(newDonor.mainAddress);
  });

  test("Test get donor by wrong id", async () => {
    const response = await request(app)
      .get("/donor/" + "1");
    expect(response.statusCode).toBe(500);
  });

  test("Test PUT /donor/:id", async () => {
    const updatedDonor = { ...newDonor, firstName: "Updated" };
    const response = await request(app)
      .put("/donor/" + createdDonorId)
      .set("Authorization", "Bearer " + accessToken)
      .send(updatedDonor);
    expect(response.statusCode).toBe(200);
    expect(response.body.firstName).toBe(updatedDonor.firstName);
  });

  test("Test PUT /donor/:id with wrong id", async () => {
    const updatedDonor = { ...newDonor, firstName: "Updated" };
    const response = await request(app)
      .put("/donor/" + "1")
      .set("Authorization", "Bearer " + accessToken)
      .send(updatedDonor);
    expect(response.statusCode).toBe(500);
  });

  test("Test DELETE /donor/:id wrong id", async () => {
    const response = await request(app)
      .delete(`/donor/${"1"}`)
      .set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(500);
  });

  test("Test DELETE /donor/:id", async () => {
    const response = await request(app)
      .delete(`/donor/${DonorId}`)
      .set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(204);
  });

  test("Test DELETE /donor/:id", async () => {
    const response = await request(app)
      .delete(`/donor/${createdDonorId}`)
      .set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(204);
  });

  test("Test Get All Donors - empty response", async () => {
    const response = await request(app)
      .get("/donor")
      .set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
});
