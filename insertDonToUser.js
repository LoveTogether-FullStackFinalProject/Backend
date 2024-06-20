const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://127.0.0.1/vehahavtem";

async function insertDonation() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('vehahavtem');
    const donationsCollection = database.collection('donations');

    const newDonation = {
      itemName: 'Winter Jacket',
      quantity: 10,
      category: 'Clothing',
      condition: 'Gently Used',
      expirationDate: new Date('2024-11-30'),
      description: 'Winter jackets in various sizes and colors',
      pickupAddress: '123 Main St',
      donor: new ObjectId('66740b0aa5f6d17e945c2a34'),  // Replace with the actual user ID
      status: 'Pending'
    };

    const result = await donationsCollection.insertOne(newDonation);
    console.log(`New donation inserted with the following id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

insertDonation().catch(console.error);
