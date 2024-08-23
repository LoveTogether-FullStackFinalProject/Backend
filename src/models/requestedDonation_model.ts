import mongoose, { Schema, model, Document } from "mongoose";

export interface IrequestedDonation {
  _id: string;
  itemName: string;
  category: string;
  amount: number;
  //itemCondition: string;
//   expirationDate?: Date;
  description: string;
  image?: string;
  customCategory?: string;
}

const requestedDonationSchema = new Schema<IrequestedDonation>({
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
    // itemCondition: {
    //     type: String,
    //     required: true,
    // },
    // expirationDate: {
    //     type: Date,
    //     required: false,
    // },
    image: {
        type: String,
        required: false,
    },
    customCategory: {
        type: String,
        required: false,
    }

});

const requestedDonationModel = model<IrequestedDonation>("requestedDonation", requestedDonationSchema);
export default requestedDonationModel;





