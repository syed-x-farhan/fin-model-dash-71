from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Dict, Optional, Any, Literal
import pandas as pd
import numpy as np
from datetime import datetime
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Financial Modeling API",
    description="FastAPI backend for financial modeling dashboard",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Pydantic Models
class Variable(BaseModel):
    id: str
    name: str
    description: str
    value: float
    unit: str
    input_type: Literal['percentage', 'fixed', 'formula']
    category: str
    applies_to: Literal['income_statement', 'balance_sheet', 'cash_flow']
    relative_to: Optional[str] = None

class VariableSection(BaseModel):
    id: str
    name: str
    description: str
    variables: List[Variable]

class ModelInfo(BaseModel):
    id: str
    name: str
    description: str
    type: Literal['three-statement', 'dcf', 'lbo', 'startup']
    complexity: Literal['Beginner', 'Intermediate', 'Advanced', 'Expert']
    timeEstimate: str
    color: str

class ModelConfiguration(BaseModel):
    info: ModelInfo
    variables: List[VariableSection]

class FinancialProjection(BaseModel):
    year: int
    revenue: float
    cogs: float
    gross_profit: float
    operating_expenses: float
    ebitda: float
    depreciation: float
    ebit: float
    interest_expense: float
    ebt: float
    taxes: float
    net_income: float
    # Balance Sheet
    cash: float
    accounts_receivable: float
    inventory: float
    current_assets: float
    ppe: float
    total_assets: float
    accounts_payable: float
    accrued_expenses: float
    current_liabilities: float
    long_term_debt: float
    total_debt: float
    equity: float
    # Cash Flow
    operating_cash_flow: float
    capex: float
    free_cash_flow: float
    financing_cash_flow: float
    net_cash_flow: float

class CalculationRequest(BaseModel):
    model_type: str
    variables: Dict[str, float]
    projection_years: int = 5
    base_year: int = 2024

class CalculationResponse(BaseModel):
    projections: List[FinancialProjection]
    summary: Dict[str, Any]
    created_at: datetime

# In-memory storage (in production, use a database)
financial_models: Dict[str, ModelConfiguration] = {}
calculation_results: Dict[str, CalculationResponse] = {}

