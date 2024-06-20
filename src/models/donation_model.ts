import mongoose, { Schema, model, Document } from "mongoose";
import { IDonor } from "./donor_model";

export interface IDonation {
  itemName: string;
  quantity: number;
  category: string;
  condition: string;
  expirationDate: Date;
  description: string;
  pickupAddress: string;
  donor: mongoose.Types.ObjectId;
  status: string;
  image?: string;
}

const donationSchema = new mongoose.Schema<IDonation>({
  itemName: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  condition: {
    type: String,
    required: false,
  },
  expirationDate: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  pickupAddress: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
});

export const DonationModel = mongoose.model<IDonation>("Donation", donationSchema);
export default DonationModel;
