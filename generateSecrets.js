const crypto = require('crypto');

// Function to generate a random hex string of given length
function generateRandomHexString(length) {
    return crypto.randomBytes(length).toString('hex');
}

// Generate random secret keys
const jwtSecret = generateRandomHexString(32); // Adjust the length as needed
const jwtRefreshSecret = generateRandomHexString(32); // Adjust the length as needed

console.log('JWT_SECRET:', jwtSecret);
console.log('JWT_REFRESH_SECRET:', jwtRefreshSecret);
