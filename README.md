# DoomsdAI Clock

An AI-powered reimagining of the Doomsday Clock, combining advanced data analysis with the historic symbolism of humanity's proximity to global catastrophe.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/lib/s3.ts` - AWS S3 integration for fetching risk data from public bucket
- `src/lib/data.ts` - Data fetching utilities
- `src/types/risk.ts` - TypeScript interfaces for risk data
- `src/utils/doomsday.ts` - Risk calculation utilities
- `src/components/` - React components
- `src/app/` - Next.js app router pages 