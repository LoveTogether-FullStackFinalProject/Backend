import mongoose, { Schema, model, Document } from "mongoose";
import { IDonation } from './donation_model';

export interface IDonor extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    mainAddress: string;
    refreshTokens?: string[];
    rating?: string;
    image?: string;
    isAdmin?: boolean;
}

const DonorSchema = new Schema<IDonor>({
    firstName: { 
        type: String,
         required: true
     },
    lastName: {
         type: String,
          required: true 
    },
    email: {
         type: String,
          required: true,
           unique: true
     },
    password: { 
        type: String,
         required: true 
    },
    phoneNumber: {
         type: String,
          required: true
     },
    mainAddress: {
         type: String,
          required: true 
    },
    refreshTokens: {
        type: [String],
        required: false,
    },
    rating: {
        type: String,
        required: false
    },
  image: {
    type: String,
    required: false,
  },
 isAdmin: {
        type: Boolean,
        required: true,
    },
});

const DonorModel = model<IDonor>("Donor", DonorSchema);

export default DonorModel;
