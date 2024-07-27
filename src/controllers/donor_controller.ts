import { Request, Response } from 'express';
import DonorModel from '../models/donor_model';

class DonorController {
  async get(req: Request, res: Response) {
    try {
      const donors = await DonorModel.find();
      res.status(200).json(donors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const donor = await DonorModel.findById(req.params.id);
      if (!donor) {
        return res.status(404).json({ message: 'Donor not found' });
      }
      res.status(200).json(donor);
    } catch (error) {
      console.log("getById",error);
      res.status(500).json({ message: error.message });
    }
  }

  async post(req: Request, res: Response) {
    try {
      const donor = new DonorModel(req.body);
      await donor.save();
      res.status(201).json(donor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async putById(req: Request, res: Response) {
    try {
      const donor = await DonorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!donor) {
        return res.status(404).json({ message: 'Donor not found' });
      }
      res.status(200).json(donor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteById(req: Request, res: Response) {
    try {
      const donor = await DonorModel.findByIdAndDelete(req.params.id);
      if (!donor) {
        return res.status(404).json({ message: 'Donor not found' });
      }
      res.status(204).json({ message: 'Donor deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new DonorController();
