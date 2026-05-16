import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
}, { timestamps: true });

// This line prevents the "OverwriteModelError" crash
export default mongoose.models.Item || mongoose.model("Item", ItemSchema);