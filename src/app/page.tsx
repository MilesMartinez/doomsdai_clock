'use client';

import { useState, useEffect } from 'react';
import { getLatestRiskEvals, getLatestTotalRiskScore } from '@/lib/s3';
import { RiskData } from '@/types/risk';

// Convert risk score to time format (MM:SS)
function formatTimeToMidnight(score: number): string {
  const maxSafeSeconds = 600; // 10 minutes
  const seconds = Math.floor(((10 - score) / 9) * (maxSafeSeconds - 1)) + 1;
  const safeSeconds = Math.max(1, Math.min(seconds, maxSafeSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function Home() {
  const [time, setTime] = useState<string>('');
  const [description, setDescription] = useState('TO MIDNIGHT');
  const [risks, setRisks] = useState<RiskData[]>([]);
  const [averageRisk, setAverageRisk] = useState<number | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<RiskData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [riskData, totalRiskScore] = await Promise.all([
          getLatestRiskEvals(),
          getLatestTotalRiskScore()
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
    <main className="min-h-screen flex flex-col items-center py-24 pt-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Grid background effect */}
      <div className="fixed inset-0 bg-[linear-gradient(90deg,rgba(5,217,232,0.1)_1px,transparent_1px),linear-gradient(rgba(5,217,232,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="relative flex place-items-center z-10 w-full max-w-7xl">
        <div className="flex flex-col items-center space-y-12 w-full">
          <div className="flex flex-col items-center space-y-4 w-full">
            <h1 className="font-cyber text-4xl md:text-6xl font-bold text-cyber-pink animate-glow text-center">
              the doomsd<span className="text-cyber-blue animate-electric">AI</span> clock
            </h1>
            <p className="font-cyber text-sm text-cyber-blue/70 tracking-wider -mt-8">AI-Powered Doomsday Clock</p>
            
            <div className="cyber-border bg-cyber-darker/80 p-12 rounded-lg backdrop-blur-sm">
              <div className="relative">
                <div className="font-digital text-6xl md:text-8xl text-cyber-blue mb-4 animate-glitch">
                  {time}
                </div>
                <div className="font-cyber text-2xl md:text-4xl text-cyber-pink text-glow">
                  {description}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-7xl">
            <p className="mb-6 text-cyber-blue font-cyber text-lg">
              <span className="text-cyber-pink">&gt;</span> SYSTEM STATUS: Monitoring global catastrophic risks
              <br />
              <span className="text-cyber-pink">&gt;</span> THREAT LEVEL: {averageRisk?.toFixed(1) || 'Loading...'}/10
            </p>
            
            <div className="space-y-6 backdrop-blur-sm bg-cyber-darker/30 p-6 cyber-border">
              <div className="text-cyber-blue/80 font-cyber text-sm mb-4 flex items-center justify-center gap-2">
                <span className="animate-pulse">►</span>
                <span>SELECT ANY RISK FACTOR FOR DETAILED ANALYSIS AND SOURCE DATA</span>
                <span className="animate-pulse">◄</span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-auto">
                {risks.map((risk) => (
                  <div 
                    key={risk.risk} 
                    className={`cyber-border p-4 cursor-pointer transition-all hover:bg-cyber-darker/50 h-fit ${
                      !selectedRisk ? 'animate-pulse hover:animate-none' : ''
                    }`}
                    onClick={() => setSelectedRisk(risk === selectedRisk ? null : risk)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-cyber text-sm text-cyber-blue">{risk.risk}</span>
                      <span className="font-digital text-lg text-cyber-pink">{risk.risk_score}/10</span>
                    </div>
                    {selectedRisk?.risk === risk.risk && (
                      <div className="mt-4 space-y-4 text-sm animate-fadeIn">
                        <p className="text-white/80 font-cyber">{risk.description}</p>
                        <div className="space-y-1">
                          <p className="text-cyber-blue font-cyber text-xs">SOURCES:</p>
                          {risk.sources.map((source, index) => (
                            <a
                              key={index}
                              href={source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-cyber-pink hover:text-cyber-blue text-xs truncate"
                            >
                              {source}
                            </a>
                          ))}
                        </div>
                        <p className="text-cyber-blue/60 font-cyber text-xs">
                          Last updated: {new Date(risk.ts).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-4 text-white/80">
                <p className="font-cyber text-sm md:text-base">
                  The doomsdAI Clock is an AI-powered version of the original Doomsday Clock that has been maintained since 1947 by the Bulletin of the Atomic Scientists.
                </p>
                <p className="font-cyber text-sm md:text-base">
                  It is a symbol that represents how close humanity is to global catastrophe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 