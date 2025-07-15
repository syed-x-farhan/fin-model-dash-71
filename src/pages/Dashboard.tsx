
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Download, Share2, TrendingUp, TrendingDown, DollarSign, Target, Activity, BarChart3, Filter, Building2, CreditCard, Banknote, PieChart, Calendar, Users } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, ComposedChart } from 'recharts';

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
  const [showOwnerSalary, setShowOwnerSalary] = useState(true);

  const modelNames: Record<string, string> = {
    'corporate': 'Corporate Financial Model',
    'startup': 'Startup Model'
  };

  useEffect(() => {
    const savedVariables = localStorage.getItem(`model_${modelId}_variables`);
    if (savedVariables) {
      const vars = JSON.parse(savedVariables);
      setVariables(vars);
      generateBusinessData(vars);
    }
  }, [modelId]);

  const generateBusinessData = (vars: any[]) => {
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
      const totalExpenses = yearRevenue * 0.35;
      const ebitda = grossProfit - totalExpenses;
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
        totalExpenses: Math.round(totalExpenses),
        ebitda: Math.round(ebitda),
        netIncome: Math.round(netIncome),
        freeCashFlow: Math.round(freeCashFlow),
        cash: Math.round(yearRevenue * 0.15),
        grossMarginPercent: grossMargin,
        expenseToRevenuePercent: Math.round((totalExpenses / yearRevenue) * 100),
        capex: Math.round(capex)
      };
    });

    // Business Overview KPIs
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
        title: 'Ending Cash',
        value: `$${(currentYear.cash / 1000000).toFixed(1)}M`,
        change: '+15.2%',
        trend: 'up',
        icon: Banknote
      },
      {
        title: 'Gross Margin',
        value: `${currentYear.grossMarginPercent}%`,
        change: '+2.1%',
        trend: 'up',
        icon: BarChart3
      },
      {
        title: 'Expense-to-Revenue',
        value: `${currentYear.expenseToRevenuePercent}%`,
        change: '-1.5%',
        trend: 'down',
        icon: Activity
      }
    ];

    // Product data (mock)
    const productData = [
      { name: 'Product A', price: 1200, unitsSold: 850, growth: 15.2, costPerItem: 480 },
      { name: 'Product B', price: 2500, unitsSold: 420, growth: 8.7, costPerItem: 900 },
      { name: 'Product C', price: 800, unitsSold: 1200, growth: 22.1, costPerItem: 320 },
      { name: 'Product D', price: 3500, unitsSold: 180, growth: -5.3, costPerItem: 1400 }
    ];

    // Expense categories
    const expenseCategories = [
      { category: 'Marketing', amount: currentYear.revenue * 0.12, growth: 18.5 },
      { category: 'Operations', amount: currentYear.revenue * 0.08, growth: 12.3 },
      { category: 'R&D', amount: currentYear.revenue * 0.06, growth: 25.7 },
      { category: 'Admin', amount: currentYear.revenue * 0.05, growth: 8.2 },
      { category: 'Sales', amount: currentYear.revenue * 0.04, growth: 15.1 }
    ];

    // Loan data (mock)
    const loanData = {
      principal: 2000000,
      rate: 6.5,
      term: 10,
      monthlyPayment: 22757
    };

    // Shareholders data (mock)
    const shareholdersData = [
      { name: 'Founder 1', capitalInvested: 500000, ownership: 45, notes: 'Founder equity' },
      { name: 'Founder 2', capitalInvested: 300000, ownership: 25, notes: 'Founder equity' },
      { name: 'Series A Investors', capitalInvested: 2000000, ownership: 20, notes: 'Series A Round' },
      { name: 'Employee Pool', capitalInvested: 0, ownership: 10, notes: 'Stock options' }
    ];

    setCalculatedData({
      projections,
      kpis,
      productData,
      expenseCategories,
      loanData,
      shareholdersData
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

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/model/${modelId}/variables`)}
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Variables
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-white">{modelNames[modelId]} Dashboard</h1>
              <p className="text-slate-300 mt-2">Business performance analysis and insights</p>
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

        {/* Global Filters */}
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
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-blue-600">
              <Building2 className="h-4 w-4 mr-2" />
              Business Overview
            </TabsTrigger>
            <TabsTrigger value="revenue" className="text-white data-[state=active]:bg-orange-600">
              <DollarSign className="h-4 w-4 mr-2" />
              Revenue & Profit
            </TabsTrigger>
            <TabsTrigger value="expenses" className="text-white data-[state=active]:bg-purple-600">
              <CreditCard className="h-4 w-4 mr-2" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="cashflow" className="text-white data-[state=active]:bg-green-600">
              <Banknote className="h-4 w-4 mr-2" />
              Cash & Finance
            </TabsTrigger>
            <TabsTrigger value="equity" className="text-white data-[state=active]:bg-red-600">
              <Users className="h-4 w-4 mr-2" />
              Equity & Capital
            </TabsTrigger>
            <TabsTrigger value="forecast" className="text-white data-[state=active]:bg-yellow-600">
              <Calendar className="h-4 w-4 mr-2" />
              Forecast
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Business Overview */}
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
                            {kpi.trend === 'up' ? 
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" /> :
                              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            }
                            <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                              {kpi.change}
                            </span>
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

            {/* Revenue vs Expenses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Revenue vs Expenses</CardTitle>
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
                      <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                      <Bar dataKey="totalExpenses" fill="#EF4444" name="Total Expenses" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Net Income Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={calculatedData.projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`, 'Net Income']}
                      />
                      <Line type="monotone" dataKey="netIncome" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Forecast Summary Table */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Forecast Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-300">Year</TableHead>
                      <TableHead className="text-slate-300">Revenue</TableHead>
                      <TableHead className="text-slate-300">Gross Profit</TableHead>
                      <TableHead className="text-slate-300">Net Income</TableHead>
                      <TableHead className="text-slate-300">Cash</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculatedData.projections.map((proj: any) => (
                      <TableRow key={proj.year}>
                        <TableCell className="text-white font-medium">{proj.year}</TableCell>
                        <TableCell className="text-white">${(proj.revenue / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-white">${(proj.grossProfit / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-white">${(proj.netIncome / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-white">${(proj.cash / 1000000).toFixed(1)}M</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Revenue & Profitability */}
          <TabsContent value="revenue" className="space-y-6">
            {/* Product-wise Revenue */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Product Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-300">Product Name</TableHead>
                      <TableHead className="text-slate-300">Price</TableHead>
                      <TableHead className="text-slate-300">Units Sold/Month</TableHead>
                      <TableHead className="text-slate-300">Growth %</TableHead>
                      <TableHead className="text-slate-300">Cost per Item</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculatedData.productData.map((product: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="text-white font-medium">{product.name}</TableCell>
                        <TableCell className="text-white">${product.price.toLocaleString()}</TableCell>
                        <TableCell className="text-white">{product.unitsSold.toLocaleString()}</TableCell>
                        <TableCell className={`font-medium ${product.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {product.growth > 0 ? '+' : ''}{product.growth}%
                        </TableCell>
                        <TableCell className="text-white">${product.costPerItem.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* EBITDA vs Net Income */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">EBITDA vs Net Income</CardTitle>
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
                      <Bar dataKey="ebitda" fill="#F59E0B" name="EBITDA" />
                      <Bar dataKey="netIncome" fill="#3B82F6" name="Net Income" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Growth</CardTitle>
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
                      <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 3: Operating Expenses */}
          <TabsContent value="expenses" className="space-y-6">
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-300">Category Name</TableHead>
                      <TableHead className="text-slate-300">Amount</TableHead>
                      <TableHead className="text-slate-300">Growth %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculatedData.expenseCategories.map((expense: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="text-white font-medium">{expense.category}</TableCell>
                        <TableCell className="text-white">${(expense.amount / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-green-400 font-medium">+{expense.growth}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Expense Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={calculatedData.expenseCategories}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="category" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                      formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`]}
                    />
                    <Bar dataKey="amount" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: Cash Flow & Finance */}
          <TabsContent value="cashflow" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Free Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={calculatedData.projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`, 'Free Cash Flow']}
                      />
                      <Bar dataKey="freeCashFlow" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Cash Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={calculatedData.projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`, 'Cash']}
                      />
                      <Line type="monotone" dataKey="cash" stroke="#3B82F6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Loan Details */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Loan Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-slate-400 text-sm">Principal</div>
                    <div className="text-2xl font-bold text-white">${(calculatedData.loanData.principal / 1000000).toFixed(1)}M</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400 text-sm">Interest Rate</div>
                    <div className="text-2xl font-bold text-white">{calculatedData.loanData.rate}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400 text-sm">Term</div>
                    <div className="text-2xl font-bold text-white">{calculatedData.loanData.term} years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400 text-sm">Monthly Payment</div>
                    <div className="text-2xl font-bold text-white">${calculatedData.loanData.monthlyPayment.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 5: Equity & Capital */}
          <TabsContent value="equity" className="space-y-6">
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Shareholders & Cap Table</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Capital Invested</TableHead>
                      <TableHead className="text-slate-300">Ownership %</TableHead>
                      <TableHead className="text-slate-300">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculatedData.shareholdersData.map((shareholder: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="text-white font-medium">{shareholder.name}</TableCell>
                        <TableCell className="text-white">${shareholder.capitalInvested.toLocaleString()}</TableCell>
                        <TableCell className="text-white">{shareholder.ownership}%</TableCell>
                        <TableCell className="text-slate-300">{shareholder.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Ownership Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={calculatedData.shareholdersData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="ownership"
                        nameKey="name"
                        label={({ name, ownership }) => `${name}: ${ownership}%`}
                      >
                        {calculatedData.shareholdersData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Owner Salary Impact</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant={showOwnerSalary ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowOwnerSalary(true)}
                      className="text-xs"
                    >
                      With Salary
                    </Button>
                    <Button
                      variant={!showOwnerSalary ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowOwnerSalary(false)}
                      className="text-xs"
                    >
                      Without Salary
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-slate-400 text-sm">Annual Owner Salary</div>
                      <div className="text-2xl font-bold text-white">$150,000</div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-400 text-sm">Net Profit Impact</div>
                      <div className="text-xl font-bold text-orange-400">
                        {showOwnerSalary ? '-$150K' : '+$150K'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 6: Forecast & Planning */}
          <TabsContent value="forecast" className="space-y-6">
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">5-Year Financial Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-300">Year</TableHead>
                      <TableHead className="text-slate-300">Revenue</TableHead>
                      <TableHead className="text-slate-300">COGS</TableHead>
                      <TableHead className="text-slate-300">Net Income</TableHead>
                      <TableHead className="text-slate-300">Cash</TableHead>
                      <TableHead className="text-slate-300">CapEx</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculatedData.projections.map((proj: any) => (
                      <TableRow key={proj.year}>
                        <TableCell className="text-white font-medium">{proj.year}</TableCell>
                        <TableCell className="text-white">${(proj.revenue / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-white">${(proj.cogs / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-white">${(proj.netIncome / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-white">${(proj.cash / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-white">${(proj.capex / 1000000).toFixed(1)}M</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Revenue & Net Income Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={calculatedData.projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`]}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} name="Revenue" />
                      <Line type="monotone" dataKey="netIncome" stroke="#10B981" strokeWidth={3} name="Net Income" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Free Cash Flow Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={calculatedData.projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px' }}
                        formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`, 'Free Cash Flow']}
                      />
                      <Bar dataKey="freeCashFlow" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
