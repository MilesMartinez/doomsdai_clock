# DoomsdAI Clock

An AI-powered reimagining of the Doomsday Clock, combining advanced data analysis with the historic symbolism of humanity's proximity to global catastrophe.

This is the frontend for [doomsdaiclock.com](https://www.doomsdaiclock.com). The risk evaluations come from [doomsdai-backend-cdk](https://github.com/MilesMartinez/doomsdai-backend-cdk), a monthly Lambda that has Claude score seven global risk domains and writes the results to S3.

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

## How data is loaded

The site is a static export (`output: 'export'`), so it has no server. The browser reads the public `doomsdai-clock-risk-data` S3 bucket (us-east-1) directly:

1. It lists the date folders under `risk_evals/` and `total_risk_score/` and picks the newest.
2. It fetches the newest JSON file in each folder.
3. It turns `weighted_risk_score` into seconds to midnight on the client. The formula is the same linear one the backend uses: a score of 10 is 1s and a score of 1 is 600s.

## Deployment

Pushes to `main` build the site and deploy it to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). You can also run the workflow by hand from the Actions tab.

## Project Structure

- `src/app/page.tsx` - Main clock page, including the seconds-to-midnight conversion
- `src/app/about/page.tsx` - About page
- `src/components/Navbar.tsx` - Site navigation
- `src/lib/s3.ts` - Lists and fetches the latest risk data from the public S3 bucket
- `src/lib/data.ts` - Data fetching wrapper
- `src/types/risk.ts` - Risk data types and domain weights (keep these in sync with the backend's weights in `lib/lambda-handler/main.py`)
