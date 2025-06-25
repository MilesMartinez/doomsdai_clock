import { RiskData } from '@/types/risk';
import riskDataJson from '../../data/risk_data.json';

export async function getRiskData(): Promise<RiskData[]> {
  return riskDataJson as RiskData[];
} 