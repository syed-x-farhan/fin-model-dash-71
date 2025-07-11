# Financial Dashboard Application

A comprehensive financial modeling dashboard application built with React, TypeScript, and FastAPI. Create, configure, and visualize various financial models including 3-Statement Models, DCF Valuations, LBO Analysis, and Startup Models.

## Features

- **Multiple Financial Models**: 3-Statement, DCF, LBO, and Startup financial models
- **Interactive Dashboards**: Real-time charts and KPI visualization
- **Excel Import**: Import and map financial data from Excel files
- **Backend Calculations**: Python FastAPI backend with authentic financial calculation engine
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Database Integration**: PostgreSQL with SQLAlchemy for data persistence

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- shadcn/ui components
- Tailwind CSS
- Recharts for data visualization
- TanStack Query for state management

### Backend
- FastAPI with Python 3.11
- SQLAlchemy ORM
- PostgreSQL database
- Real financial calculation engine

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd financial-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up database**
   ```bash
   # Configure your DATABASE_URL environment variable
   export DATABASE_URL="postgresql://user:password@localhost:5432/financial_models"
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Start the Python backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   python run_backend.py
   ```

The application will be available at:
- Frontend: http://localhost:5000
- Backend API: http://localhost:8000

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Application pages
│   │   ├── services/      # API service layer
│   │   └── config/        # Model configurations
├── backend/               # FastAPI backend
│   ├── main.py           # FastAPI application
│   ├── database.py       # Database models and operations
│   └── requirements.txt  # Python dependencies
├── server/               # Express.js server (auth & sessions)
└── shared/              # Shared TypeScript schemas
```

## Usage

1. **Select a Financial Model**: Choose from 3-Statement, DCF, LBO, or Startup models in the sidebar
2. **Configure Variables**: Adjust financial inputs and assumptions
3. **Calculate Projections**: Click "Calculate Model" to generate financial projections
4. **View Results**: Analyze results in interactive dashboards with charts and KPIs
5. **Import Data**: Use Excel import wizard to load existing financial data

## API Endpoints

- `POST /api/v1/calculate/{model_id}` - Calculate financial projections
- `GET /api/v1/models/{model_id}/variables` - Get model variables
- `PUT /api/v1/models/{model_id}/variables` - Update model variables
- `GET /api/v1/models` - List available models
- `GET /api/v1/calculations` - Get calculation history

## Development

### Adding New Financial Models

1. Create model configuration in `client/src/config/models/`
2. Add calculation logic in `backend/main.py`
3. Create dashboard component in `client/src/components/dashboards/`
4. Register model in configuration index

### Database Schema

The application uses PostgreSQL with the following main tables:
- `financial_models` - Model definitions and metadata
- `calculations` - Calculation results and projections
- `user_models` - User-specific model configurations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details