import { Request, Response } from 'express';
import Donor, { IDonor } from '../models/donor_model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { Document } from 'mongoose';
import Donation from '../models/donationModal'

const client = new OAuth2Client();

const googleSignin = async (req: Request, res: Response) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        const email = payload?.email;
        if (email != null) {
            let donor = await Donor.findOne({ 'email': email });
            if (donor == null) {
                donor = await Donor.create({
                    'firstName': payload?.name,
                    'lastName': payload?.family_name,
                    'phoneNumber': '0',
                    'mainAddress': '0',
                    'email': email,
                    'password': '0',
                    'isAdmin': false
                });
            }
            const tokens = await generateTokens(donor);
            res.status(200).send({
                email: donor.email,
                _id: donor._id,
                ...tokens,
            });
            console.log("Google sign-in successful");
        } else {
            throw new Error("Email not found in token payload");
        }
    } catch (err) {
        console.log("Google sign-in error:", err);
        return res.status(400).send(err.message);
    }
};

const generateTokens = async (donor: Document & IDonor) => {
    const accessToken = jwt.sign({ _id: donor._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    const refreshToken = jwt.sign({ _id: donor._id }, process.env.JWT_REFRESH_SECRET);
    if (donor.refreshTokens == null) {
        donor.refreshTokens = [refreshToken];
    } else {
        donor.refreshTokens.push(refreshToken);
    }
    // console.log("donor.refreshTokens in generateTokens:",donor.refreshTokens);
    await donor.save();
    return {
        'accessToken': accessToken,
        'refreshToken': refreshToken
    };
}

const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, phoneNumber, mainAddress,isAdmin, image } = req.body;
    if (!email || !password) {
        return res.status(400).send("missing email or password");
    }
    try {
        const existingDonor = await Donor.findOne({ 'email': email });
        if (existingDonor) {
            return res.status(406).send("email already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newDonor = await Donor.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            phoneNumber,
            mainAddress,
            isAdmin,
            rating: '0',
            image
        });

        const tokens = await generateTokens(newDonor);
        return res.status(201).send({
            firstName,
            lastName,
            email,
            phoneNumber,
            mainAddress,
            image,
            _id: newDonor._id,
            ...tokens
        });
    } catch (err) {
        console.log("register err",err);
        return res.status(400).send(err);
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("missing email or password");
        return res.status(400).send("missing email or password");
    }
    try {
        const donor = await Donor.findOne({ 'email': email });
        if (donor == null) {
            console.log("email or password incorrect");
            return res.status(401).send("email or password incorrect");
        }
        const match = await bcrypt.compare(password, donor.password);
        if (!match) {
            console.log("email or password incorrect2");
            return res.status(401).send("email or password incorrect");
        }
        const tokens = await generateTokens(donor);
        return res.status(200).send({
            firstName: donor.firstName,
            lastName: donor.lastName,
            email: donor.email,
            phoneNumber: donor.phoneNumber,
            mainAddress: donor.mainAddress,
            _id: donor._id,
            ...tokens
        });
    } catch (err) {
        return res.status(400).send("error missing email or password");
    }
}

const logout = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, donor: { '_id': string }) => {
        if (err) return res.sendStatus(401);
        try {
            const donorDb = await Donor.findOne({ '_id': donor._id });
            if (donorDb != null) {
                if (!donorDb.refreshTokens || !donorDb.refreshTokens.includes(refreshToken)) {
                    donorDb.refreshTokens = [];
                    await donorDb.save();
                    return res.sendStatus(401);
                } else {
                    donorDb.refreshTokens = donorDb.refreshTokens.filter(t => t !== refreshToken);
                    await donorDb.save();
                    console.log("logout success");
                    return res.sendStatus(200);
                }
            }
        } catch (err) {
            res.sendStatus(401).send(err.message);
        }
    });
}

const refresh = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (refreshToken == null) return res.sendStatus(401);
    console.log("refreshToken is:",refreshToken);
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, donor: { '_id': string }) => {
        if (err) {
            console.log("refreshToken err1:",err.message);
            return res.sendStatus(401);
        }
        try {
            const donorDb = await Donor.findOne({ '_id': donor._id });
            if (!donorDb) {
                console.log('Donor not found');
                return res.sendStatus(401);
            }
            if (!donorDb.refreshTokens || !donorDb.refreshTokens.includes(refreshToken)) {
                console.log("donorDb.refreshTokens:", donorDb.refreshTokens);
                donorDb.refreshTokens = [];
                await donorDb.save();
                console.log("refreshToken err2");
                return res.sendStatus(401);
            }
            const accessToken = jwt.sign({ _id: donor._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
            const newRefreshToken = jwt.sign({ _id: donor._id }, process.env.JWT_REFRESH_SECRET);
            donorDb.refreshTokens = donorDb.refreshTokens.filter(t => t !== refreshToken);
            donorDb.refreshTokens.push(newRefreshToken);
            await donorDb.save();
            console.log("new accessToken is:",accessToken); 
            console.log("newRefreshToken is:",newRefreshToken); 
            console.log("refreshToken success");
            return res.status(200).send({
                'accessToken': accessToken,
                'refreshToken': newRefreshToken
            });
        } catch (err) {
            console.log("refreshToken err3:",err.message);
            res.sendStatus(401).send(err.message);
        }
    });
}


const newPassword = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).send("missing email or password");
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const donor = await Donor.findOneAndUpdate(
            { email: email }, 
            { password: encryptedPassword},
            { new: true, useFindAndModify: false }
        );
        const tokens = await generateTokens(donor);
        return res.status(200).send({
            firstName: donor.firstName,
            lastName: donor.lastName,
            email: donor.email,
            phoneNumber: donor.phoneNumber,
            mainAddress: donor.mainAddress,
            _id: donor._id,
            ...tokens
        });
    } catch (err) {
        console.log("newPassword err",err);
        return res.status(400).send(err);
    }
};


export default {
    googleSignin,
    register,
    login,
    logout,
    refresh,
    generateTokens,
    newPassword,
}
