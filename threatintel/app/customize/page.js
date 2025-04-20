"use client"
import { useState } from "react";
function customize() {
    const [activeTab, setActiveTab] = useState('ip');
    const [ip, setIp] = useState('');
    const [prompt, setPrompt] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (activeTab === 'ip') {
        alert(`Ignorable IP Added: ${ip}`);
        setIp('');
      } else {
        alert(`LLM Prompt Customized:\n${prompt}`);
        setPrompt('');
      }
    };
  
    return (
        <div className="min-h-screen flex flex-col items-left justify-left bg-gradient-to-br from-black via-gray-900 to-black p-6 relative overflow-hidden">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-l-full transition-all duration-200 ${
              activeTab === 'ip' ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-gray-400'
            }`}
            onClick={() => setActiveTab('ip')}
          >
            Add Ignorable IP
          </button>
          <button
            className={`px-4 py-2 rounded-r-full transition-all duration-200 ${
              activeTab === 'prompt' ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-gray-400'
            }`}
            onClick={() => setActiveTab('prompt')}
          >
            Customize LLM Prompt
          </button>
        </div>
  
        <form onSubmit={handleSubmit}>
          {activeTab === 'ip' && (
            <div>
              <label className="block mb-2 text-white text-lg font-semibold">Ignorable IP Address:</label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="Enter IP address (e.g., 192.168.1.1)"
                className="w-3/4 p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          )}
  
          {activeTab === 'prompt' && (
            <div>
              <label className="block mb-2 text-white text-lg font-semibold">Customize Prompt:</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your custom LLM prompt here..."
                rows={5}
                className="w-3/4 p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>
          )}
  
          <button
            type="submit"
            className="mt-6 w-3/4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl text-lg font-bold hover:scale-102 transition-transform duration-300"
          >
            Submit
          </button>
        </form>
      </div>
  )
}

export default customize
