import e, { Request, Response } from "express";
import Donation from "../models/donation_model";




const getAllDonations = async (
    req: Request,
    res: Response
    ): Promise<void> => {
    try {
        const donations = await Donation.find();
        res.status(200).send( donations );
    } catch (error) {
        res.status(500).send({ message: "Error fetching all donations" });
    }
    };

    const getDonationById = async (
    req: Request,
    res: Response
    ): Promise<void> => {
    try {
        const { id } = req.params;
        const donation = await Donation.findById(id);
        if (!donation) {
            res.status(404).send("Donation not found");
            return;
        }
        res.status(200).json(donation);
    } catch (err) {
        res.status(500).send("Internal Server Error -> getDonationById");
    }
    };

    const createDonation = async (
    req: Request,
    res: Response
    ): Promise<void> => {
    try {
        const donation = new Donation(req.body);
        await donation.save();
        res.status(201)
        .send(donation)
    } catch (error) {
        res.status(500).send({ message: "Error creating donation" });
    }
    };

    const updateDonation = async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;
          const donation = await Donation.findByIdAndUpdate(id, req.body, { new: true });
          if (!donation) {
            res.status(404).send("Donation not found");
            return;
          }
          res.status(200).json(donation);
        } catch (error) {
          res.status(500).send({ message: "Error updating donation" });
        }
      };

    const deleteDonation = async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;
          const donation = await Donation.findByIdAndDelete(id);
          if (!donation) {
            res.status(404).send("Donation not found");
            return;
          } 
          res.status(204).send();
        } catch (error) {
          res.status(500).send({ message: "Error deleting donation" });
        }
      };

    export default {
    getAllDonations,
    getDonationById,
    createDonation,
    updateDonation,
    deleteDonation,
    };
    
