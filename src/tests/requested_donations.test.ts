
import request from 'supertest';
import initApp from '../App';
import mongoose from 'mongoose';
 import requestedDonationModel, { IrequestedDonation } from '../models/requestedDonation_model';
import e, { Express } from 'express';

let app: Express;
let accessToken: string;

 interface IRequestedDonation {
    itemName: string;
    category: string;
    amount: number;
    description: string;
    image?: string;
  }

  const requestedDonation: IRequestedDonation = {
    itemName: 'Canned goods',
    category: 'Food',
    amount: 10,
    description: 'Assorted canned foods',
    image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  };   

  const newRequestedDonation: IRequestedDonation = {
    itemName: 'Shirts',
    category: 'Clothing',
    amount: 20,
    description: 'Assorted shirts',
    image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  };
  
  
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
    isAdmin: false
  };
  

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");
    await requestedDonationModel.deleteMany();
    await request(app).post("/auth/register").send(donor);
    const response = await request(app).post("/auth/login").send(donor);
    //DonorId= response.body._id;
    accessToken = response.body.accessToken;
});

afterAll(async () => {
    await mongoose.connection.close();
});
 

let rdonationId: string;
let newRDonationId: string;

describe('Requested Donation tests', () => {

  const addRDonation = async (rdonation: IRequestedDonation) => {
    const response = await request(app)
      .post('/requestedDonation/rdonation')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(rdonation);
    expect(response.statusCode).toBe(201);
    return response.body._id; 
  };

  test("Test Get All Requested Donations - empty response", async () => {
    const response = await request(app).get("/requestedDonation/rdonations");
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test('Test Post Requested Donation', async () => {
    rdonationId = await addRDonation(requestedDonation);
    expect(rdonationId).toBeDefined(); 
  });

  test('Test Get All Requested Donations with one donation in DB', async () => {
    const response = await request(app)
      .get('/requestedDonation/rdonations')
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const rdonationData = response.body[0];
    expect(rdonationData.itemName).toBe(requestedDonation.itemName);
    expect(rdonationData.category).toBe(requestedDonation.category);
    expect(rdonationData.description).toBe(requestedDonation.description);
    expect(rdonationData.amount).toBe(requestedDonation.amount);

  });

  test('Test new Post Requested Donation', async () => {
    newRDonationId = await addRDonation(newRequestedDonation);
    expect(newRDonationId).toBeDefined(); 
  });

  test('Test get donation by id', async () => {
    const response = await request(app)
      .get(`/requestedDonation/rdonation/${newRDonationId}`)
    expect(response.statusCode).toBe(200);
    expect(response.body.itemName).toBe(newRequestedDonation.itemName);
    expect(response.body.category).toBe(newRequestedDonation.category);
    expect(response.body.description).toBe(newRequestedDonation.description);
    expect(response.body.amount).toBe(newRequestedDonation.amount);
  });

  test('Test PUT /rdonations/:id', async () => {
    const updatedrDonation = { ...newRequestedDonation, amount: 30 };
    const response = await request(app)
      .put(`/requestedDonation/rdonation/update/${newRDonationId}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(updatedrDonation);
    expect(response.statusCode).toBe(200);
    expect(response.body.amount).toBe(updatedrDonation.amount);
  });

  test("Test PUT with wrong id /post/:id", async () => {
    const updatedPRDonation = { ...newRequestedDonation, quantity: 40 };
    const response = await request(app)
      .put("/requestedDonation/rdonation/update/" + "123")
      .set("Authorization", "JWT " + accessToken)
      .send(updatedPRDonation);
    expect(response.statusCode).toBe(500);
  });

  test("Test DELETE with wrong id /rdonatoin/:id", async () => {
    const response = await request(app).delete(`/requestedDonation/rdonation/delete/"123"`).set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(500);
  });

  test('Test DELETE /rdonations/:id', async () => {
    const response = await request(app)
      .delete(`/requestedDonation/rdonation/delete/${rdonationId}`)
      .set('Authorization', 'Bearer ' + accessToken);
    expect(response.statusCode).toBe(204);
  });

  test('Test DELETE /donations/:id', async () => {
    const response = await request(app)
      .delete(`/requestedDonation/rdonation/delete/${newRDonationId}`)
      .set('Authorization', 'Bearer ' + accessToken);
    expect(response.statusCode).toBe(204);
  });

  test('Test Get All Requested Donations - empty response', async () => {
    const response = await request(app)
      .get('/requestedDonation/rdonations')
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
});