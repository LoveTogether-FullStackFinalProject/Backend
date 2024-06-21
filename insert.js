const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://127.0.0.1/vehahavtem";

async function updateDonations() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('vehahavtem');
    const donationsCollection = database.collection('donations');
    const donorsCollection = database.collection('donors');

    // Find all donations
    const donations = await donationsCollection.find({}).toArray();

    for (let donation of donations) {
      if (donation.donor && typeof donation.donor === 'object') {
        const donorEmail = donation.donor.email;
        const donor = await donorsCollection.findOne({ email: donorEmail });
        
        if (donor) {
          // Update donation to reference donor's ObjectId
          await donationsCollection.updateOne(
            { _id: donation._id },
            { $set: { donor: donor._id } }
          );
          console.log(`Updated donation ${donation._id} to reference donor ${donor._id}`);
        } else {
          console.log(`No matching donor found for donation ${donation._id}`);
        }
      }
    }
  } finally {
    await client.close();
  }
}

updateDonations().catch(console.error);
