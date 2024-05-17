import { Request, Response } from 'express';
import { Model } from "mongoose";
import DonorModel, { IDonor } from "../models/donor_model";
import DonationModel from '../models/donation_model';

class ProfileController {

  async getProfile(req: Request, res: Response) {
    try {
      const user = await DonorModel.findById(req.params.id).populate('donations');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async getUserDonations(req: Request, res: Response) {
    try {
      const donations = await DonationModel.find({ donor: req.params.id });
      res.json(donations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async getApprovalStatus(req: Request, res: Response) {
    try {
      const user = await DonorModel.findById(req.params.id).populate('donations');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const approvalStatus = user.donations.map(donation => ({
        _id: donation._id,
        status: donation.status,
      }));
      res.json(approvalStatus);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
export default new ProfileController();