# Financial calculation engine
class FinancialCalculator:
    def __init__(self):
        pass
    
    def calculate_three_statement_model(self, variables: Dict[str, float], projection_years: int = 5, base_year: int = 2024) -> List[FinancialProjection]:
        """
        Calculate 3-statement financial model projections
        """
        projections = []
        
        # Base year values
        base_revenue = variables.get('revenue', 10000000)
        base_cogs = variables.get('cogs', 4000000)
        base_opex = variables.get('operating_expenses', 3000000)
        base_depreciation = variables.get('depreciation_amortization', 500000)
        base_interest = variables.get('interest_expense', 200000)
        base_tax_rate = variables.get('tax_rate', 25) / 100
        
        # Growth assumptions
        revenue_growth = variables.get('revenue_growth_rate', 10) / 100
        gross_margin = variables.get('gross_margin_percent', 60) / 100
        opex_margin = variables.get('opex_percent_revenue', 30) / 100
        
        # Balance sheet assumptions
        base_cash = variables.get('cash', 1500000)
        base_ar = variables.get('accounts_receivable', 800000)
        base_inventory = variables.get('inventory', 600000)
        base_ppe = variables.get('ppe', 5000000)
        base_ap = variables.get('accounts_payable', 400000)
        base_accrued = variables.get('accrued_expenses', 300000)
        base_debt = variables.get('long_term_debt', 2000000)
        base_equity = variables.get('share_capital', 2700000)
        
        # Working capital assumptions
        dso = variables.get('dso_days', 30)
        inventory_days = variables.get('inventory_days', 60)
        dpo = variables.get('dpo_days', 45)
        
        # Cash flow assumptions
        capex_rate = variables.get('capex_percent_revenue', 8) / 100
        depreciation_rate = variables.get('depreciation_percent', 10) / 100
        
        for year in range(projection_years):
            year_num = base_year + year
            
            # Revenue projection
            revenue = base_revenue * ((1 + revenue_growth) ** year)
            
            # Income Statement
            cogs = revenue * (1 - gross_margin)
            gross_profit = revenue - cogs
            operating_expenses = revenue * opex_margin
            ebitda = gross_profit - operating_expenses
            depreciation = base_ppe * depreciation_rate * ((1 + revenue_growth) ** year)
            ebit = ebitda - depreciation
            interest_expense = base_interest * ((1 + revenue_growth) ** year)
            ebt = ebit - interest_expense
            taxes = max(0, ebt * base_tax_rate)
            net_income = ebt - taxes
            
            # Balance Sheet
            # Assets
            accounts_receivable = (revenue * dso) / 365
            inventory = (cogs * inventory_days) / 365
            current_assets = base_cash + accounts_receivable + inventory
            ppe = base_ppe * ((1 + revenue_growth) ** year)
            total_assets = current_assets + ppe
            
            # Liabilities
            accounts_payable = (cogs * dpo) / 365
            accrued_expenses = base_accrued * ((1 + revenue_growth) ** year)
            current_liabilities = accounts_payable + accrued_expenses
            long_term_debt = base_debt
            total_debt = long_term_debt
            
            # Equity (balancing item)
            equity = total_assets - current_liabilities - total_debt
            
            # Cash Flow
            operating_cash_flow = net_income + depreciation
            capex = revenue * capex_rate
            free_cash_flow = operating_cash_flow - capex
            financing_cash_flow = 0  # No new debt or equity assumed
            net_cash_flow = free_cash_flow + financing_cash_flow
            cash = base_cash + (net_cash_flow * (year + 1))
            
            projection = FinancialProjection(
                year=year_num,
                revenue=revenue,
                cogs=cogs,
                gross_profit=gross_profit,
                operating_expenses=operating_expenses,
                ebitda=ebitda,
                depreciation=depreciation,
                ebit=ebit,
                interest_expense=interest_expense,
                ebt=ebt,
                taxes=taxes,
                net_income=net_income,
                cash=cash,
                accounts_receivable=accounts_receivable,
                inventory=inventory,
                current_assets=current_assets,
                ppe=ppe,
                total_assets=total_assets,
                accounts_payable=accounts_payable,
                accrued_expenses=accrued_expenses,
                current_liabilities=current_liabilities,
                long_term_debt=long_term_debt,
                total_debt=total_debt,
                equity=equity,
                operating_cash_flow=operating_cash_flow,
                capex=capex,
                free_cash_flow=free_cash_flow,
                financing_cash_flow=financing_cash_flow,
                net_cash_flow=net_cash_flow
            )
            
            projections.append(projection)
        
        return projections

calculator = FinancialCalculator()

# API Routes
@app.get("/")
async def root():
    return {"message": "Financial Modeling API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

@app.post("/api/v1/models/{model_id}/calculate")
async def calculate_model(model_id: str, request: CalculationRequest):
    """
    Calculate financial projections for a specific model
    """
    try:
        if model_id == "3-statement":
            projections = calculator.calculate_three_statement_model(
                variables=request.variables,
                projection_years=request.projection_years,
                base_year=request.base_year
            )
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Model type '{model_id}' not supported yet"
            )
        
        # Calculate summary metrics
        summary = {
            "total_revenue_5yr": sum(p.revenue for p in projections),
            "avg_net_income": sum(p.net_income for p in projections) / len(projections),
            "total_free_cash_flow": sum(p.free_cash_flow for p in projections),
            "final_year_revenue": projections[-1].revenue,
            "final_year_net_income": projections[-1].net_income,
            "cagr_revenue": ((projections[-1].revenue / projections[0].revenue) ** (1/len(projections))) - 1,
            "avg_gross_margin": sum(p.gross_profit / p.revenue for p in projections) / len(projections),
            "avg_ebitda_margin": sum(p.ebitda / p.revenue for p in projections) / len(projections)
        }
        
        result = CalculationResponse(
            projections=projections,
            summary=summary,
            created_at=datetime.now()
        )
        
        # Store result
        calculation_results[f"{model_id}_{datetime.now().isoformat()}"] = result
        
        return result
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error calculating model: {str(e)}"
        )

