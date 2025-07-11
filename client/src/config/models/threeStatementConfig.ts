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
    id: 'income_statement',
    name: 'Income Statement Inputs',
    description: 'Core income statement line items (usually entered per year or period)',
    icon: DollarSign,
    variables: [
      {
        id: 'revenue',
        name: 'Revenue',
        description: 'Total revenue for the period',
        value: 10000000,
        unit: '$',
        input_type: 'fixed',
        category: 'revenue',
        applies_to: 'income_statement'
      },
      {
        id: 'cogs',
        name: 'Cost of Goods Sold (COGS)',
        description: 'Direct costs of producing goods sold',
        value: 4000000,
        unit: '$',
        input_type: 'fixed',
        category: 'expense',
        applies_to: 'income_statement'
      },
      {
        id: 'operating_expenses',
        name: 'Operating Expenses',
        description: 'General operating expenses (SG&A)',
        value: 3000000,
        unit: '$',
        input_type: 'fixed',
        category: 'expense',
        applies_to: 'income_statement'
      },
      {
        id: 'depreciation_amortization',
        name: 'Depreciation & Amortization',
        description: 'Non-cash depreciation and amortization expense',
        value: 500000,
        unit: '$',
        input_type: 'fixed',
        category: 'depreciation',
        applies_to: 'income_statement'
      },
      {
        id: 'interest_expense',
        name: 'Interest Expense',
        description: 'Interest payments on debt',
        value: 200000,
        unit: '$',
        input_type: 'fixed',
        category: 'interest',
        applies_to: 'income_statement'
      },
      {
        id: 'taxes',
        name: 'Taxes',
        description: 'Income tax expense',
        value: 575000,
        unit: '$',
        input_type: 'fixed',
        category: 'tax',
        applies_to: 'income_statement'
      },
      {
        id: 'other_income',
        name: 'Other Income',
        description: 'Other non-operating income (optional)',
        value: 0,
        unit: '$',
        input_type: 'fixed',
        category: 'revenue',
        applies_to: 'income_statement'
      }
    ]
  },
  {
    id: 'balance_sheet',
    name: 'Balance Sheet Inputs',
    description: 'Key balance sheet line items',
    icon: Building2,
    variables: [
      {
        id: 'cash',
        name: 'Cash',
        description: 'Cash and cash equivalents',
        value: 1500000,
        unit: '$',
        input_type: 'fixed',
        category: 'assets',
        applies_to: 'balance_sheet'
      },
      {
        id: 'accounts_receivable',
        name: 'Accounts Receivable',
        description: 'Money owed by customers',
        value: 800000,
        unit: '$',
        input_type: 'fixed',
        category: 'assets',
        applies_to: 'balance_sheet'
      },
      {
        id: 'inventory',
        name: 'Inventory',
        description: 'Inventory on hand',
        value: 600000,
        unit: '$',
        input_type: 'fixed',
        category: 'assets',
        applies_to: 'balance_sheet'
      },
      {
        id: 'other_current_assets',
        name: 'Other Current Assets',
        description: 'Other current assets (optional)',
        value: 200000,
        unit: '$',
        input_type: 'fixed',
        category: 'assets',
        applies_to: 'balance_sheet'
      },
      {
        id: 'ppe',
        name: 'PP&E (Fixed Assets)',
        description: 'Property, plant & equipment',
        value: 5000000,
        unit: '$',
        input_type: 'fixed',
        category: 'assets',
        applies_to: 'balance_sheet'
      },
      {
        id: 'accounts_payable',
        name: 'Accounts Payable',
        description: 'Money owed to suppliers',
        value: 400000,
        unit: '$',
        input_type: 'fixed',
        category: 'liabilities',
        applies_to: 'balance_sheet'
      },
      {
        id: 'accrued_expenses',
        name: 'Accrued Expenses',
        description: 'Accrued expenses and liabilities',
        value: 300000,
        unit: '$',
        input_type: 'fixed',
        category: 'liabilities',
        applies_to: 'balance_sheet'
      },
      {
        id: 'short_term_debt',
        name: 'Short-Term Debt',
        description: 'Debt due within one year',
        value: 500000,
        unit: '$',
        input_type: 'fixed',
        category: 'liabilities',
        applies_to: 'balance_sheet'
      },
      {
        id: 'long_term_debt',
        name: 'Long-Term Debt',
        description: 'Debt due after one year',
        value: 2000000,
        unit: '$',
        input_type: 'fixed',
        category: 'liabilities',
        applies_to: 'balance_sheet'
      },
      {
        id: 'retained_earnings',
        name: 'Retained Earnings',
        description: 'Accumulated retained earnings',
        value: 1200000,
        unit: '$',
        input_type: 'fixed',
        category: 'equity',
        applies_to: 'balance_sheet'
      },
      {
        id: 'share_capital',
        name: 'Share Capital / Equity',
        description: 'Paid-in capital and equity',
        value: 2700000,
        unit: '$',
        input_type: 'fixed',
        category: 'equity',
        applies_to: 'balance_sheet'
      }
    ]
  },
  {
    id: 'cash_flow',
    name: 'Cash Flow Inputs',
    description: 'Cash flow items (optional - can be calculated from IS and BS)',
    icon: Activity,
    variables: [
      {
        id: 'capex',
        name: 'CapEx',
        description: 'Capital expenditures',
        value: 800000,
        unit: '$',
        input_type: 'fixed',
        category: 'capex',
        applies_to: 'cash_flow'
      },
      {
        id: 'dividends_paid',
        name: 'Dividends Paid',
        description: 'Dividends paid to shareholders',
        value: 100000,
        unit: '$',
        input_type: 'fixed',
        category: 'financing',
        applies_to: 'cash_flow'
      },
      {
        id: 'new_debt_raised',
        name: 'New Debt Raised / Repaid',
        description: 'Net new debt raised or repaid',
        value: 0,
        unit: '$',
        input_type: 'fixed',
        category: 'financing',
        applies_to: 'cash_flow'
      },
      {
        id: 'new_equity_raised',
        name: 'New Equity Raised',
        description: 'New equity capital raised',
        value: 0,
        unit: '$',
        input_type: 'fixed',
        category: 'financing',
        applies_to: 'cash_flow'
      }
    ]
  },
  {
    id: 'forecasting_assumptions',
    name: 'Forecasting Assumptions',
    description: 'Key assumptions for financial projections',
    icon: Target,
    variables: [
      {
        id: 'revenue_growth_rate',
        name: 'Revenue Growth Rate',
        description: 'Annual revenue growth percentage',
        value: 10,
        unit: '%',
        input_type: 'percentage',
        category: 'growth',
        applies_to: 'income_statement'
      },
      {
        id: 'gross_margin_percent',
        name: 'Gross Margin %',
        description: 'Gross profit margin percentage',
        value: 60,
        unit: '%',
        input_type: 'percentage',
        category: 'margins',
        applies_to: 'income_statement'
      },
      {
        id: 'opex_percent_revenue',
        name: 'OpEx as % of Revenue',
        description: 'Operating expenses as percentage of revenue',
        value: 30,
        unit: '%',
        input_type: 'percentage',
        category: 'margins',
        applies_to: 'income_statement'
      },
      {
        id: 'capex_percent_revenue',
        name: 'CapEx (% of revenue)',
        description: 'Capital expenditure as percentage of revenue',
        value: 8,
        unit: '%',
        input_type: 'percentage',
        category: 'capex',
        applies_to: 'cash_flow'
      },
      {
        id: 'depreciation_percent',
        name: 'Depreciation Method / %',
        description: 'Depreciation as percentage of PP&E',
        value: 10,
        unit: '%',
        input_type: 'percentage',
        category: 'depreciation',
        applies_to: 'income_statement'
      },
      {
        id: 'dso_days',
        name: 'DSO (Days Sales Outstanding)',
        description: 'Days sales outstanding for receivables',
        value: 30,
        unit: 'days',
        input_type: 'fixed',
        category: 'working_capital',
        applies_to: 'balance_sheet'
      },
      {
        id: 'dpo_days',
        name: 'DPO (Days Payable Outstanding)',
        description: 'Days payable outstanding',
        value: 45,
        unit: 'days',
        input_type: 'fixed',
        category: 'working_capital',
        applies_to: 'balance_sheet'
      },
      {
        id: 'inventory_days',
        name: 'Inventory Days',
        description: 'Days inventory outstanding',
        value: 60,
        unit: 'days',
        input_type: 'fixed',
        category: 'working_capital',
        applies_to: 'balance_sheet'
      },
      {
        id: 'interest_rate_debt',
        name: 'Interest Rate on Debt',
        description: 'Weighted average interest rate on debt',
        value: 6.5,
        unit: '%',
        input_type: 'percentage',
        category: 'interest',
        applies_to: 'income_statement'
      },
      {
        id: 'tax_rate',
        name: 'Tax Rate',
        description: 'Corporate tax rate percentage',
        value: 25,
        unit: '%',
        input_type: 'percentage',
        category: 'tax',
        applies_to: 'income_statement'
      },
      {
        id: 'dividend_payout_percent',
        name: 'Dividend Payout %',
        description: 'Dividend payout as percentage of net income',
        value: 20,
        unit: '%',
        input_type: 'percentage',
        category: 'financing',
        applies_to: 'cash_flow'
      }
    ]
  }
];