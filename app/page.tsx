'use client';

import { useEffect, useState } from 'react';

type Trend = {
  product: string;
  company: string;
  ticker: string;
  hype: number;
  description: string;
};

export default function Home() {
  const [trends, setTrends] = useState<Trend[]>([]);

  useEffect(() => {
    fetch('/api/trends')
      .then(res => res.json())
      .then(data => setTrends(data));
  }, []);

  return (
    <main className="min-h-screen bg-[#0f1f0f] text-white p-4">
      <header className="text-3xl font-bold mb-4 flex justify-between items-center">
        <div className="text-green-400">🌿 TrendSniper</div>
        <div className="text-xl">☰</div>
      </header>

      <div className="space-y-4">
        {trends.map((trend, i) => (
          <div key={i} className="bg-[#1a2b1a] p-4 rounded-xl shadow-md">
            <div className="text-sm text-gray-400">{trend.product}</div>
            <div className="text-xl font-semibold">{trend.company} ({trend.ticker})</div>
            <div className="text-green-300 font-mono">🔥 Hype Score: {trend.hype}</div>
            <p className="text-sm mt-2">{trend.description}</p>
            <a className="text-blue-400 underline text-xs mt-1 block" href="#">View Strategy</a>
          </div>
        ))}
      </div>
    </main>
  );
}
