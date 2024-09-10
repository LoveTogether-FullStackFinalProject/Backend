
import request from 'supertest';
import initApp from '../App';
import mongoose from 'mongoose';
 import DonationModel from '../models/donationModal';
import e, { Express } from 'express';

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

  interface IDonation {
    itemName: string;
    quantity: number;
    category: string;
    condition: string;
    expirationDate: Date;
    description: string;
    pickupAddress: string;
    donor: mongoose.Types.ObjectId;
    status: string;
    image?: string;
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
  
  let DonorId: mongoose.Types.ObjectId;

  const donation: IDonation = {
    itemName: 'Canned goods',
    quantity: 10,
    category: 'Food',
    condition: 'New',
    expirationDate: new Date('2024-09-31'),
    description: 'Assorted canned foods',
    pickupAddress: '123 Main St',
    donor: DonorId, 
    status: 'Pending',
    image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  };
  
  const newDonation: IDonation = {
    itemName: 'Shirts',
    quantity: 20,
    category: 'Clothing',
    condition: 'Used',
    expirationDate: new Date('2024-12-31'),
    description: 'Gently used shirts',
    pickupAddress: '456 Oak Ave',
    donor: DonorId, 
    status: 'Pending',
    image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  };

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");
    await DonationModel.deleteMany();
    await request(app).post("/auth/register").send(donor);
    const response = await request(app).post("/auth/login").send(donor);
    DonorId= response.body._id;
    console.log('DonorId:', DonorId);
    donation.donor = DonorId;
    newDonation.donor = DonorId;
    accessToken = response.body.accessToken;
},60000);



afterAll(async () => {
  await mongoose.connection.close();
}, 30000);

let donationId: string;
let createdDonationId: string;

describe('Donation tests', () => {

  const addDonation = async (donation: IDonation) => {
    console.log('donation:', donation);
    console.log('donation.donor id:', donation.donor._id);
    const response = await request(app)
      .post('/donation/upload')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(donation);
    expect(response.statusCode).toBe(201);
    return response.body._id; 
  };

  test("Test Get All Donation - empty response", async () => {
    const response = await request(app).get("/donation/donations");
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test('Test Post Donation', async () => {
    donationId = await addDonation(donation);
    expect(donationId).toBeDefined(); 
  });

  test('Test Get All Donations with one donation in DB', async () => {
    const response = await request(app)
      .get('/donation/donations')
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const donationData = response.body[0];
    expect(donationData.itemName).toBe(donation.itemName);
    expect(donationData.quantity).toBe(donation.quantity);
    expect(donationData.category).toBe(donation.category);
    expect(donationData.condition).toBe(donation.condition);
    expect(donationData.description).toBe(donation.description);
    expect(donationData.pickupAddress).toBe(donation.pickupAddress);
    expect(donationData.status).toBe(donation.status);
    expect(donationData.donor._id).toBe(donation.donor);
  });

  test('Test  new Post Donation', async () => {
    createdDonationId = await addDonation(newDonation);
    expect(createdDonationId).toBeDefined(); 
  });

  test('Test get donation by id', async () => {
    const response = await request(app)
      .get(`/donation/donation/${createdDonationId}`)
    expect(response.statusCode).toBe(200);
    expect(response.body.itemName).toBe(newDonation.itemName);
    expect(response.body.quantity).toBe(newDonation.quantity);
    expect(response.body.category).toBe(newDonation.category);
    expect(response.body.condition).toBe(newDonation.condition);
    expect(response.body.description).toBe(newDonation.description);
    expect(response.body.pickupAddress).toBe(newDonation.pickupAddress);
    expect(response.body.status).toBe(newDonation.status);
    expect(response.body.donor._id).toBe(newDonation.donor);
  });

  test('Test PUT /donations/:id', async () => {
    const updatedDonation = { ...newDonation, quantity: 30 };
    const response = await request(app)
      .put(`/donation/update/${createdDonationId}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(updatedDonation);
    expect(response.statusCode).toBe(200);
    expect(response.body.quantity).toBe(updatedDonation.quantity);
  });

  test("Test PUT with wrong id /post/:id", async () => {
    const updatedPost = { ...newDonation, quantity: 40 };
    const response = await request(app)
      .put("/donation/update/" + "123")
      .set("Authorization", "JWT " + accessToken)
      .send(updatedPost);
    expect(response.statusCode).toBe(500);
  });

  test("Test DELETE with wrong id /post/:id", async () => {
    const response = await request(app).delete(`/donation/delete/"123"`).set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(500);
  });

  test('Test DELETE /donations/:id', async () => {
    const response = await request(app)
      .delete(`/donation/delete/${donationId}`)
      .set('Authorization', 'Bearer ' + accessToken);
    expect(response.statusCode).toBe(200);
  });

  test('Test DELETE /donations/:id', async () => {
    const response = await request(app)
      .delete(`/donation/delete/${createdDonationId}`)
      .set('Authorization', 'Bearer ' + accessToken);
    expect(response.statusCode).toBe(200);
  });

  test('Test Get All Donations - empty response', async () => {
    const response = await request(app)
      .get('/donation/donations')
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
});