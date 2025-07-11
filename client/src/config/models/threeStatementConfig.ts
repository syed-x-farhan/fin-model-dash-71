import { DollarSign, TrendingUp, Building2, BarChart3, Calculator, Activity, FileText, CreditCard, Banknote, Target } from 'lucide-react';

/**
 * Variable Interface for Financial Models
 */
export interface Variable {
  id: string;
  name: string;
  description: string;
  value: number;
  unit: string;
  input_type: 'percentage' | 'fixed' | 'formula';
  category: string;
  applies_to: 'income_statement' | 'balance_sheet' | 'cash_flow';
  relative_to?: string;
}

/**
 * Variable Section Interface
 */
export interface VariableSection {
  id: string;
  name: string;
  description: string;
  icon: any;
  variables: Variable[];
}

/**
 * Model Info Interface
 */
export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  type: 'three-statement' | 'dcf' | 'lbo' | 'startup';
  complexity: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  timeEstimate: string;
  color: string;
  icon: any;
}

/**
 * Three Statement Model Configuration
 */
export const threeStatementModelInfo: ModelInfo = {
  id: '3-statement',
  name: '3-Statement Model',
  description: 'Integrated Income Statement, Balance Sheet, and Cash Flow Statement projections',
  type: 'three-statement',
  complexity: 'Intermediate',
  timeEstimate: '15-30 min',
  color: 'from-blue-500 to-cyan-500',
  icon: BarChart3
};

/**
 * Three Statement Model Variables
 */
export const threeStatementVariables: VariableSection[] = [
  {
    id: 'revenue',
    name: 'Revenue Assumptions',
    description: 'Core revenue drivers and growth assumptions',
    icon: DollarSign,
    variables: [
      {
        id: 'base_revenue',
        name: 'Base Revenue',
        description: 'Starting revenue for projections',
        value: 10000000,
        unit: '$',
        input_type: 'fixed',
        category: 'revenue',
        applies_to: 'income_statement'
      },
      {
        id: 'revenue_growth',
        name: 'Revenue Growth Rate',
        description: 'Annual revenue growth percentage',
        value: 10,
        unit: '%',
        input_type: 'percentage',
        category: 'revenue',
        applies_to: 'income_statement'
      }
    ]
  },
  {
    id: 'expenses',
    name: 'Expense Assumptions',
    description: 'Operating expense assumptions',
    icon: CreditCard,
    variables: [
      {
        id: 'gross_margin',
        name: 'Gross Margin %',
        description: 'Gross profit margin percentage',
        value: 60,
        unit: '%',
        input_type: 'percentage',
        category: 'expense',
        applies_to: 'income_statement',
        relative_to: 'revenue'
      },
      {
        id: 'opex_margin',
        name: 'Operating Expense %',
        description: 'Operating expenses as percentage of revenue',
        value: 35,
        unit: '%',
        input_type: 'percentage',
        category: 'expense',
        applies_to: 'income_statement',
        relative_to: 'revenue'
      }
    ]
  },
  {
    id: 'tax_assumptions',
    name: 'Tax Assumptions',
    description: 'Tax rate and related assumptions',
    icon: FileText,
    variables: [
      {
        id: 'tax_rate',
        name: 'Tax Rate',
        description: 'Corporate tax rate percentage',
        value: 25,
        unit: '%',
        input_type: 'percentage',
        category: 'tax',
        applies_to: 'income_statement'
      }
    ]
  },
  {
    id: 'balance_sheet',
    name: 'Balance Sheet Assumptions',
    description: 'Working capital and balance sheet drivers',
    icon: Building2,
    variables: [
      {
        id: 'cash_ratio',
        name: 'Cash % of Revenue',
        description: 'Cash balance as percentage of revenue',
        value: 15,
        unit: '%',
        input_type: 'percentage',
        category: 'working_capital',
        applies_to: 'balance_sheet',
        relative_to: 'revenue'
      },
      {
        id: 'current_assets_ratio',
        name: 'Current Assets % of Revenue',
        description: 'Current assets as percentage of revenue',
        value: 25,
        unit: '%',
        input_type: 'percentage',
        category: 'working_capital',
        applies_to: 'balance_sheet',
        relative_to: 'revenue'
      }
    ]
  },
  {
    id: 'capex_depreciation',
    name: 'CapEx & Depreciation',
    description: 'Capital expenditure and depreciation assumptions',
    icon: Calculator,
    variables: [
      {
        id: 'capex_ratio',
        name: 'CapEx % of Revenue',
        description: 'Capital expenditure as percentage of revenue',
        value: 8,
        unit: '%',
        input_type: 'percentage',
        category: 'capex',
        applies_to: 'cash_flow',
        relative_to: 'revenue'
      },
      {
        id: 'depreciation_ratio',
        name: 'Depreciation % of Revenue',
        description: 'Depreciation as percentage of revenue',
        value: 5,
        unit: '%',
        input_type: 'percentage',
        category: 'depreciation',
        applies_to: 'income_statement',
        relative_to: 'revenue'
      }
    ]
  }
];