import mongoose from "mongoose";



const FreelancerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    requird:true
  },
  skills: {
    type: Array, 
    required: true
  },
  interest: {
    type: Array, 
    required: true
  },
  booking: {
    type: Array, 
    required: false,
    default: []
  },

  blockedDates:[
    {
      date:Date,
      event:String
    }
  ],
  aboutYourself:{
    type:String,
    require:true
  },
  review:{
    type: Array, 
    
    default: []
  },
  stars: {
    type: Object,
    default: {star:5,noOfPeople:1,totalStar:5}
  },
  freelancerReview:{
    type: Array, // Fixed to use Array for storing reviews
    
    default: []
  },

  image:{
    type:Array,
    default:[]
  },
  video:{
    type:Array,
    default:[]
  },
  extraDetails:{
    type:Array,
    default:[]
  },
  orders:{
    type:Array,
    default:[]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isTermsAccepted:{
    type:Boolean,
    default:true,
  },
  isVerifiedByAdmin:{
    type:Boolean,
    default:false,
  }

});

const Freelancer = mongoose.models.Freelancer || mongoose.model("Freelancer", FreelancerSchema);


export default Freelancer;
