'use client';

import { useState, useEffect } from 'react';
import { getLatestRiskEvals, getLatestTotalRiskScore } from '@/lib/s3';
import { RiskData } from '@/types/risk';

function formatTimeToMidnight(score: number): string {
  const maxSafeSeconds = 600;
  const seconds = Math.floor(((10 - score) / 9) * (maxSafeSeconds - 1)) + 1;
  const safeSeconds = Math.max(1, Math.min(seconds, maxSafeSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function Home() {
  const [time, setTime] = useState<string>('--:--');
  const [risks, setRisks] = useState<RiskData[]>([]);
  const [averageRisk, setAverageRisk] = useState<number | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<RiskData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [riskData, totalRiskScore] = await Promise.all([
          getLatestRiskEvals(),
          getLatestTotalRiskScore(),
        ]);
        if (totalRiskScore !== null) {
          setTime(formatTimeToMidnight(totalRiskScore));
          setAverageRisk(totalRiskScore);
        }
        setRisks(riskData);
      } catch (error) {
        console.error('Failed to load risk data:', error);
      }
    };
    loadData();
  }, []);

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:gap-16">

          {/* Left sticky column — clock */}
          <div className="lg:w-1/2 lg:sticky lg:top-16 lg:self-start lg:h-[calc(100vh-4rem)] flex flex-col justify-center py-12">
            {/* Title as hot-pink badge */}
            <div className="bg-hot-pink px-4 py-3 mb-3 inline-block">
              <h1 className="font-cyber text-3xl md:text-4xl font-bold text-white leading-tight">
                the doomsd<span className="text-black">AI</span> clock
              </h1>
            </div>
            <p className="font-cyber text-xs text-white/40 tracking-widest uppercase mb-6">
              AI-Powered Doomsday Clock
            </p>

            {/* Massive clock */}
            <div className="font-digital text-[22vw] lg:text-[11vw] text-citrus leading-none">
              {time}
            </div>
            <div className="font-cyber text-xl md:text-2xl text-hot-pink font-bold mt-2 tracking-widest">
              TO MIDNIGHT
            </div>

            <div className="mt-8 font-cyber text-sm text-white/50">
              <span className="text-hot-pink">&gt;</span> THREAT LEVEL:{' '}
              <span className="text-white">{averageRisk?.toFixed(1) ?? '—'}/10</span>
            </div>
          </div>

          {/* Right scrollable column — risk cards */}
          <div className="lg:w-1/2 py-12 space-y-1">
            <p className="font-cyber text-xs text-white/40 tracking-widest uppercase mb-6">
              Select a risk factor for analysis
            </p>

            {risks.map((risk) => (
              <div
                key={risk.risk}
                className="border-l-4 border-citrus pl-4 pr-3 py-3 cursor-pointer transition-colors hover:bg-hot-pink/10"
                onClick={() => setSelectedRisk(risk === selectedRisk ? null : risk)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-cyber text-sm font-bold text-white">{risk.risk}</span>
                  <span className="font-digital text-lg text-hot-pink">{risk.risk_score}/10</span>
                </div>

                {/* Score bar */}
                <div className="w-full h-0.5 bg-white/10 mt-2">
                  <div
                    className="h-0.5 bg-citrus transition-all duration-500"
                    style={{ width: `${risk.risk_score * 10}%` }}
                  />
                </div>

                {selectedRisk?.risk === risk.risk && (
                  <div className="mt-4 space-y-3 text-sm animate-fadeIn">
                    <p className="text-white/80 font-cyber leading-relaxed">{risk.description}</p>
                    <div className="space-y-1">
                      <p className="text-citrus font-cyber text-xs tracking-widest">SOURCES</p>
                      {risk.sources.map((source, index) => (
                        <a
                          key={index}
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-hot-pink hover:text-citrus text-xs truncate transition-colors"
                        >
                          {source}
                        </a>
                      ))}
                    </div>
                    <p className="text-white/30 font-cyber text-xs">
                      Last updated: {new Date(risk.ts).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-8 space-y-3 text-white/40 border-t border-white/10">
              <p className="font-cyber text-xs leading-relaxed">
                The doomsdAI Clock is an AI-powered version of the original Doomsday Clock maintained since 1947 by the Bulletin of the Atomic Scientists.
              </p>
              <p className="font-cyber text-xs leading-relaxed">
                It represents how close humanity is to global catastrophe.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
