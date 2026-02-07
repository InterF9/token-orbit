# Token Orbit Backend

Node.js/Express backend server for Token Orbit.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Edit `.env` and configure your settings (PORT, database, etc.)

## Development

Start the development server with auto-reload:
```bash
npm run dev
```

Start the production server:
```bash
npm start
```

## API Endpoints

- `GET /` - API status and info
- `GET /health` - Health check endpoint

## Project Structure

```
Backend/
├── server.js          # Main server entry point
├── routes/            # API route definitions
├── controllers/       # Request handlers
├── models/            # Data models
├── middleware/        # Custom middleware
├── config/            # Configuration files
└── utils/             # Utility functions
```

## Environment Variables

See `.env.example` for required environment variables.
