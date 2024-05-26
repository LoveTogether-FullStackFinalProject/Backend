// import request from 'supertest';
// import app from '../App';
// import mongoose from 'mongoose';
// import Donor from '../models/donor_model';
// import Admin from '../models/admin_model';
// import Donation from '../models/donation_model';
// import bcrypt from 'bcrypt';

// let accessToken: string;

// interface IAdmin {
//   _id: string;
//   name: string;
//   email: string; 
//   password: string;
//   isAdmin: boolean;
// }

// const admin: IAdmin = {
//   _id: "123456",
//   name: "Admin",
//   email: "admin@test.com", 
//   password: "123456",
//   isAdmin: true,
// };

//   beforeAll(async () => {
//     await Admin.deleteMany();
//     await Donor.deleteMany({});
//     await request(app).post("/auth/register").send(admin);
//     const response = await request(app).post("/auth/login").send(admin);
//     accessToken = response.body.accessToken;
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   describe('Admin tests', () => {
//   describe('GET /api/users', () => {
//     it('should return all users', async () => {
//       const users = await Donor.insertMany([
//         { name: 'John', email: 'john@example.com', password: 'password123' },
//         { name: 'Jane', email: 'jane@example.com', password: 'password456' },
//       ]);

//       const res = await request(app)
//       .get('/api/users')
//       .set("Authorization", "Bearer " + accessToken);
//       expect(res.status).toBe(200);
//       expect(res.body.users.length).toBe(2);
//       expect(res.body.users[0].name).toBe('John');
//       expect(res.body.users[1].name).toBe('Jane');

//     });
//   });

//   describe('GET /api/users/:id', () => {
//     it('should return a user by ID', async () => {
//       const user = await Donor.create({
//         name: 'John',
//         email: 'john@example.com',
//         password: 'password123',
//       });

//       const res = await request(app)
//       .get(`/api/users/${user._id}`)
//       .set("Authorization", "Bearer " + accessToken);
//       expect(res.status).toBe(200);
//       expect(res.body.name).toBe('John');
//       expect(res.body.email).toBe('john@example.com');

//       await Donor.findByIdAndDelete(user._id);
//     });
//   });

//   describe('PUT /api/users', () => {
//     it('should update a user', async () => {
//       const user = await Donor.create({
//         name: 'John',
//         email: 'john@example.com',
//         password: 'password123',
//       });

//       const updatedUser = {
//         id: user._id,
//         user: {
//           name: 'John Doe',
//           email: 'johndoe@example.com',
//           password: 'newpassword',
//         },
//       };

//       const res = await request(app)
//       .put('/api/users')
//       .send(updatedUser)
//       .set("Authorization", "Bearer " + accessToken);
//       expect(res.status).toBe(200);
//       expect(res.body.name).toBe('John Doe');
//       expect(res.body.email).toBe('johndoe@example.com');

//       const isPasswordMatched = await bcrypt.compare(
//         'newpassword',
//         res.body.encryptedPassword
//       );
//       expect(isPasswordMatched).toBe(true);

//       await Donor.findByIdAndDelete(user._id);
//     });
//   });

//   describe('DELETE /api/users/:id', () => {
//     it('should delete a user', async () => {
//       const user = await Donor.create({
//         name: 'John',
//         email: 'john@example.com',
//         password: 'password123',
//       });

//       const res = await request(app)
//       .delete(`/api/users/${user._id}`)
//       .set("Authorization", "Bearer " + accessToken);
//       expect(res.status).toBe(200);
//       expect(res.body.message).toBe('Usere deleted succesfully');
//       const deletedUser = await Donor.findById(user._id);
//       expect(deletedUser).toBeNull();
//     });
//   });

//   describe('PUT /api/users/profile', () => {
//     it('should update the current user profile', async () => {
//       const user = await Donor.create({
//         name: 'John',
//         email: 'john@example.com',
//         password: 'password123',
//       });

//       const updatedUser = {
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//         password: 'newpassword',
//       };

//       const res = await request(app)
//         .put('/api/users/profile')
//         .set('Current-User-Id', user._id)
//         .send(updatedUser)
//         .set("Authorization", "Bearer " + accessToken);
//       expect(res.status).toBe(200);
//       expect(res.body.name).toBe('John Doe');
//       expect(res.body.email).toBe('johndoe@example.com');

//       const userFromDb = await Donor.findById(user._id);
//       const isPasswordMatched = await bcrypt.compare(
//         'newpassword',
//         userFromDb?.password || ''
//       );
//       expect(isPasswordMatched).toBe(true);

//       await Donor.findByIdAndDelete(user._id);
//     });
//   });

//   describe('GET /api/donations', () => {
//     it('should return all donations', async () => {
//       const donations = await Donation.insertMany([
//         { amount: 100, donor: 'John Doe', describe: 'bla bla bla' },
//         { amount: 200, donor: 'Jane Smith', describe: 'bla bla bla' },
//       ]);

//       const res = await request(app)
//       .get('/api/donations')
//       .set("Authorization", "Bearer " + accessToken);
//       expect(res.status).toBe(200);
//       expect(res.body.donations.length).toBe(2);
//       expect(res.body.donations[0].amount).toBe(100);
//       expect(res.body.donations[1].currency).toBe('EUR');

//       await Donation.deleteMany({});
//     });
//   });

//   describe('GET /api/donations/:id', () => {
//     it('should return a donation by ID', async () => {
//       const donation = await Donation.create({
//         amount: 100,
//         currency: 'USD',
//         donor: 'John Doe',
//         project: 'Project A',
//       });

//       const res = await request(app)
//       .get(`/api/donations/${donation._id}`)
//       .set("Authorization", "Bearer " + accessToken);
//       expect(res.status).toBe(200);
//       expect(res.body.amount).toBe(100);
//       expect(res.body.currency).toBe('USD');
//       expect(res.body.donor).toBe('John Doe');
//       expect(res.body.describe).toBe('bla bla bla');

//       await Donation.findByIdAndDelete(donation._id);
//     });
//   });

//   describe('PUT /api/donations', () => {
//     it('should update a donation', async () => {
//       const donation = await Donation.create({
//         amount: 100,
//         donor: 'John Doe',
//         describe: 'bla bla bla',
//       });

//       const updatedDonation = {
//         id: donation._id,
//         donation: {
//           amount: 200,
//           donor: 'Jane Smith',
//           describe: 'bla bla bla',
//         },
//       };

//       const res = await request(app).
//       put('/api/donations').send(updatedDonation)
//       .set("Authorization", "Bearer " + accessToken);
//       expect(res.status).toBe(200);
//       expect(res.body.amount).toBe(200);
//       expect(res.body.donor).toBe('Jane Smith');
//       expect(res.body.describe).toBe('bla bla bla');

//       await Donation.findByIdAndDelete(donation._id);
//     });
//   });

//   describe('DELETE /api/donations/:id', () => {
//     it('should delete a donation', async () => {
//       const donation = await Donation.create({
//         amount: 100,
//         donor: 'John Doe',
//         describe: 'bla bla bla',
//       });

//       const res = await request(app)
//       .delete(`/api/donations/${donation._id}`)
//       .set("Authorization", "Bearer " + accessToken);
//       expect(res.status).toBe(200);
//       expect(res.body.message).toBe('Donation deleted succesfully');

//       const deletedDonation = await Donation.findById(donation._id);
//       expect(deletedDonation).toBeNull();
//     });
//     })});