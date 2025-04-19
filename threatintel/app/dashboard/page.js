"use client"
import React, {useEffect, useState} from 'react';
import Detcard from '@/components/Detcard';

export default function Dashboard() {

  const [detections, setDetections]=useState([]);
  const [loading, setLoading]= useState(true);
  useEffect(()=>{
    const fetchdets=async ()=>{
        try{
            const res= await fetch('/api/findDetections');
            const json=await res.json();
            if(json.success){
                setDetections(json.data);
            }else{
                console.error("Failed to load detections");
            }
        }catch (err){
            console.error("Error fetching detections", err);
        } finally{
            setLoading(false);
        };
    };
    fetchdets();
  }, []);
  
  if(loading) return  <p>Loading Detections</p>;
  return (
    <div className="min-h-screen flex flex-col items-left justify-left bg-gradient-to-br from-black via-gray-900 to-black p-6 relative overflow-hidden">
      <div className="mt-4 text-red-500 text-3xl bg-zinc-800 w-1/4 rounded-lg p-4">
        Previous Detections
      </div>
      <div className="mt-6">
        {detections.map((detection) => (
          <Detcard key={detection._id} detection={detection} />
        ))}
      </div>
    </div>
  );
}
