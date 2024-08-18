import { Request, Response } from "express";
import Admin from "../models/admin_model";
import bcrypt from "bcrypt";
import Donor from "../models/donor_model";
import Donation from "../models/donationModal";

interface CustomRequest extends Request {
  locals: {
    currentUserId?: string;
  };
}
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const customReq = req as CustomRequest;
  try {
    const users = await Donor.find();
    res.status(200).send( users );
  } catch (error) {
    res.status(500).send({ message: "Error fetching all users" });
  }
};

const getAdmin = async (req: Request, res: Response): Promise<void> => {
  const customReq = req as CustomRequest;
  try {
    const admin = await Admin.find();
    res.status(200).send( admin[0] );
  } catch (error) {
    res.status(500).send({ message: "Error fetching admin" });
  }
}; 

const getUserById = async (req: Request, res: Response): Promise<void> => {
  const customReq = req as CustomRequest;
  try {
    const { id } = req.params;
    const donor = await Donor.findById(id);
    if (!donor) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).json(donor);
  } catch (err) {
    res.status(500).send("Internal Server Error -> getUserById");
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    const { name, email, password } = req.body.user;

    if (!name && !email && !password) {
      res
        .status(400)
        .send(
          "At least one field (name, email, or password) is required for update"
        );
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await Donor.findByIdAndUpdate(
      id,
      { name, email, encryptedPassword },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).send("User not found");
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).send("Internal Server Error -> updateUser");
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await Donor.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      res.status(404).send("User not found");
      return;
    }

    res.status(200).json({ message: "Usere deleted succesfully" });
  } catch (err) {
    res.status(500).send("Internal Server Error -> deleteUser");
  }
};



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

const updateDonation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;
        const { amount, currency, donor, project } = req.body.donation;
    
        if (!amount && !currency && !donor && !project) {
            res
            .status(400)
            .send(
                "At least one field (amount, currency, donor, or project) is required for update"
            );
            return;
        }
    
        const updatedDonation = await Donation.findByIdAndUpdate(
          id,
          { amount, currency, donor, project },
          { new: true }
        );

        if (!updatedDonation) {
          res.status(404).send("Donation not found");
          return;
        }
    
        res.status(200).json(updatedDonation);
    } catch (err) {
        res.status(500).send("Internal Server Error -> updateDonation");
    }
    };


    const deleteDonation = async (req: Request, res: Response): Promise<void> => {
        try {
            const deletedDonation = await Donation.findByIdAndDelete(req.params.id);
        
            if (!deletedDonation) {
                res.status(404).send("Donation not found");
                return;
            }
        
            res.status(200).json({ message: "Donation deleted succesfully" });
        } catch (err) {
            res.status(500).send("Internal Server Error -> deleteDonation");
        }
        };

    const StockAvailableDonations = async (
        req: Request,
        res: Response
        ): Promise<void> => {
        try {
            const donations = await Donation.find({status: "Available"});
            res.status(200).send( donations );
        } catch (error) {
            res.status(500).send({ message: "Error fetching all available donations" });
        }
        };

    //לבדוק לגבי דוחות נתונים
    // const dataReports = ????




    

  export default {
  getAllUsers,
  getAdmin,
  getUserById,
  updateUser,
  deleteUser,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  StockAvailableDonations,
};
