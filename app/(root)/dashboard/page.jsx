"use client";

import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Link from "next/link";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwt.decode(token);
      setLocalUser(decodedUser);
    }
  }, []);

  useEffect(() => {
    async function fetchOrders() {
      if (!localUser) return;
      try {
        const response = await fetch("/api/dashBoard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: localUser.userid }),
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders.reverse());
        } else {
          setError("Failed to fetch orders");
        }
      } catch (error) {
        setError("An error occurred while fetching orders");
      }
      setLoading(false);
    }

    fetchOrders();
  }, [localUser]);

  const handleAction = async (orderId, action) => {
    try {
      const response = await fetch(`/api/order/mentorship`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, action }),
      });

      if (response.ok) {
        const updatedOrders = orders.map((order) =>
          order.orderId === orderId
            ? {
                ...order,
                freelancerApproved: action === "accept",
                freelancerCancel: action === "decline",
              }
            : order
        );
        setOrders(updatedOrders);

        // Show alert feedback
        alert(
          action === "accept"
            ? "You have successfully accepted the order."
            : "You have successfully declined the order."
        );
      } else {
        console.error("Failed to update order");
        alert("Error updating the order.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating the order.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", height: "80vh", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="pt-10 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Welcome {localUser?.name}, These Are Your Orders!
      </h1>
      {orders.length === 0 ? (
        <p className="text-center text-2xl text-gray-700">You have no orders.</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {orders.map((order) => (
            <div key={order._id} className="p-6 mb-6 bg-white rounded shadow-md">
              <Link href={`/freelancer/${order.userId}`}>
              <h2 className="text-xl font-bold text-gray-800">{order.customerName}</h2></Link>
              <p className="text-gray-600">Message: {order.message}</p>
              <p className="text-gray-600">Date: {order.date}</p>
              <p className="text-gray-700 font-medium mt-2">
                Status:{" "}
                {order.freelancerApproved
                  ? "Accepted"
                  : order.freelancerCancel
                  ? "Declined"
                  : "Pending"}
              </p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleAction(order.orderId, "accept")}
                  className={`px-4 py-2 ${
                    order.freelancerApproved || order.freelancerCancel
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600"
                  } text-white rounded`}
                  disabled={order.freelancerApproved || order.freelancerCancel}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleAction(order.orderId, "decline")}
                  className={`px-4 py-2 ${
                    order.freelancerApproved || order.freelancerCancel
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600"
                  } text-white rounded`}
                  disabled={order.freelancerApproved || order.freelancerCancel}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
