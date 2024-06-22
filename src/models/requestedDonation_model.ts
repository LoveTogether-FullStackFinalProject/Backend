import mongoose from "mongoose";

export interface IrequestedDonation {
  _id: string;
  category: string;
  productType: string; 
  amount: number;
  itemCondition: string;
  expirationDate: Date;
  description: string;
  image?: string;
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
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }

});

export const requestedDonationModel = mongoose.model<IrequestedDonation>("requestedDonation", requestedDonationSchema);
export default requestedDonationModel;





