import e, { Request, Response } from "express";
import requestedDonation from "../models/requestedDonation_model";


const getAllrequestedDonations = async (
    req: Request,
    res: Response
    ): Promise<void> => {
    try {
        const rdonations = await requestedDonation.find();
        res.status(200).send( rdonations );
    } catch (error) {
        res.status(500).send({ message: "Error fetching all donations" });
    }
    };

    const getRequestedDonationById = async (
    req: Request,
    res: Response
    ): Promise<void> => {
    try {
        const { id } = req.params;
        const rdonation = await requestedDonation.findById(id);
        if (!rdonation) {
            res.status(404).send("Donation not found");
            return;
        }
        res.status(200).json(rdonation);
    } catch (err) {
        res.status(500).send("Internal Server Error -> getDonationById");
    }
    };

    const createRequestedDonation = async (
    req: Request,
    res: Response
    ): Promise<void> => {
    try {
        const rdonation = new requestedDonation(req.body);
        await rdonation.save();
        res.status(201)
        .send(rdonation)
    } catch (error) {
        res.status(500).send({ message: "Error creating donation" });
    }
    };

    const updateRequestedDonation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const rdonation = await requestedDonation.findByIdAndUpdate(id, req.body  , { new: true });
        if (!rdonation) {
            res.status(404).send("Donation not found");
            return;
        }   } catch (error) {
        res.status(500).send({ message: "Error updating donation" });
    }};

    const deleteRequestedDonation = async (
    req: Request,
    res: Response
    ): Promise<void> => {
    try {
        const { id } = req.params;
        const rdonation = await requestedDonation.findByIdAndDelete(id);
        if (!rdonation) {
            res.status(404).send("Donation not found");
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: "Error deleting donation" });
    }
    };


    export default {
    getAllrequestedDonations,
    getRequestedDonationById,
    createRequestedDonation,
    updateRequestedDonation,
    deleteRequestedDonation,
    };
    
