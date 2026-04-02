import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminUser extends Document {
  username: string;
  passwordHash: string;
  name: string;
  roleId?: mongoose.Types.ObjectId;
  status: "active" | "locked";
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role" },
    status: { type: String, enum: ["active", "locked"], default: "active" },
  },
  { timestamps: true }
);

const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser || mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);

export default AdminUser;