@app.get("/api/v1/models/{model_id}/variables")
async def get_model_variables(model_id: str):
    """
    Get default variables for a specific model
    """
    # Return default variables based on model type
    if model_id == "3-statement":
        return {
            "model_id": model_id,
            "variables": {
                "revenue": 10000000,
                "cogs": 4000000,
                "operating_expenses": 3000000,
                "depreciation_amortization": 500000,
                "interest_expense": 200000,
                "tax_rate": 25,
                "revenue_growth_rate": 10,
                "gross_margin_percent": 60,
                "opex_percent_revenue": 30,
                "cash": 1500000,
                "accounts_receivable": 800000,
                "inventory": 600000,
                "ppe": 5000000,
                "accounts_payable": 400000,
                "accrued_expenses": 300000,
                "long_term_debt": 2000000,
                "share_capital": 2700000,
                "dso_days": 30,
                "inventory_days": 60,
                "dpo_days": 45,
                "capex_percent_revenue": 8,
                "depreciation_percent": 10
            }
        }
    else:
        raise HTTPException(
            status_code=404,
            detail=f"Model '{model_id}' not found"
        )

@app.post("/api/v1/models/{model_id}/variables")
async def update_model_variables(model_id: str, variables: Dict[str, float]):
    """
    Update variables for a specific model
    """
    # In production, save to database
    # For now, just return success
    return {
        "message": f"Variables updated for model {model_id}",
        "variables": variables,
        "updated_at": datetime.now()
    }

@app.get("/api/v1/models")
async def list_models():
    """
    List all available financial models
    """
    return {
        "models": [
            {
                "id": "3-statement",
                "name": "3-Statement Model",
                "description": "Integrated Income Statement, Balance Sheet, and Cash Flow Statement projections",
                "type": "three-statement",
                "complexity": "Intermediate",
                "timeEstimate": "15-30 min",
                "color": "from-blue-500 to-cyan-500"
            },
            {
                "id": "dcf",
                "name": "DCF Valuation",
                "description": "Discounted Cash Flow model with NPV and Terminal Value calculations",
                "type": "dcf",
                "complexity": "Advanced",
                "timeEstimate": "20-40 min",
                "color": "from-green-500 to-emerald-500"
            },
            {
                "id": "lbo",
                "name": "LBO Analysis",
                "description": "Leveraged Buyout model with debt structuring and returns analysis",
                "type": "lbo",
                "complexity": "Expert",
                "timeEstimate": "30-60 min",
                "color": "from-purple-500 to-violet-500"
            },
            {
                "id": "startup",
                "name": "Startup Model",
                "description": "Growth-focused financial projections for early-stage companies",
                "type": "startup",
                "complexity": "Beginner",
                "timeEstimate": "10-20 min",
                "color": "from-orange-500 to-red-500"
            }
        ]
    }

@app.get("/api/v1/calculations")
async def get_calculations():
    """
    Get all calculation results
    """
    return {
        "calculations": list(calculation_results.keys()),
        "total": len(calculation_results)
    }

@app.get("/api/v1/calculations/{calculation_id}")
async def get_calculation(calculation_id: str):
    """
    Get a specific calculation result
    """
    if calculation_id in calculation_results:
        return calculation_results[calculation_id]
    else:
        raise HTTPException(
            status_code=404,
            detail=f"Calculation '{calculation_id}' not found"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)