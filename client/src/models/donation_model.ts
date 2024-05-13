import mongoose from "mongoose";
import { IDonor } from "./donor_model";

export interface Donor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface IDonation {
  _id: string;
  category: string;
  productType: string; 
  amount: number;
  itemCondition: string;
  expirationDate: Date;
  description: string;
  pickUpAddress: string;
  donor: Donor;
}

const donationSchema = new mongoose.Schema<IDonation>({
    category: {
        type: String,
        required: true,
    },
    productType: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    itemCondition: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pickUpAddress: {
        type: String,
        required: false,
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donor",
        required: true,
    },
  
});

export const DonationModel = mongoose.model<IDonation>("Donation", donationSchema);
export default DonationModel;





