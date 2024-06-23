import mongoose from "mongoose";

export interface IAdmin {
  _id: string;
  name: string;
  email: string; 
  password: string;
  isAdmin: boolean;
  image?: string;
}

const adminSchema = new mongoose.Schema<IAdmin>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: true,
  },
  image: {
    type: String,
    required: false,
  }
  
});

export const AdminModel = mongoose.model<IAdmin>("Admin", adminSchema);
export default AdminModel;

