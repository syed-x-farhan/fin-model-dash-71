
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, Share2, TrendingUp, TrendingDown, DollarSign, Target, Activity, BarChart3, Filter } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from 'recharts';

interface KPIData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
}

const Dashboard = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const navigate = useNavigate();
  const [variables, setVariables] = useState<any[]>([]);
  const [calculatedData, setCalculatedData] = useState<any>(null);
  const [selectedScenario, setSelectedScenario] = useState('Base');
  const [selectedPeriod, setSelectedPeriod] = useState('2024');

  const modelNames: Record<string, string> = {
    '3-statement': '3-Statement Model',
    'dcf': 'DCF Valuation',
    'lbo': 'LBO Analysis',
    'startup': 'Startup Model'
  };

  useEffect(() => {
    const savedVariables = localStorage.getItem(`model_${modelId}_variables`);
    if (savedVariables) {
      const vars = JSON.parse(savedVariables);
      setVariables(vars);
      generateFinancialData(vars);
    }
  }, [modelId]);

  const generateFinancialData = (vars: any[]) => {
    const revenue = vars.find(v => v.name === 'Revenue')?.value || 10000000;
    const revenueGrowth = vars.find(v => v.name === 'Revenue Growth Rate')?.value || 10;
    const grossMargin = vars.find(v => v.name === 'Gross Margin %')?.value || 60;
    const taxRate = vars.find(v => v.name === 'Tax Rate')?.value || 25;

    // Generate 5-year projections
    const years = Array.from({ length: 5 }, (_, i) => 2024 + i);
    const projections = years.map((year, index) => {
      const yearRevenue = revenue * Math.pow(1 + revenueGrowth / 100, index);
      const cogs = yearRevenue * (1 - grossMargin / 100);
      const grossProfit = yearRevenue - cogs;
      const opex = yearRevenue * 0.35;
      const ebitda = grossProfit - opex;
      const depreciation = yearRevenue * 0.05;
      const ebit = ebitda - depreciation;
      const interestExpense = yearRevenue * 0.02;
      const ebt = ebit - interestExpense;
      const taxes = ebt * (taxRate / 100);
      const netIncome = ebt - taxes;
      const capex = yearRevenue * 0.08;
      const freeCashFlow = netIncome + depreciation - capex;
      
      return {
        year: year.toString(),
        revenue: Math.round(yearRevenue),
        cogs: Math.round(cogs),
        grossProfit: Math.round(grossProfit),
        opex: Math.round(opex),
        ebitda: Math.round(ebitda),
        depreciation: Math.round(depreciation),
        ebit: Math.round(ebit),
        interestExpense: Math.round(interestExpense),
        taxes: Math.round(taxes),
        netIncome: Math.round(netIncome),
        capex: Math.round(capex),
        freeCashFlow: Math.round(freeCashFlow),
        cash: Math.round(yearRevenue * 0.15),
        currentAssets: Math.round(yearRevenue * 0.25),
        ppe: Math.round(yearRevenue * 0.6),
        totalAssets: Math.round(yearRevenue * 0.85),
        currentLiabilities: Math.round(yearRevenue * 0.15),
        longTermDebt: Math.round(yearRevenue * 0.3),
        totalLiabilities: Math.round(yearRevenue * 0.45),
        equity: Math.round(yearRevenue * 0.4),
        cfo: Math.round(netIncome + depreciation),
        cfi: Math.round(-capex),
        cff: Math.round(yearRevenue * 0.02)
      };
    });

    // KPI Cards data
    const currentYear = projections[0];
    const kpis: KPIData[] = [
      {
        title: 'Total Revenue',
        value: `$${(currentYear.revenue / 1000000).toFixed(1)}M`,
        change: `+${revenueGrowth}%`,
        trend: 'up',
        icon: DollarSign
      },
      {
        title: 'Net Income',
        value: `$${(currentYear.netIncome / 1000000).toFixed(1)}M`,
        change: '+12.3%',
        trend: 'up',
        icon: TrendingUp
      },
      {
        title: 'EBITDA',
        value: `$${(currentYear.ebitda / 1000000).toFixed(1)}M`,
        change: '+8.7%',
        trend: 'up',
        icon: BarChart3
      },
      {
        title: 'Cash Balance',
        value: `$${(currentYear.cash / 1000000).toFixed(1)}M`,
        change: '+15.2%',
        trend: 'up',
        icon: Activity
      },
      {
        title: 'Free Cash Flow',
        value: `$${(currentYear.freeCashFlow / 1000000).toFixed(1)}M`,
        change: '+18.5%',
        trend: 'up',
        icon: Target
      }
    ];

    // Expense breakdown for pie chart
    const expenseBreakdown = [
      { name: 'COGS', value: currentYear.cogs, color: '#EF4444' },
      { name: 'OpEx', value: currentYear.opex, color: '#F97316' },
      { name: 'Interest', value: currentYear.interestExpense, color: '#EAB308' },
      { name: 'Taxes', value: currentYear.taxes, color: '#84CC16' }
    ];

    // Working capital components
    const workingCapitalData = [
      { component: 'Accounts Receivable', value: currentYear.revenue * 0.1 },
      { component: 'Inventory', value: currentYear.revenue * 0.08 },
      { component: 'Accounts Payable', value: currentYear.revenue * 0.06 },
      { component: 'Accrued Expenses', value: currentYear.revenue * 0.04 }
    ];

    // Cash flow waterfall data
    const cashFlowWaterfall = [
      { category: 'Operating CF', value: currentYear.cfo, color: '#10B981' },
      { category: 'Investing CF', value: currentYear.cfi, color: '#EF4444' },
      { category: 'Financing CF', value: currentYear.cff, color: '#3B82F6' }
    ];

    // Ratios
    const ratios = {
      grossMargin: (currentYear.grossProfit / currentYear.revenue * 100).toFixed(1),
      netMargin: (currentYear.netIncome / currentYear.revenue * 100).toFixed(1),
      ebitdaMargin: (currentYear.ebitda / currentYear.revenue * 100).toFixed(1),
      currentRatio: (currentYear.currentAssets / currentYear.currentLiabilities).toFixed(2),
      debtToEquity: (currentYear.totalLiabilities / currentYear.equity).toFixed(2),
      roa: (currentYear.netIncome / currentYear.totalAssets * 100).toFixed(1),
      roe: (currentYear.netIncome / currentYear.equity * 100).toFixed(1)
    };

    // Forecast vs Actual (mock data)
    const forecastVsActual = projections.slice(0, 3).map(proj => ({
      year: proj.year,
      forecastRevenue: proj.revenue,
      actualRevenue: proj.revenue * (0.95 + Math.random() * 0.1),
      forecastNetIncome: proj.netIncome,
      actualNetIncome: proj.netIncome * (0.90 + Math.random() * 0.2),
      variance: ((Math.random() - 0.5) * 20).toFixed(1)
    }));

    setCalculatedData({
      projections,
      kpis,
      expenseBreakdown,
      workingCapitalData,
      cashFlowWaterfall,
      ratios,
      forecastVsActual
    });
  };

  if (!modelId || !modelNames[modelId] || !calculatedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/model/${modelId}/configure`)}
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Configuration
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-white">{modelNames[modelId]} Dashboard</h1>
              <p className="text-slate-300 mt-2">Financial analysis and projections</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Global Slicers */}
        <div className="flex gap-4 items-center p-4 bg-slate-800/50 rounded-lg mb-8">
          <Filter className="h-4 w-4 text-slate-400" />
          <Select value={selectedScenario} onValueChange={setSelectedScenario}>
            <SelectTrigger className="w-[180px] bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select Scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Base">Base Case</SelectItem>
              <SelectItem value="Best">Best Case</SelectItem>
              <SelectItem value="Worst">Worst Case</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px] bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="Q1 2024">Q1 2024</SelectItem>
              <SelectItem value="Q2 2024">Q2 2024</SelectItem>
              <SelectItem value="Q3 2024">Q3 2024</SelectItem>
              <SelectItem value="Q4 2024">Q4 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-blue-600">Overview</TabsTrigger>
            <TabsTrigger value="income" className="text-white data-[state=active]:bg-blue-600">Income Statement</TabsTrigger>
            <TabsTrigger value="balance" className="text-white data-[state=active]:bg-blue-600">Balance Sheet</TabsTrigger>
            <TabsTrigger value="cashflow" className="text-white data-[state=active]:bg-blue-600">Cash Flow</TabsTrigger>
            <TabsTrigger value="ratios" className="text-white data-[state=active]:bg-blue-600">Ratios</TabsTrigger>
            <TabsTrigger value="forecast" className="text-white data-[state=active]:bg-blue-600">Forecast vs Actual</TabsTrigger>
          </TabsList>

          {/* 1. Overview Dashboard */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {calculatedData.kpis.map((kpi: KPIData, index: number) => {
                const IconComponent = kpi.icon;
                return (
                  <Card key={index} className="bg-slate-800/80 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm font-medium">{kpi.title}</p>
                          <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
                          <div className="flex items-center mt-2">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-500">{kpi.change}</span>
                          </div>
                        </div>
                        <div className="p-3 bg-blue-600/20 rounded-full">
                          <IconComponent className="h-6 w-6 text-blue-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* YoY Change Summary Chart */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">YoY Change Summary</CardTitle>
                <CardDescription className="text-slate-300">Year-over-year growth trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={calculatedData.projections}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="year" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                      formatter={(value: any, name: string) => [`$${(value / 1000000).toFixed(1)}M`, name]}
                    />
                    <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                    <Line type="monotone" dataKey="netIncome" stroke="#10B981" strokeWidth={3} name="Net Income" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 2. Income Statement Dashboard */}
          <TabsContent value="income" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={calculatedData.projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`, 'Revenue']}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gross Profit vs Net Income */}
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Gross Profit vs Net Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={calculatedData.projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`]}
                      />
                      <Bar dataKey="grossProfit" fill="#10B981" name="Gross Profit" />
                      <Bar dataKey="netIncome" fill="#3B82F6" name="Net Income" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Operating Expense Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Operating Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={calculatedData.expenseBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {calculatedData.expenseBreakdown.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => `$${(value / 1000000).toFixed(1)}M`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Profit Margins */}
              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-slate-800/80 border-slate-700">
                  <CardContent className="p-4">
                    <div className="text-sm text-slate-400">Gross Margin</div>
                    <div className="text-2xl font-bold text-white">{calculatedData.ratios.grossMargin}%</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/80 border-slate-700">
                  <CardContent className="p-4">
                    <div className="text-sm text-slate-400">EBITDA Margin</div>
                    <div className="text-2xl font-bold text-white">{calculatedData.ratios.ebitdaMargin}%</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/80 border-slate-700">
                  <CardContent className="p-4">
                    <div className="text-sm text-slate-400">Net Margin</div>
                    <div className="text-2xl font-bold text-white">{calculatedData.ratios.netMargin}%</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 3. Balance Sheet Dashboard */}
          <TabsContent value="balance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Asset vs Liabilities vs Equity */}
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Asset vs Liabilities vs Equity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={calculatedData.projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`]}
                      />
                      <Bar dataKey="totalAssets" stackId="a" fill="#3B82F6" name="Assets" />
                      <Bar dataKey="totalLiabilities" stackId="b" fill="#EF4444" name="Liabilities" />
                      <Bar dataKey="equity" stackId="c" fill="#10B981" name="Equity" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Working Capital Components */}
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Working Capital Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={calculatedData.workingCapitalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="component" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`]}
                      />
                      <Bar dataKey="value" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Equity Over Time */}
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Equity Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={calculatedData.projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`, 'Equity']}
                      />
                      <Line type="monotone" dataKey="equity" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Debt/Equity Ratio */}
              <Card className="bg-slate-800/80 border-slate-700">
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-slate-400 text-sm font-medium mb-2">Debt/Equity Ratio</div>
                    <div className="text-4xl font-bold text-white">{calculatedData.ratios.debtToEquity}</div>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">Improving</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 4. Cash Flow Dashboard */}
          <TabsContent value="cashflow" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cash Flow Categories */}
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Cash Flow Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={calculatedData.cashFlowWaterfall}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="category" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`]}
                      />
                      <Bar dataKey="value" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Free Cash Flow Trend */}
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Free Cash Flow Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={calculatedData.projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`, 'Free Cash Flow']}
                      />
                      <Line type="monotone" dataKey="freeCashFlow" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cash Balance Over Time */}
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Cash Balance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={calculatedData.projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`, 'Cash Balance']}
                      />
                      <Area type="monotone" dataKey="cash" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* CapEx vs Depreciation */}
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">CapEx vs Depreciation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={calculatedData.projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`]}
                      />
                      <Bar dataKey="capex" fill="#EF4444" name="CapEx" />
                      <Bar dataKey="depreciation" fill="#10B981" name="Depreciation" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 5. Ratio Dashboard */}
          <TabsContent value="ratios" className="space-y-6">
            {/* Ratio KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/80 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="text-slate-400 text-sm font-medium">Current Ratio</div>
                  <div className="text-3xl font-bold text-white mt-2">{calculatedData.ratios.currentRatio}</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/80 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="text-slate-400 text-sm font-medium">ROA</div>
                  <div className="text-3xl font-bold text-white mt-2">{calculatedData.ratios.roa}%</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/80 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="text-slate-400 text-sm font-medium">ROE</div>
                  <div className="text-3xl font-bold text-white mt-2">{calculatedData.ratios.roe}%</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/80 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="text-slate-400 text-sm font-medium">Debt/Equity</div>
                  <div className="text-3xl font-bold text-white mt-2">{calculatedData.ratios.debtToEquity}</div>
                </CardContent>
              </Card>
            </div>

            {/* Ratio Trends Over Time */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Ratio Trends Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={calculatedData.projections}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="year" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue Growth" />
                    <Line type="monotone" dataKey="netIncome" stroke="#10B981" strokeWidth={2} name="Profit Growth" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 6. Forecast vs Actual Dashboard */}
          <TabsContent value="forecast" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Forecast vs Actual Revenue */}
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Forecast vs Actual Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={calculatedData.forecastVsActual}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`]}
                      />
                      <Bar dataKey="forecastRevenue" fill="#3B82F6" name="Forecast" />
                      <Bar dataKey="actualRevenue" fill="#10B981" name="Actual" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Forecast vs Actual Net Income */}
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Forecast vs Actual Net Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={calculatedData.forecastVsActual}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`]}
                      />
                      <Line type="monotone" dataKey="forecastNetIncome" stroke="#3B82F6" strokeWidth={3} name="Forecast" />
                      <Line type="monotone" dataKey="actualNetIncome" stroke="#10B981" strokeWidth={3} name="Actual" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Variance Analysis */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Variance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {calculatedData.forecastVsActual.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-4 border border-slate-600 rounded-lg">
                      <div className="flex space-x-8">
                        <div>
                          <div className="text-sm text-slate-400">{item.year}</div>
                          <div className="font-medium text-white">Forecast: ${(item.forecastRevenue / 1000000).toFixed(1)}M</div>
                          <div className="font-medium text-white">Actual: ${(item.actualRevenue / 1000000).toFixed(1)}M</div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        parseFloat(item.variance) >= 0 ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                      }`}>
                        {item.variance}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
