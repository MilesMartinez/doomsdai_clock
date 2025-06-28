import { NextResponse } from 'next/server';
import { getLatestRiskEvals, getLatestTotalRiskScore } from '@/lib/s3';

export async function GET() {
  try {
    const [riskData, totalRiskScore] = await Promise.all([
      getLatestRiskEvals(),
      getLatestTotalRiskScore()
    ]);

    return NextResponse.json({
      riskData,
      totalRiskScore
    });
  } catch (error: any) {
    console.error('Failed to fetch risk data:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch risk data' },
      { status: 500 }
    );
  }
} 