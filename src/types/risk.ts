export interface RiskData {
  risk: string;
  risk_score: number;
  description: string;
  sources: string[];
  ts: string;
  dt: string;
}

export interface RiskScores {
  [key: string]: number;
}

export interface RiskWeights {
  [key: string]: number;
}

export const DEFAULT_WEIGHTS: RiskWeights = {
  "Nuclear Risk": 2.0,
  "Climate Change": 2.0,
  "Emerging Technologies": 1.5,
  "Biological Threats": 1.0,
  "Information Warfare & Disinformation": 0.75,
  "Global Governance and Diplomacy": 0.5,
  "Public Engagement & Awareness": 0.25
}; 