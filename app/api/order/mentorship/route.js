import { connectToDB } from "@/lib/mongodb/mongoose";
import Order from "@/lib/models/order";
import Freelancer from "@/lib/models/Register";

export async function POST(req) {
  const { orderId, action } = await req.json();

  if (!orderId || !action) {
    return new Response(
      JSON.stringify({ error: "Missing required fields" }),
      { status: 400 }
    );
  }

  await connectToDB();

  try {
    // Determine update fields based on action (accept/decline)
    const updateFields = {
    freelancerAproved: action === "accept",
      freelancerCancel: action === "decline",
    };

    // Find the order by orderId
    const order = await Order.findOne({ orderId });
    if (!order) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404 }
      );
    }

    // Ensure the action is irreversible (no reverts)
    if (order.freelancerApproved || order.freelancerCancel) {
      return new Response(
        JSON.stringify({ error: "Action already taken, cannot be reverted" }),
        { status: 400 }
      );
    }

    // Update order status
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedOrder) {
      return new Response(
        JSON.stringify({ error: "Failed to update order" }),
        { status: 500 }
      );
    }

    // Update freelancer's orders and blocked dates
    const freelancer = await Freelancer.findById(order.freelancerId);
    if (!freelancer) {
      return new Response(
        JSON.stringify({ error: "Freelancer not found" }),
        { status: 404 }
      );
    }

    if (action === "accept") {
      // Add to freelancer's orders if accepted
      if (!freelancer.orders.includes(order._id)) {
        freelancer.orders.push(order._id);
      }
    } else if (action === "decline") {
      // Remove blocked dates related to declined order
      freelancer.blockedDates = freelancer.blockedDates.filter(
        (blockedDate) =>
          !order.date.split(", ").includes(blockedDate.date) ||
          !blockedDate.event.includes(order.customerName)
      );
    }

    await freelancer.save();

    return new Response(
      JSON.stringify({ message: "Order updated successfully", updatedOrder }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
