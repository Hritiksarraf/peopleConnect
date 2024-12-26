'use client'
import { useState, useEffect } from 'react';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers';
import Button from "@mui/material/Button";
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useBooking } from "../../app/(root)/context/BookingContext";
import jwt from "jsonwebtoken";

export default function PricePicker({ freelancerData }) {
    const [selectedDates, setSelectedDates] = useState([]); // Array to hold selected dates
    const [blockedDates, setBlockedDates] = useState([]);
    const [message, setMessage] = useState(""); // State to hold the message
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [userId, setUserid] = useState('')

    
      useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedUser = jwt.decode(token);
          setUserid(decodedUser.userid);
        }
        else {
          alert('please login before making an order')
          router.push('/log-in')
        }
      }, []);

    // Fetch blocked dates
    const getBlockedDates = async (Id) => {
        const data = await fetch(`/api/dates/${Id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const blockedDates2 = await data.json();
        const blockedDates1 = blockedDates2.map((ele) => ele?.date || "");
        const formattedDates = blockedDates1.map((date) => {
            const d = new Date(date);
            const localDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            return localDate.toISOString().split('T')[0]; // Convert back to YYYY-MM-DD format
        });
        setBlockedDates(formattedDates);
    };

    // Disable dates that are blocked or in the past
    const shouldDisableDate = (date) => {
        if (!date || !(date instanceof Date)) return false;
        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            .toISOString()
            .split('T')[0];
        return blockedDates.includes(normalizedDate) || date < new Date();
    };

    // Handle toggling of selected dates
    const handleDateToggle = (newDate) => {
        const formattedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;

        if (selectedDates.includes(formattedDate)) {
            setSelectedDates(selectedDates.filter((date) => date !== formattedDate));
        } else {
            setSelectedDates([...selectedDates, formattedDate]);
        }
    };

    // Fetch blocked dates when freelancerData is available
    useEffect(() => {
        if (freelancerData?._id) {
            getBlockedDates(freelancerData._id);
        }
    }, [freelancerData]);

    // Handle message sending
    const handleSendRequest = async () => {
        if (!message.trim()) {
            alert("Message cannot be empty.");
            return;
        }
        if (selectedDates.length === 0) {
            alert("Please select at least one date.");
            return;
        }

        const payload = {
            userId, 
            freelancerId: freelancerData._id,
            message,
            selectedDates,
        };

        try {
            const response = await fetch(`/api/order/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Request sent successfully!");
                setSelectedDates([]);
                setMessage("");
            } else {
                const error = await response.json();
                alert(`Failed to send request: ${error.message}`);
            }
        } catch (err) {
            alert("An error occurred while sending the request.");
        }
    };

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Send Mentorship Request</h3>
            
            <div className="md:w-[25vw] w-full ">
                <textarea
                    name="message"
                    id="message"
                    className=" w-full h-16 p-2 border rounded"
                    placeholder="Write a short message to the mentor..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
            </div>

            <div>
                <label className="block text-sm font-semibold mt-4 mb-1 text-gray-700">Check Available Dates!</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Select dates"
                        open={isCalendarOpen}
                        onOpen={() => setIsCalendarOpen(true)}
                        value={null} // Keeps the calendar open for multiple selections
                        onChange={(date) => {
                            if (date) handleDateToggle(date);
                        }}
                        shouldDisableDate={shouldDisableDate}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onClick={() => setIsCalendarOpen(true)}
                            />
                        )}
                        renderDay={(day, _selectedDates, pickersDayProps) => {
                            const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                            const isSelected = selectedDates.includes(formattedDate);

                            return (
                                <PickersDay
                                    {...pickersDayProps}
                                    sx={{
                                        ...(pickersDayProps.disabled && {
                                            color: 'red !important',
                                            border: '1px solid red',
                                            borderRadius: "4px",
                                            margin: "2px"
                                        }),
                                        ...(isSelected && {
                                            backgroundColor: 'blue !important',
                                            color: 'white !important',
                                            borderRadius: '90%',
                                        }),
                                    }}
                                />
                            );
                        }}
                    />
                    <button
                        onClick={() => setIsCalendarOpen(false)}
                        className="mt-4 bg-blue-500 ml-8 text-white py-2 px-4 rounded"
                    >
                        Done
                    </button>
                </LocalizationProvider>
            </div>

            <Button
                variant="contained"
                color="primary"
                className="mt-4"
                onClick={handleSendRequest}
            >
                Send Request
            </Button>
        </div>
    );
}
