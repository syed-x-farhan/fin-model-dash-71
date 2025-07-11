

import { TrendingUp, Calculator, DollarSign, Activity } from 'lucide-react';
import { VariableSection } from './threeStatementConfig';

/**
 * DCF (Discounted Cash Flow) Model Variable Configuration
 * Backend Integration: Maps to FastAPI endpoints for DCF valuation calculations
 */
export const dcfVariables: VariableSection[] = [
  {
    id: 'historical-financials',
    title: 'Historical Financials (3-5 Years)',
    icon: TrendingUp,
    variables: [
      // Revenue Data - Historical data for income statement projections
      { id: 'revenue-y1', name: 'Revenue Y1', value: 10000000, unit: '$', category: 'revenue', input_type: 'fixed', applies_to: 'income_statement' },
      { id: 'revenue-y2', name: 'Revenue Y2', value: 12000000, unit: '$', category: 'revenue', input_type: 'fixed', applies_to: 'income_statement' },
      { id: 'revenue-y3', name: 'Revenue Y3', value: 14500000, unit: '$', category: 'revenue', input_type: 'fixed', applies_to: 'income_statement' },
      
      // EBIT Data - Operating profit for valuation calculations
      { id: 'ebit-y1', name: 'EBIT Y1', value: 2000000, unit: '$', category: 'profitability', input_type: 'fixed', applies_to: 'income_statement' },
      { id: 'ebit-y2', name: 'EBIT Y2', value: 2500000, unit: '$', category: 'profitability', input_type: 'fixed', applies_to: 'income_statement' },
      { id: 'ebit-y3', name: 'EBIT Y3', value: 3100000, unit: '$', category: 'profitability', input_type: 'fixed', applies_to: 'income_statement' },
      
      // Depreciation & Amortization - Non-cash expenses for cash flow adjustments
      { id: 'da-y1', name: 'Depreciation & Amortization Y1', value: 500000, unit: '$', category: 'non-cash', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'da-y2', name: 'Depreciation & Amortization Y2', value: 600000, unit: '$', category: 'non-cash', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'da-y3', name: 'Depreciation & Amortization Y3', value: 700000, unit: '$', category: 'non-cash', input_type: 'fixed', applies_to: 'cash_flow' },
      
      // Capital Expenditures - Investment outflows for free cash flow calculation
      { id: 'capex-y1', name: 'CapEx Y1', value: 800000, unit: '$', category: 'investing', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'capex-y2', name: 'CapEx Y2', value: 900000, unit: '$', category: 'investing', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'capex-y3', name: 'CapEx Y3', value: 1000000, unit: '$', category: 'investing', input_type: 'fixed', applies_to: 'cash_flow' },
      
      // Working Capital Changes - Cash flow impact from operations
      { id: 'wc-change-y1', name: 'Working Capital Change Y1', value: 200000, unit: '$', category: 'working-capital', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'wc-change-y2', name: 'Working Capital Change Y2', value: 250000, unit: '$', category: 'working-capital', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'wc-change-y3', name: 'Working Capital Change Y3', value: 300000, unit: '$', category: 'working-capital', input_type: 'fixed', applies_to: 'cash_flow' },
    ]
  },
  {
    id: 'projected-fcf',
    title: 'Projected Free Cash Flow Assumptions',
    icon: Calculator,
    variables: [
      // Revenue Growth Rates - Key driver for financial projections
      { id: 'growth-y1', name: 'Revenue Growth Rate Y1', value: 15, unit: '%', category: 'growth', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'revenue' },
      { id: 'growth-y2', name: 'Revenue Growth Rate Y2', value: 12, unit: '%', category: 'growth', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'revenue' },
      { id: 'growth-y3', name: 'Revenue Growth Rate Y3', value: 10, unit: '%', category: 'growth', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'revenue' },
      { id: 'growth-y4', name: 'Revenue Growth Rate Y4', value: 8, unit: '%', category: 'growth', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'revenue' },
      { id: 'growth-y5', name: 'Revenue Growth Rate Y5', value: 6, unit: '%', category: 'growth', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'revenue' },
      
      // Operating Assumptions - Profitability and cash flow drivers
      { id: 'operating-margin', name: 'Operating Margin (EBIT %)', value: 22, unit: '%', category: 'margins', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'revenue' },
      { id: 'da-pct-revenue', name: 'Depreciation & Amortization % of Revenue', value: 5, unit: '%', category: 'non-cash', input_type: 'percentage', applies_to: 'cash_flow', relative_to: 'revenue' },
      { id: 'capex-pct-revenue', name: 'CapEx % of Revenue', value: 7, unit: '%', category: 'investing', input_type: 'percentage', applies_to: 'cash_flow', relative_to: 'revenue' },
      { id: 'wc-pct-revenue', name: 'Working Capital % of Revenue Change', value: 2, unit: '%', category: 'working-capital', input_type: 'percentage', applies_to: 'cash_flow', relative_to: 'revenue' },
      { id: 'tax-rate', name: 'Tax Rate', value: 25, unit: '%', category: 'taxes', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'pre_tax_income' },
    ]
  },
  {
    id: 'terminal-value',
    title: 'Terminal Value Inputs',
    icon: DollarSign,
    variables: [
      // Terminal Value Methods - Long-term value calculation parameters
      { id: 'perpetual-growth', name: 'Perpetual Growth Rate (g)', value: 2.5, unit: '%', category: 'terminal', input_type: 'percentage', applies_to: 'cash_flow' },
      { id: 'terminal-multiple', name: 'Terminal EBITDA Multiple', value: 8, unit: 'x', category: 'terminal', input_type: 'fixed', applies_to: 'income_statement' },
      { id: 'terminal-method', name: 'Terminal Method (1=Gordon, 2=Multiple)', value: 1, unit: '', category: 'terminal', input_type: 'fixed', applies_to: 'cash_flow' },
    ]
  },
  {
    id: 'discount-rate',
    title: 'Discount Rate / WACC',
    icon: Activity,
    variables: [
      // WACC Components - Cost of capital calculation inputs
      { id: 'risk-free-rate', name: 'Risk-free Rate', value: 4, unit: '%', category: 'wacc', input_type: 'percentage', applies_to: 'cash_flow' },
      { id: 'market-risk-premium', name: 'Market Risk Premium', value: 6, unit: '%', category: 'wacc', input_type: 'percentage', applies_to: 'cash_flow' },
      { id: 'beta', name: 'Beta', value: 1.2, unit: '', category: 'wacc', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'cost-of-debt', name: 'Cost of Debt', value: 5, unit: '%', category: 'wacc', input_type: 'percentage', applies_to: 'income_statement' },
      { id: 'debt-equity-ratio', name: 'Debt/Equity Ratio', value: 0.3, unit: '', category: 'wacc', input_type: 'fixed', applies_to: 'balance_sheet' },
      { id: 'corporate-tax-rate', name: 'Corporate Tax Rate', value: 25, unit: '%', category: 'wacc', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'pre_tax_income' },
    ]
  }
];

export const dcfModelInfo = {
  id: 'dcf',
  name: 'DCF Valuation Model',
  description: 'Discounted Cash Flow model with NPV and Terminal Value calculations',
  complexity: 'Advanced',
  timeEstimate: '20-40 min'
};

