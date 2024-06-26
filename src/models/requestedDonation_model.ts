import mongoose from "mongoose";

export interface IrequestedDonation {
  _id: string;
  itemName: string;
  category: string;
  amount: number;
  itemCondition: string;
  expirationDate?: Date;
  description: string;
  image?: string;
}

const requestedDonationSchema = new mongoose.Schema<IrequestedDonation>({
    itemName: {
        type: String,
        required: false,
    },
    category: {
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
    expirationDate: {
        type: Date,
        required: false,
    },
    image: {
        type: String,
        required: false,
    }

});

export const requestedDonationModel = mongoose.model<IrequestedDonation>("requestedDonation", requestedDonationSchema);
export default requestedDonationModel;





