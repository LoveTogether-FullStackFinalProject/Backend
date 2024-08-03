const { MongoClient, ObjectId } = require('mongodb');

// Replace the following with your MongoDB connection string
const uri = 'mongodb+srv://chenamrani5:2IDFHMvrzhYXejQL@cluster0.fwwcmyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db('FINALPROJECT'); // Replace with your actual database name
    const donations = database.collection('donations');

    const donorId = new ObjectId("66acae74ba53675e46466c81"); // Replace with your actual donor ID

    const result = await donations.deleteMany({ donor: donorId });
    console.log(`${result.deletedCount} donations deleted`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
