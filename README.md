# RelianceLab Frontend

React + Vite + TypeScript frontend for RelianceLab.

## Scripts
- `npm run dev` - start dev server
- `npm run build` - build production bundle
- `npm run preview` - preview production build

## Environment
Copy `.env.example` to `.env` and set values as needed.

## Docker
Build and run locally:

```bash
docker build -t reliancelab-frontend .
docker run --rm -p 8080:80 reliancelab-frontend
```

Then open `http://localhost:8080`.

## Hosting Note
Frontend production hosting is planned for Vercel. Docker is mainly for local parity/testing.
