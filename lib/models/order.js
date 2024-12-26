import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  
  freelancerName: {
    type: String,
    required: true,
  },
  freelancerEmail: {
    type: String,
    required: true,
  },
  freelancerPhone: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  freelancerAproved:{
    type:Boolean,
    default:false
  },
  message:{
    type:String,
    requird:false,
    default:'NO message'
  },
  userId:{
    type:String,
    require:true
  },
  freelancerId:{
    type:String,
    require:true
  },
  freelancerCancel:{
    type:Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
