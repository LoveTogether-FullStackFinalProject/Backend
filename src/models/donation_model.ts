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
//   _id: string;
//   category: string;
//   productType: string; 
//   amount: number;
//   itemCondition: string;
//   expirationDate: Date;
//   description: string;
//   pickUpAddress: string;
//   donor: Donor;
//   status: string;
//   approvedByAdmin?: string; 
//   image: string;

itemName: string;
quantity: number;
category: string;
condition: string;
expirationDate: string;
description: string;
pickupAddress: string;
image: string;
donor: IDonor | mongoose.Types.ObjectId;


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
        type: String,
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
});

export const DonationModel = mongoose.model<IDonation>("Donation", donationSchema);
export default DonationModel;





