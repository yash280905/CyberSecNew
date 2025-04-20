import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-12 bg-cover bg-center">
      <div className="bg-black/70 p-10 rounded-2xl max-w-5xl mx-auto space-y-10">
        <h1 className="text-5xl font-extrabold text-center text-orange-500 drop-shadow-md">
          🔱 Meet Sanjay: The Sentinel of Cyberspace
        </h1>

        <p className="text-xl text-center text-gray-300">
          Inspired by the narrator of the Mahabharat, <span className="text-orange-500 font-semibold">Sanjay</span> brings you real-time insights into your network's battlefield. Just like he relayed the Kurukshetra war to Dhritarashtra, our AI-powered sentinel keeps you informed of every cyber malicious cyber move against you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            title="Real-time Intrusion Detection"
            description="Backed by a powerful ML model, Sanjay scans your network traffic and instantly flags malicious activity."
          />
          <FeatureCard
            title="Humanized AI Narration"
            description="A Large Language Model (LLM) translates cyber threats into simple, actionable alerts."
          />
          <FeatureCard
            title="Custom Watchlist"
            description="Trust certain IPs? No problem. You can customize Sanjay to ignore alerts from whitelisted addresses."
          />
          <FeatureCard
            title="One-Click Cybercell Reporting"
            description="Detected something fishy? Report intrusions directly to the cybercell with a single click."
          />
        </div>

        <div className="mt-16 bg-gray-800/60 p-8 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-3xl font-bold text-orange-500 mb-4">Why Sanjay?</h2>
          <p className="text-gray-200">
            In a world where digital warfare is constant, Sanjay stands as your divine charioteer—observing, analyzing, and alerting you with wisdom and clarity.
          </p>
        </div>

        <footer className="text-center text-gray-500 text-sm pt-10 border-t border-gray-700">
          © {new Date().getFullYear()} Sanjay Web App — Keeping Your Kurukshetra Secure
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-gray-800/60 p-6 rounded-xl shadow-md border border-gray-700 hover:border-cyan-400 transition-all duration-300">
      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
