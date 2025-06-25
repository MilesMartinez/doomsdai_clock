import { RiskData, RiskScores, RiskWeights, DEFAULT_WEIGHTS } from '@/types/risk';

export function calculateRiskScores(riskData: RiskData[]): RiskScores {
  return riskData.reduce((acc, risk) => {
    acc[risk.risk] = risk.risk_score;
    return acc;
  }, {} as RiskScores);
}

export function calculateAverageRisk(risks: RiskScores, weights: RiskWeights = DEFAULT_WEIGHTS): number {
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  const weightedSum = Object.entries(risks).reduce((sum, [risk, score]) => {
    return sum + (score * (weights[risk] || 0));
  }, 0);

  let averageRisk = weightedSum / totalWeight;

  // Apply "worsening trend" bonus if 3 or more domains are >= 7
  const worseningDomains = Object.values(risks).filter(score => score >= 7).length;
  if (worseningDomains >= 3) {
    averageRisk += 0.5;
  }

  // Cap risk at 10
  return Math.min(averageRisk, 10);
}

export function riskToSecondsToMidnight(score: number): number {
  const maxSafeSeconds = 600;
  const seconds = Math.floor(((10 - score) / 9) * (maxSafeSeconds - 1)) + 1;
  return Math.max(1, seconds);
}

export function formatTimeToMidnight(seconds: number): string {
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')} MINUTES`;
  }
  return `${seconds} SECONDS`;
}

export function calculateTimeToMidnight(riskData: RiskData[]): {
  seconds: number;
  formattedTime: string;
  averageRisk: number;
} {
  const risks = calculateRiskScores(riskData);
  const averageRisk = calculateAverageRisk(risks);
  const seconds = riskToSecondsToMidnight(averageRisk);
  const formattedTime = formatTimeToMidnight(seconds);

  return {
    seconds,
    formattedTime,
    averageRisk
  };
} 