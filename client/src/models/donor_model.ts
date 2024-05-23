import mongoose, { Schema, model, Document } from "mongoose";
import { IDonation } from './donation_model';

export interface IDonor extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    refreshTokens?: string[];
    rating: string;
    donations: IDonation[];
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
    address: {
         type: String,
          required: true 
    },
    refreshTokens: {
        type: [String],
        required: false,
    },
    rating: {
        type: String,
        required: true
    },
    donations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Donation', 
        },
    ],
});

const DonorModel = model<IDonor>("Donor", DonorSchema);

export default DonorModel;
