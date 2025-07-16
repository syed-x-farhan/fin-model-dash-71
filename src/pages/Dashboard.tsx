
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft,
  Download,
  RefreshCw,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Building,
  CreditCard,
  Banknote,
  Users,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MODEL_CONFIGS, ModelId } from '@/config/models';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [modelVariables, setModelVariables] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for the dashboard
  const mockData = {
    overview: {
      totalRevenue: 1749006,
      totalExpenses: 1320000,
      netIncome: 429006,
      monthlyGrowth: 12.5
    },
    revenue: [
      { month: 'Jan', value: 120000, profit: 24000 },
      { month: 'Feb', value: 135000, profit: 27000 },
      { month: 'Mar', value: 148000, profit: 32000 },
      { month: 'Apr', value: 162000, profit: 38000 },
      { month: 'May', value: 175000, profit: 42000 },
      { month: 'Jun', value: 189000, profit: 45000 }
    ],
    expenses: [
      { category: 'Salaries', amount: 650000, color: '#3b82f6' },
      { category: 'Rent', amount: 240000, color: '#ef4444' },
      { category: 'Marketing', amount: 180000, color: '#22c55e' },
      { category: 'Utilities', amount: 120000, color: '#f59e0b' },
      { category: 'Other', amount: 130000, color: '#8b5cf6' }
    ],
    cashFlow: [
      { month: 'Jan', operating: 45000, investing: -15000, financing: 0 },
      { month: 'Feb', operating: 52000, investing: -8000, financing: 0 },
      { month: 'Mar', operating: 48000, investing: -12000, financing: 25000 },
      { month: 'Apr', operating: 55000, investing: -5000, financing: 0 },
      { month: 'May', operating: 62000, investing: -20000, financing: 0 },
      { month: 'Jun', operating: 58000, investing: -10000, financing: 0 }
    ],
    equity: {
      shareholders: [
        { name: 'Founder 1', shares: 45, value: 450000 },
        { name: 'Founder 2', shares: 35, value: 350000 },
        { name: 'Investor A', shares: 15, value: 150000 },
        { name: 'Employee Pool', shares: 5, value: 50000 }
      ],
      ownerSalary: 120000
    },
    forecast: [
      { year: '2024', revenue: 2100000, expenses: 1580000, netIncome: 520000 },
      { year: '2025', revenue: 2520000, expenses: 1850000, netIncome: 670000 },
      { year: '2026', revenue: 3024000, expenses: 2150000, netIncome: 874000 },
      { year: '2027', revenue: 3629000, expenses: 2480000, netIncome: 1149000 },
      { year: '2028', revenue: 4355000, expenses: 2850000, netIncome: 1505000 }
    ]
  };

  useEffect(() => {
    setCalculationResults(mockData);
    setModelVariables({ growthRate: 15, margin: 25 });
  }, [modelId]);

  const getModelName = () => {
    return modelId ? MODEL_CONFIGS[modelId as ModelId]?.info.name || 'Financial Model' : 'Financial Model';
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar selectedModel={modelId as ModelId} onModelSelect={() => {}} />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/model/${modelId}/variables`)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Variables
            </Button>
            <div className="flex items-center gap-2 flex-1">
              <h1 className="text-xl font-semibold text-foreground">{getModelName()} Dashboard</h1>
              <Badge variant="secondary">Results</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="flex-1 p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Business Overview
                </TabsTrigger>
                <TabsTrigger value="revenue" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Revenue & Profit
                </TabsTrigger>
                <TabsTrigger value="expenses" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Expenses
                </TabsTrigger>
                <TabsTrigger value="cash" className="flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  Cash & Finance
                </TabsTrigger>
                <TabsTrigger value="equity" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Equity & Capital
                </TabsTrigger>
                <TabsTrigger value="forecast" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Forecast
                </TabsTrigger>
              </TabsList>

              {/* 🏢 Business Overview */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${(mockData.overview.totalRevenue / 1000000).toFixed(2)}M</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-600">+{mockData.overview.monthlyGrowth}%</span> from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${(mockData.overview.totalExpenses / 1000000).toFixed(2)}M</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-red-600">+8.2%</span> from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Net Income</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${(mockData.overview.netIncome / 1000).toFixed(0)}K</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-600">+24.5%</span> from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24.5%</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-600">+2.1%</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue vs Expenses</CardTitle>
                    <CardDescription>Monthly comparison of revenue and expenses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={mockData.revenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                        <Bar dataKey="value" fill="hsl(var(--primary))" name="Revenue" />
                        <Bar dataKey="profit" fill="hsl(var(--chart-2))" name="Profit" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 💰 Revenue & Profit */}
              <TabsContent value="revenue" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Growth Trend</CardTitle>
                      <CardDescription>Monthly revenue progression</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockData.revenue}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']} />
                          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>EBITDA vs Net Income</CardTitle>
                      <CardDescription>Profitability comparison</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockData.revenue}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                          <Bar dataKey="value" fill="hsl(var(--chart-1))" name="EBITDA" />
                          <Bar dataKey="profit" fill="hsl(var(--chart-2))" name="Net Income" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 💳 Expenses */}
              <TabsContent value="expenses" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Breakdown</CardTitle>
                    <CardDescription>Distribution of expenses by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          dataKey="amount"
                          data={mockData.expenses}
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                        >
                          {mockData.expenses.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Amount']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {mockData.expenses.map((expense, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-sm">{expense.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold">${(expense.amount / 1000).toFixed(0)}K</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              backgroundColor: expense.color, 
                              width: `${(expense.amount / Math.max(...mockData.expenses.map(e => e.amount))) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 💵 Cash & Finance */}
              <TabsContent value="cash" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cash Flow Analysis</CardTitle>
                    <CardDescription>Operating, investing, and financing activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={mockData.cashFlow}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                        <Bar dataKey="operating" fill="hsl(var(--chart-1))" name="Operating" />
                        <Bar dataKey="investing" fill="hsl(var(--chart-2))" name="Investing" />
                        <Bar dataKey="financing" fill="hsl(var(--chart-3))" name="Financing" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 👥 Equity & Capital */}
              <TabsContent value="equity" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shareholder Distribution</CardTitle>
                      <CardDescription>Ownership percentage and value</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockData.equity.shareholders.map((shareholder, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded">
                            <div>
                              <div className="font-medium">{shareholder.name}</div>
                              <div className="text-sm text-muted-foreground">{shareholder.shares}% ownership</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">${shareholder.value.toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Owner Salary Impact</CardTitle>
                      <CardDescription>Annual compensation and tax implications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Annual Salary</span>
                          <span className="font-bold">${mockData.equity.ownerSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Tax (25%)</span>
                          <span className="font-bold">${(mockData.equity.ownerSalary * 0.25).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Net After Tax</span>
                          <span className="font-bold">${(mockData.equity.ownerSalary * 0.75).toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 📅 Forecast */}
              <TabsContent value="forecast" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>5-Year Financial Projections</CardTitle>
                    <CardDescription>Detailed revenue, expense, and profit forecasts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={mockData.forecast}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Revenue" />
                        <Line type="monotone" dataKey="expenses" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Expenses" />
                        <Line type="monotone" dataKey="netIncome" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Net Income" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {mockData.forecast.map((year, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{year.year}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <div className="text-xs text-muted-foreground">Revenue</div>
                          <div className="font-bold">${(year.revenue / 1000000).toFixed(1)}M</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Expenses</div>
                          <div className="font-bold">${(year.expenses / 1000000).toFixed(1)}M</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Net Income</div>
                          <div className="font-bold text-green-600">${(year.netIncome / 1000000).toFixed(1)}M</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
