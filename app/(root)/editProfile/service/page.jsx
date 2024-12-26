'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import jwt from "jsonwebtoken";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import EditBar from '@/components/editBar/EditBar';
import Link from 'next/link';

import Image from 'next/image';



export default function page() {

    const [loading, setLoading] = useState(true);
    const [localUser, setLocalUser] = useState(null)
   
    const [freelancerData, setFreelancerData] = useState({
    });
    const [freelancerId, setFreelancerId] = useState(null);
    const [uploading, setUploading] = useState(false);


   

   

  

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if (skills.length==0 || Intrest.length==0) {
            alert("Please select at least one skill and intrest.");
            return;
        }

        setUploading(true);
        const id = freelancerData._id;

        // Post the updated freelancer profile data
        const response = await fetch('/api/edit/service', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                skills,
                interest:Intrest,
                id: freelancerId
            }),
        });
        const data = await response.json();
        if (response.ok) {
            alert("Profile updated successfully");
            setFreelancerData(data.freelancer.freelancerDetails); // Clear the selected file after successful upload
            await getUser()
        } else {
            alert("Failed to update profile: " + data.message || "Unknown error");
        }

        setUploading(false);
    };




    const getUser = async () => {
        if (localUser) {
            const response = await fetch(`/api/freelancer/${localUser.userid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            // console.log(data)
            setSkills(data.skills)
            setIntrest(data.interest)
            setFreelancerData(data);
            setLoading(false)
        }
    };




    useEffect(() => {
        getUser();
    }, [localUser, freelancerId]);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jwt.decode(token);
            setLocalUser(decodedUser);
            setFreelancerId(decodedUser.userid)

        }
    }, [])



        const [skillInput, setSkillInput] = useState("");
        const [skills, setSkills] = useState([]);
        const [intrestInput, setIntrestInput] = useState("");
        const [Intrest, setIntrest] = useState([]);
    
        const addSkill = () => {
            if (skillInput.trim() && !skills.includes(skillInput)) {
                setSkills([...skills, skillInput]);
                setSkillInput("");
            }
        };
    
        const addJobPreference = () => {
            if (intrestInput.trim() && !Intrest.includes(intrestInput)) {
                setIntrest([...Intrest, intrestInput]);
                setIntrestInput("");
            }
        };
    
        const removeItem = (item, setList, list) => {
            setList(list.filter((i) => i !== item));
        };
    
    

    if (loading) {
        return (<div className='min-h-[80vh] w-[100vw]'>
            <Box sx={{ display: 'flex' }}>
                <div className='pt-80 flex items-center justify-center text-center mx-auto  '>
                    <CircularProgress color="inherit" size="8rem" />
                </div>
            </Box>
        </div>);
    }



    return (
        <div className='min-h-[80vh] pt-32'>
            <div>
                <EditBar />
            </div>
            <div>
                <section className="bg-gradient-to-b md:min-h-[100vh] min-h-[100vh] mt-10  from-white to-yellow-200 ">
                    <div className="flex flex-col items-center    px-6  mx-auto ">

                    </div>
                    <div className="flex flex-col items-center my-auto justify-center shadow-2xl bg-white  border-2 w-[90vw] md:w-[30vw]  px-6 py-8 mx-auto  lg:py-0">


                        <h1 className="text-xl font-bold mt-4 mb-10 leading-tight tracking-tight text-black md:text-4xl ">
                            Update Your Services
                        </h1>
                        <div className="p-6 max-w-md mx-auto">
                                {/* Skills Section */}
                                <h2 className="text-gray-500 mt-6 mb-2 font-semibold">Skills</h2>
                                <div className="flex mb-4">
                                    <input
                                        type="text"
                                        placeholder="Add a skill"
                                        className="flex-1 bg-gray-100 rounded-md p-3 mr-2"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                    />
                                    <button
                                        onClick={addSkill}
                                        className="bg-blue-500 px-4 rounded-md text-white"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap">
                                    {skills.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => removeItem(item, setSkills, skills)}
                                            className="bg-blue-200 px-3 py-2 rounded-3xl text-center mr-2 mb-2"
                                        >
                                            {item}{" "}
                                            <span className="text-red-700 font-bold cursor-pointer">X</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Job Preferences Section */}
                                <h2 className="text-gray-500 mt-6 mb-2 font-semibold">Intrest</h2>
                                <div className="flex mb-4">
                                    <input
                                        type="text"
                                        placeholder="Add a Intrest"
                                        className="flex-1 md:w-[35vw]  bg-gray-100 rounded-md p-3 mr-2"
                                        value={intrestInput}
                                        onChange={(e) => setIntrestInput(e.target.value)}
                                    />
                                    <button
                                        onClick={addJobPreference}
                                        className="bg-blue-500 px-4 rounded-md text-white"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap">
                                    {Intrest.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => removeItem(item, setIntrest, Intrest)}
                                            className="bg-blue-200 px-3 py-2 rounded-3xl text-center mr-2 mb-2"
                                        >
                                            {item}{" "}
                                            <span className="text-red-700 font-bold cursor-pointer">X</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        <div className='flex justify-between w-[100%] md:mb-20'>
                            <button
                                onClick={handleSubmit}
                                disabled={uploading}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg"
                            >
                                {uploading ? "Updating..." : "Update Profile"}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
