
# FastAPI Backend Integration Guide

This document provides a comprehensive guide for integrating your financial modeling frontend with a FastAPI backend.

## 🚀 Backend Architecture Overview

The frontend is structured to work seamlessly with a FastAPI backend following these patterns:

### API Structure
```
http://localhost:8000/api/v1/
├── models/
│   ├── GET /models                          # Get all available models
│   ├── GET /models/{model_id}               # Get specific model info
│   ├── POST /models/{model_id}/calculate    # Run model calculations
│   └── {model_id}/
│       ├── variables/
│       │   ├── GET /                        # Get all variables
│       │   ├── POST /                       # Create variable
│       │   ├── PUT /{variable_id}           # Update variable
│       │   └── DELETE /{variable_id}        # Delete variable
│       ├── dashboard/                       # Dashboard data endpoints
│       ├── import/                          # Excel import endpoint
│       └── export/                          # Excel export endpoint
├── auth/ (optional)
│   ├── POST /login                          # User authentication
│   ├── POST /logout                         # User logout
│   └── GET /me                             # Get current user
```

## 🔧 FastAPI Implementation Steps

### 1. Create FastAPI Project Structure

```bash
mkdir financial_modeling_backend
cd financial_modeling_backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic pandas openpyxl

# Create project structure
mkdir app
mkdir app/api
mkdir app/models
mkdir app/services
mkdir app/core
```

### 2. Basic FastAPI Setup

Create `app/main.py`:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import models, variables, dashboard

app = FastAPI(title="Financial Modeling API", version="1.0.0")

# Configure CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(models.router, prefix="/api/v1/models", tags=["models"])
app.include_router(variables.router, prefix="/api/v1/models", tags=["variables"])
app.include_router(dashboard.router, prefix="/api/v1/models", tags=["dashboard"])

