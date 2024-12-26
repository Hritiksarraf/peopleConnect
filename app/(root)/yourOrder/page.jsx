'use client'

import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken'; // To decode the token
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Script from 'next/script';
import Razorpay from 'razorpay';
import { useRouter } from 'next/navigation';


function OrdersPage() {
  const router=useRouter()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [localUser, setLocalUser] = useState(null);
  const [leftAmount, setLeftAmount] = useState(0)

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
        const response = await fetch('api/getOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: localUser.userid }),
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders.reverse());
          setLeftAmount(data.totalAmount - data.discount - data.paidAmount)
        } else {
          setError('Failed to fetch orders');
        }
      } catch (error) {
        setError('An error occurred while fetching orders');
      }
      setLoading(false);
    }

    fetchOrders();
  }, [localUser]);

  
 
  if (loading) {
    return (<div className='min-h-[80vh] w-[100vw]'>
      <Box sx={{ display: 'flex' }}>
        <div className='pt-80 flex items-center justify-center text-center mx-auto  '>
          <CircularProgress color="inherit" size="8rem" />
        </div>
      </Box>
    </div>);
  }
  if (error) return <p className="text-red-500 pt-32">{error}</p>;



  return (
    <div className='pt-32 bg-blue-100'>
      <div className="min-h-screen p-8 bg-blue-100">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <h1 className="text-3xl text-blue-900 font-bold text-center mb-6">Welcome <span className='text-yellow-600'>{localUser.name}</span> This is Your Order History!</h1>

        {orders.length === 0 ? (
          <p className="text-black text-5xl text-center mt-32">You have no orders.</p>
        ) : (
          <div className=''>
            <div className='md:w-[55vw] mx-auto  flex flex-col flex-wrap'>
            {orders.map((order) => {
  const isPending = !order.freelancerAproved && !order.freelancerCancel;
  const isApproved = order.freelancerAproved;
  const isDeclined = order.freelancerCancel;

  return (
    <section key={order._id} className="text-gray-600 body-font overflow-hidden my-5 bg-gradient-to-r from-white to-white">
      <div className="container lg:w-[60vw] p-4 md:p-5 py-2 mx-auto bg-white">
        <div className="mx-auto p-5 flex flex-wrap">
          <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <Link href={`/freelancer/${order.freelancerId}`}>
              <h2 className="text-sm title-font text-gray-700 tracking-widest">Mentor</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {order.freelancerName}
              </h1>
            </Link>

            <div className="mt-4">
              <h2 className="text-sm title-font text-gray-700 tracking-widest">Mentorship Status</h2>
              {isPending && <p className="text-yellow-600 font-bold">Pending Approval</p>}
              {isApproved && <p className="text-green-600 font-bold">Request Accepted</p>}
              {isDeclined && <p className="text-red-600 font-bold">Request Declined</p>}
            </div>

            <div className="mt-4">
              <h2 className="text-sm title-font text-gray-700 tracking-widest">Date</h2>
              <p className="text-xl font-bold">{order.date}</p>
            </div>

            <div className="mt-4">
              <h2 className="text-sm title-font text-gray-700 tracking-widest">Service Details</h2>
              <p className="text-gray-900">Order ID: {order.orderId}</p>
              <p className="text-gray-900">Customer Name: {order.customerName}</p>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                className="flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
              >
                Cancel
              </button>
              {(order.totalAmount - order.discount - order.paidAmount).toFixed(2) > 1 && (
                <button
                  onClick={() =>
                    handlePayment(
                      (order.totalAmount - order.discount - order.paidAmount).toFixed(2),
                      order._id,
                      order.customerName
                    )
                  }
                  className="flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
})}


            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
