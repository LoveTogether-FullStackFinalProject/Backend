import mongoose from "mongoose";

export interface IrequestedDonation {
  _id: string;
  category: string;
  productType: string; 
  amount: number;
  itemCondition: string;
  expirationDate: Date;
  description: string;
}

const requestedDonationSchema = new mongoose.Schema<IrequestedDonation>({
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
    description: {
        type: String,
        required: true,
    },

});

export const requestedDonationModel = mongoose.model<IrequestedDonation>("requestedDonation", requestedDonationSchema);
export default requestedDonationModel;





