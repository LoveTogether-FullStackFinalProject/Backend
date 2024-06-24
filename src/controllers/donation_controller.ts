import { Request, Response } from 'express';
import Donation from '../models/donation_model';
import mongoose from 'mongoose';

const getAllDonations = async (req: Request, res: Response): Promise<void> => {
    try {
        const donations = await Donation.find().populate('donor');
        res.status(200).send(donations);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching all donations' });
    }
};

const getDonationById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const donation = await Donation.findById(id).populate('donor');
        if (!donation) {
            res.status(404).send('Donation not found');
            return;
        }
        res.status(200).json(donation);
    } catch (err) {
        res.status(500).send('Internal Server Error -> getDonationById');
    }
};

const updateDonation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const donation = await Donation.findByIdAndUpdate(id, req.body, { new: true }).populate('donor');
        if (!donation) {
            res.status(404).json({ message: 'Donation not found' });
            return;
        }
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating donation' });
    }
};

const deleteDonation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const result = await Donation.findByIdAndDelete(id);
        if (!result) {
            console.log(`Donation not found: ${id}`);
        }
        console.log(`Donation deleted: ${id}`);
        res.status(200).send('Donation deleted successfully');
    } catch (error) {
        console.error('Error deleting donation:', error);
        res.status(500).send('Error deleting donation');
    }
};

const uploadDonation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { donor, itemName, quantity, category, condition } = req.body;
    const donation = await Donation.create(req.body);
    res.status(201).send(donation);
  } catch (error) {
    console.error('Error uploading donation:', error);
    res.status(500).send({ message: 'Error uploading donation' });
  }
};

const getDonationsByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
      const { userId } = req.params;
      console.log(`Fetching donations for userId: ${userId}`); // Verify userId

      if (!userId) {
          res.status(400).send('User ID is required');
          return;
      }

      const donations = await Donation.find({ donor: new mongoose.Types.ObjectId(userId) }).populate('donor');
      
      if (donations.length === 0) {
          console.log('No donations found for this user');
          res.status(404).send('No donations found for this user');
          return;
      }
      res.status(200).send(donations);
  } catch (error) {
      console.error('Error fetching donations for user:', error);
      res.status(500).send({ message: 'Error fetching donations for user' });
  }
};

export default {
  getAllDonations,
  getDonationsByUserId,
  getDonationById,
  updateDonation,
  deleteDonation,
  uploadDonation,
};
