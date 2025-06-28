import { RiskData } from '@/types/risk';
import { getLatestRiskEvals } from './s3';

export async function getRiskData(): Promise<RiskData[]> {
  try {
    return await getLatestRiskEvals();
  } catch (error) {
    console.error('Failed to fetch risk data:', error);
    throw error;
  }
} 