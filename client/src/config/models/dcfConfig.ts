import { TrendingUp, DollarSign, Calculator, Target, BarChart3 } from 'lucide-react';
import { ModelInfo, VariableSection } from './threeStatementConfig';

/**
 * DCF Model Configuration
 */
export const dcfModelInfo: ModelInfo = {
  id: 'dcf',
  name: 'DCF Valuation',
  description: 'Discounted Cash Flow model with NPV and Terminal Value calculations',
  type: 'dcf',
  complexity: 'Advanced',
  timeEstimate: '20-40 min',
  color: 'from-green-500 to-emerald-500',
  icon: TrendingUp
};

/**
 * DCF Model Variables
 */
export const dcfVariables: VariableSection[] = [
  {
    id: 'cash_flow',
    name: 'Cash Flow Projections',
    description: 'Free cash flow assumptions and projections',
    icon: DollarSign,
    variables: [
      {
        id: 'base_fcf',
        name: 'Base Free Cash Flow',
        description: 'Starting free cash flow for projections',
        value: 5000000,
        unit: '$',
        input_type: 'fixed',
        category: 'revenue',
        applies_to: 'cash_flow'
      },
      {
        id: 'fcf_growth',
        name: 'FCF Growth Rate',
        description: 'Annual free cash flow growth percentage',
        value: 8,
        unit: '%',
        input_type: 'percentage',
        category: 'revenue',
        applies_to: 'cash_flow'
      }
    ]
  },
  {
    id: 'discount_rate',
    name: 'Discount Rate',
    description: 'WACC and discount rate assumptions',
    icon: Calculator,
    variables: [
      {
        id: 'wacc',
        name: 'WACC',
        description: 'Weighted average cost of capital',
        value: 10,
        unit: '%',
        input_type: 'percentage',
        category: 'discount',
        applies_to: 'cash_flow'
      },
      {
        id: 'terminal_growth',
        name: 'Terminal Growth Rate',
        description: 'Long-term growth rate for terminal value',
        value: 2.5,
        unit: '%',
        input_type: 'percentage',
        category: 'discount',
        applies_to: 'cash_flow'
      }
    ]
  }
];