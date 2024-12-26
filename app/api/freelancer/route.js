import Freelancer from "@/lib/models/Register";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Fetch only freelancers with the role 'mentor'
    const mentors = await Freelancer.find({ role: 'mentor' });

    return new Response(JSON.stringify(mentors), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all Mentor Feed Posts", { status: 500 });
  }
};
