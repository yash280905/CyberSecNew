"use client"
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Detcard = ({ detection }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showInterpretation, setShowInterpretation] = useState(false);

    const toggleDetails = () => setShowDetails(!showDetails);
    const toggleInterpretation = () => setShowInterpretation(!showInterpretation);
    const deleteDet = async (Id) => {
        try {
          const res = await fetch(`/api/deleteDetection/${Id}`, {
            method: 'DELETE',
          });
          const json = await res.json();
          if (json.success) {
            alert('User deleted!');
          } else {
            console.error('Deletion failed:', json.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    const cyberRep= async (email, message) => {
      
        const res = await fetch("/api/reportCell", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, message }),
        });
      
        // Optional: alert user or reset form
        if (res.ok) {
          alert("Thank you for your report!");
        } else {
          alert("Oops! Something went wrong.");
        }
      };

    return (
        <div className="border rounded p-4 shadow my-4">
            <div className="text-red-500 font-bold">
                {new Date(detection.detectedAt).toLocaleString()}
            </div>
            <div className="mt-2">
                <button
                    onClick={toggleDetails}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 focus:outline-none"
                >
                    Details
                </button>
                <button
                    onClick={toggleInterpretation}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2 focus:outline-none"
                >
                    Interpretation
                </button>
                <button
                    onClick={() => deleteDet(detection._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2 focus:outline-none"
                >
                    Delete
                </button>
                <button
                    onClick={() => cyberRep("abhipsitb16@gmail.com", "I am a user of Sanjay Application \n The application has detected the following which might be a potential threat \n" + detection.details + '\n'+ detection.interpretation)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded focus:outline-none"
                >
                    Report to Cyber Cell
                </button>
            </div>
            {showDetails && (
                <div className="mt-2 p-2 border rounded bg-zinc-800 text-xl text-green-500">
                    <ul>
                        {Object.entries(detection.details).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}: </strong>
                                {String(value)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {showInterpretation && (
                <div className="mt-2 p-2 border text-white rounded bg-zinc-800">
                    <ReactMarkdown>
                        {detection.interpretation}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default Detcard;