export const threeStatementMockData = {
  overview: {
    totalRevenue: 1749006,
    netIncome: 210000,
    ebitda: 420000,
    freeCashFlow: 420000,
    yoyGrowth: {
      revenue: 15.2,
      netIncome: 8.1,
      ebitda: 12.5,
      freeCashFlow: 16.7
    }
  },
  
  revenue: [
    { year: 'Y1', value: 1000000, grossMargin: 70, operatingMargin: 18, netMargin: 12 },
    { year: 'Y2', value: 1150000, grossMargin: 72, operatingMargin: 16, netMargin: 11 },
    { year: 'Y3', value: 1322500, grossMargin: 71, operatingMargin: 17, netMargin: 13 },
    { year: 'Y4', value: 1520875, grossMargin: 73, operatingMargin: 15, netMargin: 12 },
    { year: 'Y5', value: 1749006, grossMargin: 70, operatingMargin: 15, netMargin: 12 },
  ],

  expenses: [
    { name: 'Cost of Goods Sold', value: 30, color: 'hsl(var(--chart-1))' },
    { name: 'Sales & Marketing', value: 40, color: 'hsl(var(--chart-2))' },
    { name: 'Research & Development', value: 20, color: 'hsl(var(--chart-3))' },
    { name: 'General & Administrative', value: 10, color: 'hsl(var(--chart-4))' },
  ],

  balanceSheet: [
    { year: 'Y1', assets: 750000, liabilities: 250000, equity: 500000, currentAssets: 300000, fixedAssets: 450000 },
    { year: 'Y2', assets: 1100000, liabilities: 350000, equity: 750000, currentAssets: 440000, fixedAssets: 660000 },
    { year: 'Y3', assets: 1500000, liabilities: 450000, equity: 1050000, currentAssets: 600000, fixedAssets: 900000 },
    { year: 'Y4', assets: 1950000, liabilities: 550000, equity: 1400000, currentAssets: 780000, fixedAssets: 1170000 },
    { year: 'Y5', assets: 2450000, liabilities: 650000, equity: 1800000, currentAssets: 980000, fixedAssets: 1470000 },
  ],

  workingCapital: [
    { metric: 'Days Sales Outstanding (DSO)', current: 30, benchmark: 25, trend: 'up' },
    { metric: 'Days Payable Outstanding (DPO)', current: 30, benchmark: 35, trend: 'down' },
    { metric: 'Inventory Days', current: 60, benchmark: 45, trend: 'up' },
  ],

  cashFlow: [
    { year: 'Y1', operating: 200000, investing: -100000, financing: 50000, netCash: 150000, balance: 150000 },
    { year: 'Y2', operating: 250000, investing: -120000, financing: -30000, netCash: 100000, balance: 250000 },
    { year: 'Y3', operating: 300000, investing: -150000, financing: 0, netCash: 150000, balance: 400000 },
    { year: 'Y4', operating: 360000, investing: -180000, financing: -50000, netCash: 130000, balance: 530000 },
    { year: 'Y5', operating: 420000, investing: -200000, financing: -80000, netCash: 140000, balance: 670000 },
  ],

  ratios: {
    profitability: [
      { metric: 'Gross Margin', value: 70, benchmark: 65, category: 'Profitability' },
      { metric: 'Operating Margin', value: 15, benchmark: 18, category: 'Profitability' },
      { metric: 'Net Margin', value: 12, benchmark: 15, category: 'Profitability' },
      { metric: 'Return on Assets (ROA)', value: 8.6, benchmark: 10, category: 'Profitability' },
      { metric: 'Return on Equity (ROE)', value: 11.7, benchmark: 15, category: 'Profitability' },
    ],
    liquidity: [
      { metric: 'Current Ratio', value: 2.1, benchmark: 2.0, category: 'Liquidity' },
      { metric: 'Quick Ratio', value: 1.8, benchmark: 1.5, category: 'Liquidity' },
      { metric: 'Cash Ratio', value: 0.9, benchmark: 0.5, category: 'Liquidity' },
    ],
    leverage: [
      { metric: 'Debt to Equity', value: 0.3, benchmark: 0.4, category: 'Leverage' },
      { metric: 'Interest Coverage', value: 12.5, benchmark: 8.0, category: 'Leverage' },
      { metric: 'Debt Service Coverage', value: 3.2, benchmark: 2.5, category: 'Leverage' },
    ],
    efficiency: [
      { metric: 'Asset Turnover', value: 0.71, benchmark: 0.8, category: 'Efficiency' },
      { metric: 'Inventory Turnover', value: 6.1, benchmark: 8.0, category: 'Efficiency' },
      { metric: 'Receivables Turnover', value: 12.2, benchmark: 15.0, category: 'Efficiency' },
    ]
  },

  forecastVsActual: [
    { year: 'Y1', forecast: 1000000, actual: 980000, variance: -2.0, forecastProfit: 120000, actualProfit: 118000 },
    { year: 'Y2', forecast: 1150000, actual: 1200000, variance: 4.3, forecastProfit: 138000, actualProfit: 145000 },
    { year: 'Y3', forecast: 1322500, actual: 1300000, variance: -1.7, forecastProfit: 159000, actualProfit: 156000 },
    { year: 'Y4', forecast: 1520875, actual: 1510000, variance: -0.7, forecastProfit: 182500, actualProfit: 181200 },
  ],

  customKPIs: {
    unitEconomics: [
      { metric: 'Revenue per Employee', value: 87500, unit: '$', employees: 20 },
      { metric: 'Customer Acquisition Cost', value: 125, unit: '$', description: 'Per customer' },
      { metric: 'Customer Lifetime Value', value: 2400, unit: '$', description: 'Average LTV' },
      { metric: 'LTV/CAC Ratio', value: 19.2, unit: 'x', description: 'Efficiency metric' },
    ],
    operational: [
      { metric: 'Market Share', value: 12.5, unit: '%', trend: 'up' },
      { metric: 'Customer Retention Rate', value: 89, unit: '%', trend: 'stable' },
      { metric: 'Average Order Value', value: 350, unit: '$', trend: 'up' },
    ]
  },

  slicers: {
    dates: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Full Year 2024'],
    regions: ['North America', 'Europe', 'Asia Pacific', 'Latin America'],
    productLines: ['Product A', 'Product B', 'Product C', 'Services']
  }
};