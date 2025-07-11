

import { TrendingUp, DollarSign, Calculator } from 'lucide-react';
import { VariableSection } from './threeStatementConfig';

/**
 * LBO (Leveraged Buyout) Model Variable Configuration
 * Backend Integration: Maps to FastAPI endpoints for LBO analysis calculations
 */
export const lboVariables: VariableSection[] = [
  {
    id: 'target-financials',
    title: 'Target Company Financials',
    icon: TrendingUp,
    variables: [
      // Revenue - Historical performance for projections
      { id: 'revenue-y1', name: 'Revenue Y1', value: 50000000, unit: '$', category: 'revenue', input_type: 'fixed', applies_to: 'income_statement' },
      { id: 'revenue-y2', name: 'Revenue Y2', value: 55000000, unit: '$', category: 'revenue', input_type: 'fixed', applies_to: 'income_statement' },
      { id: 'revenue-y3', name: 'Revenue Y3', value: 60000000, unit: '$', category: 'revenue', input_type: 'fixed', applies_to: 'income_statement' },
      
      // EBITDA - Key profitability metric for LBO valuation
      { id: 'ebitda-y1', name: 'EBITDA Y1', value: 12000000, unit: '$', category: 'profitability', input_type: 'fixed', applies_to: 'income_statement' },
      { id: 'ebitda-y2', name: 'EBITDA Y2', value: 13500000, unit: '$', category: 'profitability', input_type: 'fixed', applies_to: 'income_statement' },
      { id: 'ebitda-y3', name: 'EBITDA Y3', value: 15000000, unit: '$', category: 'profitability', input_type: 'fixed', applies_to: 'income_statement' },
      
      // Net Income - Bottom line profitability
      { id: 'net-income-y1', name: 'Net Income Y1', value: 8000000, unit: '$', category: 'profitability', input_type: 'fixed', applies_to: 'income_statement' },
      { id: 'net-income-y2', name: 'Net Income Y2', value: 9000000, unit: '$', category: 'profitability', input_type: 'fixed', applies_to: 'income_statement' },
      { id: 'net-income-y3', name: 'Net Income Y3', value: 10000000, unit: '$', category: 'profitability', input_type: 'fixed', applies_to: 'income_statement' },
      
      // CapEx and D&A - Cash flow components
      { id: 'capex-y1', name: 'CapEx Y1', value: 2000000, unit: '$', category: 'investing', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'capex-y2', name: 'CapEx Y2', value: 2200000, unit: '$', category: 'investing', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'capex-y3', name: 'CapEx Y3', value: 2400000, unit: '$', category: 'investing', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'da-y1', name: 'Depreciation & Amortization Y1', value: 1500000, unit: '$', category: 'non-cash', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'da-y2', name: 'Depreciation & Amortization Y2', value: 1600000, unit: '$', category: 'non-cash', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'da-y3', name: 'Depreciation & Amortization Y3', value: 1700000, unit: '$', category: 'non-cash', input_type: 'fixed', applies_to: 'cash_flow' },
      
      // Working Capital and Balance Sheet - Financial position
      { id: 'wc-change-y1', name: 'Working Capital Change Y1', value: 500000, unit: '$', category: 'working-capital', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'wc-change-y2', name: 'Working Capital Change Y2', value: 550000, unit: '$', category: 'working-capital', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'wc-change-y3', name: 'Working Capital Change Y3', value: 600000, unit: '$', category: 'working-capital', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'cash-balance', name: 'Cash Balance', value: 5000000, unit: '$', category: 'balance-sheet', input_type: 'fixed', applies_to: 'balance_sheet' },
      { id: 'debt-balance', name: 'Debt Balance', value: 20000000, unit: '$', category: 'balance-sheet', input_type: 'fixed', applies_to: 'balance_sheet' },
      { id: 'shares-outstanding', name: 'Shares Outstanding', value: 10000000, unit: 'shares', category: 'balance-sheet', input_type: 'fixed', applies_to: 'balance_sheet' },
    ]
  },
  {
    id: 'transaction-details',
    title: 'Transaction Details',
    icon: DollarSign,
    variables: [
      // Purchase Price and Structure - Deal economics
      { id: 'purchase-price', name: 'Purchase Price (Enterprise Value)', value: 120000000, unit: '$', category: 'transaction', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'equity-contribution', name: 'Equity Contribution (%)', value: 40, unit: '%', category: 'transaction', input_type: 'percentage', applies_to: 'balance_sheet', relative_to: 'purchase_price' },
      { id: 'total-debt', name: 'Total Debt Amount', value: 72000000, unit: '$', category: 'debt', input_type: 'fixed', applies_to: 'balance_sheet' },
      
      // Debt Terms - Financing structure
      { id: 'term-loan-rate', name: 'Term Loan Interest Rate', value: 6.5, unit: '%', category: 'debt', input_type: 'percentage', applies_to: 'income_statement' },
      { id: 'mezzanine-rate', name: 'Mezzanine Interest Rate', value: 12, unit: '%', category: 'debt', input_type: 'percentage', applies_to: 'income_statement' },
      
      // Transaction Costs - Deal expenses
      { id: 'financing-fees', name: 'Financing Fees (%)', value: 2, unit: '%', category: 'fees', input_type: 'percentage', applies_to: 'cash_flow', relative_to: 'total_debt' },
      { id: 'transaction-fees', name: 'Transaction Fees (%)', value: 1.5, unit: '%', category: 'fees', input_type: 'percentage', applies_to: 'cash_flow', relative_to: 'purchase_price' },
      
      // Exit Strategy - Return calculation parameters
      { id: 'exit-year', name: 'Exit Year (Holding Period)', value: 5, unit: 'years', category: 'exit', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'exit-multiple', name: 'Exit Multiple (EV/EBITDA)', value: 8, unit: 'x', category: 'exit', input_type: 'fixed', applies_to: 'cash_flow' },
      { id: 'amortization-type', name: 'Amortization Type (1=Scheduled, 2=Bullet)', value: 1, unit: '', category: 'debt', input_type: 'fixed', applies_to: 'balance_sheet' },
    ]
  },
  {
    id: 'operating-assumptions',
    title: 'Operating Assumptions',
    icon: Calculator,
    variables: [
      // Growth Rates - Revenue projection drivers
      { id: 'growth-y1', name: 'Revenue Growth Rate Y1', value: 8, unit: '%', category: 'growth', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'revenue' },
      { id: 'growth-y2', name: 'Revenue Growth Rate Y2', value: 7, unit: '%', category: 'growth', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'revenue' },
      { id: 'growth-y3', name: 'Revenue Growth Rate Y3', value: 6, unit: '%', category: 'growth', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'revenue' },
      { id: 'growth-y4', name: 'Revenue Growth Rate Y4', value: 5, unit: '%', category: 'growth', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'revenue' },
      { id: 'growth-y5', name: 'Revenue Growth Rate Y5', value: 4, unit: '%', category: 'growth', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'revenue' },
      
      // Operating Metrics - Profitability and efficiency assumptions
      { id: 'ebitda-margin', name: 'EBITDA Margin (%)', value: 25, unit: '%', category: 'margins', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'revenue' },
      { id: 'capex-pct', name: 'CapEx as % of Revenue', value: 4, unit: '%', category: 'investing', input_type: 'percentage', applies_to: 'cash_flow', relative_to: 'revenue' },
      { id: 'wc-pct', name: 'Working Capital as % of Revenue', value: 1, unit: '%', category: 'working-capital', input_type: 'percentage', applies_to: 'cash_flow', relative_to: 'revenue' },
      { id: 'tax-rate', name: 'Tax Rate (%)', value: 25, unit: '%', category: 'taxes', input_type: 'percentage', applies_to: 'income_statement', relative_to: 'pre_tax_income' },
    ]
  }
];

export const lboModelInfo = {
  id: 'lbo',
  name: 'LBO Analysis Model',
  description: 'Leveraged Buyout model with debt structuring and returns analysis',
  complexity: 'Expert',
  timeEstimate: '30-60 min'
};

