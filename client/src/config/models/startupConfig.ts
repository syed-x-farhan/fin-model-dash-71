import { Rocket, DollarSign, TrendingUp, Users, Target } from 'lucide-react';
import { ModelInfo, VariableSection } from './threeStatementConfig';

/**
 * Startup Model Configuration
 */
export const startupModelInfo: ModelInfo = {
  id: 'startup',
  name: 'Startup Model',
  description: 'Growth-focused financial projections for early-stage companies',
  type: 'startup',
  complexity: 'Beginner',
  timeEstimate: '10-20 min',
  color: 'from-orange-500 to-red-500',
  icon: Rocket
};

/**
 * Startup Model Variables
 */
export const startupVariables: VariableSection[] = [
  {
    id: 'growth_metrics',
    name: 'Growth Metrics',
    description: 'Key growth drivers and user acquisition metrics',
    icon: TrendingUp,
    variables: [
      {
        id: 'monthly_users',
        name: 'Monthly Active Users',
        description: 'Starting number of monthly active users',
        value: 10000,
        unit: 'users',
        input_type: 'fixed',
        category: 'growth',
        applies_to: 'income_statement'
      },
      {
        id: 'user_growth_rate',
        name: 'User Growth Rate',
        description: 'Monthly user growth percentage',
        value: 15,
        unit: '%',
        input_type: 'percentage',
        category: 'growth',
        applies_to: 'income_statement'
      }
    ]
  },
  {
    id: 'monetization',
    name: 'Monetization',
    description: 'Revenue model and pricing assumptions',
    icon: DollarSign,
    variables: [
      {
        id: 'arpu',
        name: 'ARPU',
        description: 'Average revenue per user per month',
        value: 25,
        unit: '$',
        input_type: 'fixed',
        category: 'revenue',
        applies_to: 'income_statement'
      },
      {
        id: 'conversion_rate',
        name: 'Conversion Rate',
        description: 'Percentage of users who become paying customers',
        value: 2.5,
        unit: '%',
        input_type: 'percentage',
        category: 'revenue',
        applies_to: 'income_statement'
      }
    ]
  },
  {
    id: 'burn_rate',
    name: 'Burn Rate',
    description: 'Operating expenses and burn rate assumptions',
    icon: Target,
    variables: [
      {
        id: 'monthly_burn',
        name: 'Monthly Burn Rate',
        description: 'Monthly operating expenses',
        value: 50000,
        unit: '$',
        input_type: 'fixed',
        category: 'expense',
        applies_to: 'cash_flow'
      },
      {
        id: 'cac',
        name: 'Customer Acquisition Cost',
        description: 'Cost to acquire one customer',
        value: 100,
        unit: '$',
        input_type: 'fixed',
        category: 'expense',
        applies_to: 'income_statement'
      }
    ]
  }
];