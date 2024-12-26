import { connectToDB } from "@/lib/mongodb/mongoose";
import Order from "@/lib/models/order";
import Freelancer from "@/lib/models/Register";

export async function POST(req) {
  await connectToDB();

  try {
    // Parse request body
    const { freelancerId, userId, selectedDates, message } = await req.json();

    if (!freelancerId || !userId || !selectedDates || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400 }
      );
    }

    // Fetch freelancer details
    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) {
      return new Response(
        JSON.stringify({ error: "Freelancer not found." }),
        { status: 404 }
      );
    }

    // Fetch customer details
    const customer = await Freelancer.findById(userId) || await User.findById(userId);
    if (!customer) {
      return new Response(
        JSON.stringify({ error: "Customer not found." }),
        { status: 404 }
      );
    }

    // Generate a unique orderId
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create the order
    const newOrder = new Order({
      orderId,
      customerName: customer.name,
      freelancerName: freelancer.name,
      freelancerEmail: freelancer.email,
      freelancerPhone: freelancer.phone,
      date: selectedDates.join(", "),
      message,
      userId,
      freelancerId,
      freelancerApproved: false,
      freelancerCancel: false,
    });

    // Save the order
    await newOrder.save();

    // Update the customer's booking array
    if (!customer.booking) {
      customer.booking = [];
    }
    customer.booking.push(newOrder._id);
    await customer.save();

    // Update the freelancer's order array and blocked dates
    const newBlockedDates = selectedDates.map((date) => ({
      date,
      event: `Mentorship request from ${customer.name}`,
    }));

    if (!freelancer.blockedDates) {
      freelancer.blockedDates = [];
    }
    freelancer.blockedDates.push(...newBlockedDates);

    if (!freelancer.orders) {
      freelancer.orders = [];
    }
    freelancer.orders.push(newOrder._id);
    await freelancer.save();

    return new Response(
      JSON.stringify({ message: "Order created successfully", order: newOrder }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create order." }),
      { status: 500 }
    );
  }
}
