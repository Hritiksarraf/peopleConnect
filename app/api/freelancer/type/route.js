import { NextResponse } from 'next/server';
import { connectToDB } from "@/lib/mongodb/mongoose";
import Freelancer from "@/lib/models/Register";

// Function to handle the API request
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawInterest = searchParams.get('interest'); // Optional
  const rawSkills = searchParams.get('skills'); // Optional

  // Decode URI components to handle spaces and special characters
  const interest = rawInterest ? decodeURIComponent(rawInterest) : null;
  const skills = rawSkills ? decodeURIComponent(rawSkills) : null;

  // Log the query parameters for debugging
  console.log('Received interest:', interest);
  console.log('Received skills:', skills);

  // Connect to the database
  await connectToDB();

  try {
    // Build the query object dynamically for case-insensitive search
    const query = { role: 'mentor' }; // Ensure only mentors are returned

    if (interest) {
      query.interest = { $regex: new RegExp(interest, 'i') }; // Case-insensitive regex for interest
    }

    if (skills) {
      query.skills = { $regex: new RegExp(skills, 'i') }; // Case-insensitive regex for skills
    }

    // Log the constructed query for debugging
    console.log('Constructed query:', query);

    // Search for freelancers based on the constructed query
    const freelancers = await Freelancer.find(query);

    // Check if any freelancers match the query
    if (freelancers.length === 0) {
      return new Response(
        JSON.stringify({ message: "No freelancers found matching the criteria." }),
        { status: 404 }
      );
    }

    // Return the list of matching freelancers
    return new Response(JSON.stringify(freelancers), { status: 200 });
  } catch (error) {
    // Return an error if something goes wrong
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: "Failed to fetch freelancers" }), { status: 500 });
  }
}