@app.get("/")
async def root():
    return {"message": "Financial Modeling API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

### 3. Pydantic Models

Create `app/models/schemas.py`:
```python
from pydantic import BaseModel
from typing import List, Optional, Literal
from datetime import datetime

class VariableBase(BaseModel):
    name: str
    value: float
    input_type: Literal['percentage', 'fixed', 'formula']
    category: str
    applies_to: Literal['income_statement', 'balance_sheet', 'cash_flow']
    description: Optional[str] = None
    unit: Optional[str] = None
    relative_to: Optional[str] = None

class VariableCreate(VariableBase):
    pass

class Variable(VariableBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class VariableSectionBase(BaseModel):
    title: str
    description: Optional[str] = None

class VariableSection(VariableSectionBase):
    id: str
    variables: List[Variable]

class ModelInfo(BaseModel):
    name: str
    description: str
    icon: str

class ModelConfig(BaseModel):
    info: ModelInfo
    variables: List[VariableSection]

class CalculationRequest(BaseModel):
    variables: List[VariableSection]
    scenario: str = "Base Case"

class CalculationResult(BaseModel):
    calculation_id: str
    status: str
    results: dict
    created_at: datetime
```

### 4. API Routers

Create `app/api/routers/models.py`:
```python
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.schemas import ModelConfig, CalculationRequest, CalculationResult
from app.services.model_service import ModelService

router = APIRouter()

@router.get("/", response_model=List[str])
async def get_available_models():
    """Get list of available financial models"""
    return ["3-statement", "dcf"]

@router.get("/{model_id}", response_model=ModelConfig)
async def get_model_by_id(model_id: str):
    """Get specific model configuration"""
    service = ModelService()
    model = await service.get_model_by_id(model_id)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    return model

@router.post("/{model_id}/calculate", response_model=CalculationResult)
async def calculate_model(model_id: str, request: CalculationRequest):
    """Run financial model calculations"""
    service = ModelService()
    result = await service.calculate_model(model_id, request.variables, request.scenario)
    return result
```

Create `app/api/routers/variables.py`:
```python
from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import Variable, VariableCreate, VariableSection
from app.services.variable_service import VariableService

router = APIRouter()

@router.get("/{model_id}/variables", response_model=List[VariableSection])
async def get_model_variables(model_id: str):
    """Get all variables for a specific model"""
    service = VariableService()
    variables = await service.get_model_variables(model_id)
    return variables

@router.post("/{model_id}/variables", response_model=Variable)
async def create_variable(model_id: str, variable: VariableCreate, section_id: str):
    """Create a new variable in a model section"""
    service = VariableService()
    created_variable = await service.create_variable(model_id, section_id, variable)
    return created_variable

@router.put("/{model_id}/variables/{variable_id}", response_model=Variable)
async def update_variable(model_id: str, variable_id: str, value: float, section_id: str):
    """Update a variable value"""
    service = VariableService()
    updated_variable = await service.update_variable(model_id, section_id, variable_id, value)
    if not updated_variable:
        raise HTTPException(status_code=404, detail="Variable not found")
    return updated_variable

@router.delete("/{model_id}/variables/{variable_id}")
async def delete_variable(model_id: str, variable_id: str, section_id: str):
    """Delete a variable"""
    service = VariableService()
    success = await service.delete_variable(model_id, section_id, variable_id)
    if not success:
        raise HTTPException(status_code=404, detail="Variable not found")
    return {"message": "Variable deleted successfully"}
```

### 5. Service Layer

Create `app/services/model_service.py`:
```python
from typing import List, Optional
from app.models.schemas import ModelConfig, VariableSection, CalculationResult
import uuid
from datetime import datetime

class ModelService:
    def __init__(self):
        # This would typically connect to your database
        pass
    
    async def get_model_by_id(self, model_id: str) -> Optional[ModelConfig]:
        """Get model configuration by ID"""
        # TODO: Implement database query
        # For now, return mock data based on your frontend configs
        if model_id == "3-statement":
            return ModelConfig(
                info={
                    "name": "3-Statement Model",
                    "description": "Income Statement, Balance Sheet, and Cash Flow",
                    "icon": "BarChart3"
                },
                variables=[]  # Load from database
            )
        return None
    
    async def calculate_model(self, model_id: str, variables: List[VariableSection], scenario: str) -> CalculationResult:
        """Run financial model calculations"""
        # TODO: Implement your financial calculation logic
        # This is where you'll implement the core financial modeling algorithms
        
        calculation_id = str(uuid.uuid4())
        
        # Placeholder calculation logic
        results = {
            "revenue": sum(var.value for section in variables for var in section.variables if var.category == "revenue"),
            "expenses": sum(var.value for section in variables for var in section.variables if var.category == "expense"),
            "scenario": scenario
        }
        
        return CalculationResult(
            calculation_id=calculation_id,
            status="completed",
            results=results,
            created_at=datetime.now()
        )
```

### 6. Database Setup (Optional)

Create `app/core/database.py`:
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/financial_modeling"
# For SQLite: "sqlite:///./financial_modeling.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

## 🔗 Frontend Integration Steps

### 1. Update Environment Variables

Create `.env` file in your React project:
```
REACT_APP_API_URL=http://localhost:8000/api/v1
```

### 2. Replace Mock API Calls

In your frontend files, replace the TODO comments with actual fetch calls:

```typescript
// Example: Replace in FinancialDashboard.tsx
async getModelVariables(modelId: string) {
  const response = await fetch(`${API_BASE_URL}/models/${modelId}/variables`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
```

### 3. Add Error Handling

Implement proper error handling for all API calls:

```typescript
try {
  const variables = await apiService.getModelVariables(modelId);
  setVariableSections(variables);
} catch (error) {
  console.error('API Error:', error);
  toast({
    title: "Error Loading Data",
    description: error.message || "Please try again.",
    variant: "destructive"
  });
}
```

## 🚀 Running the Backend

### 1. Start FastAPI Server

```bash
# In your backend directory
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Start Frontend

```bash
# In your React project directory
npm start
```

## 📊 Next Steps

1. **Implement Financial Calculations**: Add your actual financial modeling logic in the service layer
2. **Add Database Persistence**: Set up PostgreSQL/SQLite for data storage
3. **Add Authentication**: Implement user authentication if needed
4. **Add Testing**: Write unit and integration tests
5. **Add Documentation**: Use FastAPI's automatic API documentation
6. **Deploy**: Deploy to production using Docker, AWS, or similar

## 🔍 API Documentation

Once running, visit:
- `http://localhost:8000/docs` - Swagger UI
- `http://localhost:8000/redoc` - ReDoc documentation

## 🛠️ Development Tips

1. **Use FastAPI's dependency injection** for database sessions and authentication
2. **Implement proper logging** for debugging and monitoring
3. **Add input validation** using Pydantic models
4. **Use async/await** for better performance
5. **Implement caching** for expensive calculations
6. **Add rate limiting** to prevent abuse

Your frontend is now fully prepared for backend integration! The code includes all necessary API integration points, error handling, and loading states.
