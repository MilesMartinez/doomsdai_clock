import { RiskData } from '@/types/risk';

const BUCKET_NAME = 'doomsdai-clock-risk-data';
const REGION = 'us-east-1';
const RISK_EVALS_PREFIX = 'risk_evals/';
const TOTAL_RISK_SCORE_PREFIX = 'total_risk_score/';

// Example URL format: .../2025-06-28/total_risk_score_2025-06-28T02:56:36.090747.json
function getDateString(): string {
  // For testing, use the example date since the bucket might not have current date data
  return '2025-06-28';
}

interface TotalRiskScore {
  dt: string;
  ts: string;
  weighted_risk_score: number;
  seconds_to_midnight: number;
}

async function fetchFromS3PublicUrl(key: string): Promise<any> {
  const url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
  console.log('Fetching from S3:', url);
  
  try {
    const response = await fetch(url);
    console.log('S3 response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('S3 error response:', errorText);
      throw new Error(`Failed to fetch from S3: ${response.status} ${response.statusText}\nResponse: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Successfully parsed JSON from S3');
    return data;
  } catch (error: any) {
    console.error('Error in fetchFromS3PublicUrl:', {
      url,
      error: error.message,
      cause: error.cause
    });
    throw error;
  }
}

async function listS3Directory(prefix: string): Promise<string[]> {
  const url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/?list-type=2&prefix=${prefix}&delimiter=/`;
  console.log('Listing S3 directory:', url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to list S3 directory: ${response.statusText}`);
  }

  const text = await response.text();
  
  // Extract CommonPrefixes using regex
  const prefixMatches = text.match(/<Prefix>([^<]+)<\/Prefix>/g) || [];
  const prefixes = prefixMatches
    .map(match => {
      const content = match.replace(/<\/?Prefix>/g, '');
      // Only include entries that end with a slash (directories)
      return content.endsWith('/') ? content : null;
    })
    .filter((prefix): prefix is string => prefix !== null)
    .sort()
    .reverse();

  return prefixes;
}

async function listS3Files(prefix: string): Promise<string[]> {
  const url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/?list-type=2&prefix=${prefix}`;
  console.log('Listing S3 files:', url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to list S3 files: ${response.statusText}`);
  }

  const text = await response.text();
  
  // Extract Keys using regex
  const keyMatches = text.match(/<Key>([^<]+)<\/Key>/g) || [];
  const files = keyMatches
    .map(match => match.replace(/<\/?Key>/g, ''))
    .filter(key => key.endsWith('.json')) // Only include JSON files
    .sort()
    .reverse();

  return files;
}

export async function getLatestRiskEvals(): Promise<RiskData[]> {
  try {
    // First, get the latest date directory
    const dateDirs = await listS3Directory(RISK_EVALS_PREFIX);
    if (dateDirs.length === 0) {
      throw new Error('No risk evaluation directories found');
    }

    // Get the latest directory
    const latestDateDir = dateDirs[0];
    console.log('Latest risk evals directory:', latestDateDir);
    
    // Get the latest file in that directory
    const files = await listS3Files(latestDateDir);
    if (files.length === 0) {
      throw new Error('No risk evaluation files found');
    }

    const latestFile = files[0];
    console.log('Latest risk evals file:', latestFile);
    
    return await fetchFromS3PublicUrl(latestFile);
  } catch (error) {
    console.error('Error fetching risk data from S3:', error);
    throw error;
  }
}

export async function getLatestTotalRiskScore(): Promise<number | null> {
  try {
    // First, get the latest date directory
    const dateDirs = await listS3Directory(TOTAL_RISK_SCORE_PREFIX);
    if (dateDirs.length === 0) {
      throw new Error('No total risk score directories found');
    }

    // Get the latest directory
    const latestDateDir = dateDirs[0];
    console.log('Latest total risk score directory:', latestDateDir);
    
    // Get the latest file in that directory
    const files = await listS3Files(latestDateDir);
    if (files.length === 0) {
      throw new Error('No total risk score files found');
    }

    const latestFile = files[0];
    console.log('Latest total risk score file:', latestFile);
    
    const data = await fetchFromS3PublicUrl(latestFile) as TotalRiskScore;
    console.log('Parsed total risk score data:', data);
    
    return data.weighted_risk_score ?? null;
  } catch (error) {
    console.error('Error fetching total risk score from S3:', error);
    throw error;
  }
} 