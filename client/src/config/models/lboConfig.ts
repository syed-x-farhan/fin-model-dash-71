import { Building2, DollarSign, Calculator, TrendingUp, CreditCard } from 'lucide-react';
import { ModelInfo, VariableSection } from './threeStatementConfig';

/**
 * LBO Model Configuration
 */
export const lboModelInfo: ModelInfo = {
  id: 'lbo',
  name: 'LBO Analysis',
  description: 'Leveraged Buyout model with debt structuring and returns analysis',
  type: 'lbo',
  complexity: 'Expert',
  timeEstimate: '30-60 min',
  color: 'from-purple-500 to-violet-500',
  icon: Building2
};

/**
 * LBO Model Variables
 */
export const lboVariables: VariableSection[] = [
  {
    id: 'transaction',
    name: 'Transaction Structure',
    description: 'Purchase price and financing structure',
    icon: DollarSign,
    variables: [
      {
        id: 'purchase_price',
        name: 'Purchase Price',
        description: 'Total acquisition price',
        value: 100000000,
        unit: '$',
        input_type: 'fixed',
        category: 'transaction',
        applies_to: 'balance_sheet'
      },
      {
        id: 'debt_ratio',
        name: 'Debt to Equity Ratio',
        description: 'Leverage ratio for the transaction',
        value: 70,
        unit: '%',
        input_type: 'percentage',
        category: 'transaction',
        applies_to: 'balance_sheet'
      }
    ]
  },
  {
    id: 'debt_structure',
    name: 'Debt Structure',
    description: 'Debt financing terms and structure',
    icon: CreditCard,
    variables: [
      {
        id: 'interest_rate',
        name: 'Interest Rate',
        description: 'Weighted average interest rate on debt',
        value: 6.5,
        unit: '%',
        input_type: 'percentage',
        category: 'debt',
        applies_to: 'income_statement'
      },
      {
        id: 'debt_term',
        name: 'Debt Term',
        description: 'Average debt maturity in years',
        value: 7,
        unit: 'years',
        input_type: 'fixed',
        category: 'debt',
        applies_to: 'balance_sheet'
      }
    ]
  }
];