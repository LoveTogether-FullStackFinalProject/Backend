const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const donorRoute = require('./routes/donor_route');
const adminRoute = require('./routes/admin_route');
const donationRoute = require('./routes/donation_route');
const authRoute = require('./routes/auth_route');
const profileRoute = require('./routes/profile_route');
const mongoose = require('mongoose');
const fileRoute = require('./routes/file_route');

mongoose.connect(process.env.mongoURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
mongoose.connection.once("open", () => { console.log("connected to DB") });

const app = express();
const session = require('express-session');
app.use(session({
    saveUninitialized: false,
    resave: false
}));

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/donor', donorRoute);
app.use('/admin', adminRoute);
app.use('/donation', donationRoute);
app.use('/auth', authRoute);
app.use('/file', fileRoute);
app.use('/profile', profileRoute);

module.exports = app;
