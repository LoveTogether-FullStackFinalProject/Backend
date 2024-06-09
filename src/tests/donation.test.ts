// donation_test.ts
import request from 'supertest';
import initApp from '../App';
import mongoose from 'mongoose';
import DonationModel, { IDonation } from '../models/donation_model';
import { Express } from 'express';

let app: Express;
let accessToken: string;

interface IDonor {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
  }
  
  const donor: IDonor = {
    firstName: "John",
    lastName: "Doe",
    email: "testDonor@test.com",
    password: "123456",
    phoneNumber: "1234567890",
    address: "123 Test Street",
  };
  

const donation: IDonation = {
  _id: '1',
  category: 'Food',
  productType: 'Canned goods',
  amount: 10,
  itemCondition: 'New',
  expirationDate: new Date('2024-05-31'),
  description: 'Assorted canned foods',
  pickUpAddress: '123 Main St',
  donor: '1' as any, // Replace with a valid donor ID
  status: 'Pending',
  image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
};

const newDonation: IDonation = {
  _id: '2',
  category: 'Clothing',
  productType: 'Shirts',
  amount: 20,
  itemCondition: 'Used',
  expirationDate: new Date('2023-12-31'),
  description: 'Gently used shirts',
  pickUpAddress: '456 Oak Ave',
  donor: '2' as any, // Replace with a valid donor ID
  status: 'Pending',
  image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
};
beforeAll(async () => {
    // app = await initApp();
    await DonationModel.deleteMany();

    await request(app).post("/auth/register").send(donor);
    const response = await request(app).post("/auth/login").send(donor);
    accessToken = response.body.accessToken;
});

afterAll(async () => {
    await mongoose.connection.close();
  await mongoose.connection.close();
});

describe('Donation tests', () => {
  const addDonation = async (donation: IDonation) => {
    const response = await request(app)
      .post('/donations')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(donation);
    expect(response.statusCode).toBe(201);
    return response.body._id; // Return the generated _id
  };

  test('Test Get All Donations with one donation in DB', async () => {
    const donationId = await addDonation(donation);
    const response = await request(app)
      .get('/donations')
      .set('Authorization', 'Bearer ' + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const donationData = response.body[0];
    expect(donationData.category).toBe(donation.category);
    expect(donationData.productType).toBe(donation.productType);
    expect(donationData.amount).toBe(donation.amount);
    expect(donationData.itemCondition).toBe(donation.itemCondition);
    expect(donationData.expirationDate).toEqual(donation.expirationDate);
    expect(donationData.description).toBe(donation.description);
    expect(donationData.pickUpAddress).toBe(donation.pickUpAddress);
    expect(donationData.donor).toBe(donation.donor);
  });

  test('Test Post Donation', async () => {
    const createdDonationId = await addDonation(newDonation);
    expect(createdDonationId).toBeDefined(); // Check if the _id is defined
  });

  test('Test get donation by id', async () => {
    const createdDonationId = await addDonation(newDonation);
    const response = await request(app)
      .get(`/donations/${createdDonationId}`)
      .set('Authorization', 'Bearer ' + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.category).toBe(newDonation.category);
    expect(response.body.productType).toBe(newDonation.productType);
    expect(response.body.amount).toBe(newDonation.amount);
    expect(response.body.itemCondition).toBe(newDonation.itemCondition);
    expect(response.body.expirationDate).toEqual(newDonation.expirationDate);
    expect(response.body.description).toBe(newDonation.description);
    expect(response.body.pickUpAddress).toBe(newDonation.pickUpAddress);
    expect(response.body.donor).toBe(newDonation.donor);
  });

  test('Test PUT /donations/:id', async () => {
    const createdDonationId = await addDonation(newDonation);
    const updatedDonation = { ...newDonation, amount: 30 };
    const response = await request(app)
      .put(`/donations/${createdDonationId}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(updatedDonation);
    expect(response.statusCode).toBe(200);
    expect(response.body.amount).toBe(updatedDonation.amount);
  });

  test('Test DELETE /donations/:id', async () => {
    const createdDonationId = await addDonation(newDonation);
    const response = await request(app)
      .delete(`/donations/${createdDonationId}`)
      .set('Authorization', 'Bearer ' + accessToken);
    expect(response.statusCode).toBe(200);
  });

  test('Test Get All Donations - empty response', async () => {
    const response = await request(app)
      .get('/donations')
      .set('Authorization', 'Bearer ' + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
});