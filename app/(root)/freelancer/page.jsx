'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // To get query params
import ServiceCard from '@/components/card/ServiceCard';
import SearchBar from '@/components/searchBar/SearchBar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Page() {
  
  const [data, setData] = useState([]); // Store freelancers data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Construct the API endpoint with conditionally included query params
        let apiUrl = '/api/freelancer';
        
        // Append interest and/or skills if they are available
       
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result); // Update state with data
      } catch (err) {
        setError(err.message); // Set error state
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []); // Re-fetch when query params change

  if (loading) {
    return (
      <div className="min-h-[80vh] w-[100vw]">
        <Box sx={{ display: 'flex' }}>
          <div className="pt-80 flex items-center justify-center text-center mx-auto">
            <CircularProgress color="inherit" size="8rem" />
          </div>
        </Box>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] w-[100vw] flex items-center justify-center text-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-[80vh]">
      <div>
        <SearchBar />
      </div>
      {data.length === 0 ? (
        <p className="text-center text-2xl mt-10 md:text-5xl">
          No Mentor found 
        </p>
      ) : (
        <>
          <p className="text-center font-bold text-2xl md:text-5xl my-10">
            Mentor for your 
            <span className="text-blue-600 mx-2">
              Skills and Interest
            </span>
          </p>
          <div className="flex flex-wrap gap-8">
            {data.map((freelancer) => (
              <ServiceCard key={freelancer._id} {...freelancer} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
