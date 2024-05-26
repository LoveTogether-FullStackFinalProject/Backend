import mongoose from "mongoose";

export interface IAdmin {
  _id: string;
  name: string;
  email: string; 
  password: string;
  isAdmin: boolean;
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
  
});

export const AdminModel = mongoose.model<IAdmin>("Admin", adminSchema);
export default AdminModel;

