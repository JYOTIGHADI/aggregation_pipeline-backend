import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: String,
  customerName: String,
  items: [
    {
      product: String,
      price: Number,
      qty: Number,
    },
  ],
  orderDate: String,
  status: String,
  paymentMethod: String,
  location: {
    city: String,
    pincode: Number,
  },
});

export default mongoose.model("Order", orderSchema);
