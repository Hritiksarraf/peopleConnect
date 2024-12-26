import Freelancer from "@/lib/models/Register";
import { connectToDB } from "@/lib/mongodb/mongoose";
var CryptoJS = require("crypto-js");

export const POST = async (req) => {
  try {
    await connectToDB();

    const { 
      name, 
      email, 
      password, 
      phone, 
      skills,
      interest,
      aboutYourself,
      profilePhoto,
      role
    } = await req.json();

    // Check if user already exists
    const existingUser = await Freelancer.findOne({ phone: phone });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "freelancer already exists" }),
        { status: 400 }
      );
    }

    // Create new freelancer instance
    let f = new Freelancer({
      name:name,
      email:email,
      phone:phone,
      password: encryptedPassword,
      skills,
      interest,
      aboutYourself:aboutYourself,
      profilePhoto:profilePhoto, 
      role,
    });

    // Save freelancer to database
    await f.save();

    return new Response(JSON.stringify({ success: "success" }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ error: "freelancer cannot be registered" }),
      { status: 500 }
    );
  }
};
