// API service for connecting frontend to FastAPI backend

export interface FinancialProjection {
  year: number;
  revenue: number;
  cogs: number;
  gross_profit: number;
  operating_expenses: number;
  ebitda: number;
  depreciation: number;
  ebit: number;
  interest_expense: number;
  ebt: number;
  taxes: number;
  net_income: number;
  cash: number;
  accounts_receivable: number;
  inventory: number;
  current_assets: number;
  ppe: number;
  total_assets: number;
  accounts_payable: number;
  accrued_expenses: number;
  current_liabilities: number;
  long_term_debt: number;
  total_debt: number;
  equity: number;
  operating_cash_flow: number;
  capex: number;
  free_cash_flow: number;
  financing_cash_flow: number;
  net_cash_flow: number;
}

export interface CalculationRequest {
  model_type: string;
  variables: Record<string, number>;
  projection_years?: number;
  base_year?: number;
}

export interface CalculationResponse {
  projections: FinancialProjection[];
  summary: Record<string, any>;
  created_at: string;
}

export interface ModelVariables {
  model_id: string;
  variables: Record<string, number>;
}

// FastAPI backend URL - Direct connection to port 8000
const API_BASE_URL = 'http://localhost:8000';

class FinancialAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async calculateModel(modelId: string, variables: Record<string, number>, projectionYears: number = 5, baseYear: number = 2024): Promise<CalculationResponse> {
    const request: CalculationRequest = {
      model_type: modelId,
      variables,
      projection_years: projectionYears,
      base_year: baseYear
    };

    const response = await fetch(`${this.baseURL}/api/v1/models/${modelId}/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to calculate model: ${response.statusText}`);
    }

    return response.json();
  }

  async getModelVariables(modelId: string): Promise<ModelVariables> {
    const response = await fetch(`${this.baseURL}/api/v1/models/${modelId}/variables`);
    
    if (!response.ok) {
      throw new Error(`Failed to get model variables: ${response.statusText}`);
    }

    return response.json();
  }

  async updateModelVariables(modelId: string, variables: Record<string, number>): Promise<any> {
    const response = await fetch(`${this.baseURL}/api/v1/models/${modelId}/variables`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
    });

    if (!response.ok) {
      throw new Error(`Failed to update model variables: ${response.statusText}`);
    }

    return response.json();
  }

  async getAvailableModels(): Promise<any> {
    const response = await fetch(`${this.baseURL}/api/v1/models`);
    
    if (!response.ok) {
      throw new Error(`Failed to get models: ${response.statusText}`);
    }

    return response.json();
  }

  async getCalculations(): Promise<any> {
    const response = await fetch(`${this.baseURL}/api/v1/calculations`);
    
    if (!response.ok) {
      throw new Error(`Failed to get calculations: ${response.statusText}`);
    }

    return response.json();
  }

  async getCalculation(calculationId: string): Promise<any> {
    const response = await fetch(`${this.baseURL}/api/v1/calculations/${calculationId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get calculation: ${response.statusText}`);
    }

    return response.json();
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${this.baseURL}/health`);
    
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }

    return response.json();
  }
}

export const financialAPI = new FinancialAPI();

// Hook for using the API with React Query
export const useFinancialCalculation = () => {
  return {
    calculateModel: financialAPI.calculateModel.bind(financialAPI),
    getModelVariables: financialAPI.getModelVariables.bind(financialAPI),
    updateModelVariables: financialAPI.updateModelVariables.bind(financialAPI),
    getAvailableModels: financialAPI.getAvailableModels.bind(financialAPI),
    getCalculations: financialAPI.getCalculations.bind(financialAPI),
    getCalculation: financialAPI.getCalculation.bind(financialAPI),
    healthCheck: financialAPI.healthCheck.bind(financialAPI),
  };
};