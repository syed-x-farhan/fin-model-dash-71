import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, ComposedChart, Area, AreaChart } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { threeStatementMockData } from '@/data/threeStatementData';

/**
 * ThreeStatementDashboard Component
 * 
 * Main dashboard component for displaying 3-statement financial model results.
 * Designed to be backend-friendly for FastAPI integration.
 * 
 * Data Flow for Backend Integration:
 * 1. Replace threeStatementMockData with API calls to FastAPI endpoints
 * 2. Add loading states and error handling for API responses
 * 3. Add data validation and type checking for API responses
 * 4. Add refresh mechanisms for real-time data updates
 */
const ThreeStatementDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Dashboard Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">3-Statement Financial Model Results</h1>
        <p className="text-muted-foreground">Comprehensive view of Income Statement, Balance Sheet, and Cash Flow projections</p>
      </div>

      {/* Main Dashboard Tabs - Backend Ready Structure */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income Statement</TabsTrigger>
          <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="ratios">Ratio Analysis</TabsTrigger>
          <TabsTrigger value="forecast">Forecast vs Actual</TabsTrigger>
          <TabsTrigger value="kpis">Custom KPIs</TabsTrigger>
        </TabsList>

        {/* 1. Overview Dashboard - Simplified for Backend Integration */}
        <TabsContent value="overview" className="space-y-6">
          {/* Scenario Selector - Single slicer for backend filtering */}
          <div className="flex gap-4 items-center p-4 bg-muted/50 rounded-lg">
            <Select defaultValue="Base Case">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Scenario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Base Case">Base Case</SelectItem>
                <SelectItem value="Best Case">Best Case</SelectItem>
                <SelectItem value="Worst Case">Worst Case</SelectItem>
                <SelectItem value="Conservative">Conservative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Performance Indicators Cards - Backend Data Integration Points */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Total Revenue Card - API Endpoint: /api/v1/financial/revenue */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${(threeStatementMockData.overview.totalRevenue / 1000000).toFixed(2)}M
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{threeStatementMockData.overview.yoyGrowth.revenue}%</span> from last year
                </p>
              </CardContent>
            </Card>

            {/* Net Income Card - API Endpoint: /api/v1/financial/net-income */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${(threeStatementMockData.overview.netIncome / 1000).toFixed(0)}K
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{threeStatementMockData.overview.yoyGrowth.netIncome}%</span> from last year
                </p>
              </CardContent>
            </Card>

            {/* EBITDA Card - API Endpoint: /api/v1/financial/ebitda */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">EBITDA</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${(threeStatementMockData.overview.ebitda / 1000).toFixed(0)}K
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{threeStatementMockData.overview.yoyGrowth.ebitda}%</span> from last year
                </p>
              </CardContent>
            </Card>

            {/* Cash Balance Card - API Endpoint: /api/v1/financial/cash-balance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(threeStatementMockData.overview.totalRevenue * 0.15 / 1000).toFixed(0)}K</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.2%</span> from last quarter
                </p>
              </CardContent>
            </Card>

            {/* Free Cash Flow Card - API Endpoint: /api/v1/financial/free-cash-flow */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Free Cash Flow</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(threeStatementMockData.overview.freeCashFlow / 1000).toFixed(0)}K</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{threeStatementMockData.overview.yoyGrowth.freeCashFlow}%</span> from last year
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section - Backend Data Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* YoY Change Summary Chart - API Endpoint: /api/v1/financial/trends */}
            <Card>
              <CardHeader>
                <CardTitle>YoY Change Summary</CardTitle>
                <CardDescription>Year-over-year growth trends across key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={threeStatementMockData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Value']} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" name="Revenue" />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Growth Trend" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Breakdown Chart - API Endpoint: /api/v1/financial/expenses */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Cost structure analysis by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="value"
                      data={threeStatementMockData.expenses}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {threeStatementMockData.expenses.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Amount']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 2. Income Statement Dashboard - Keep existing structure for backend integration */}
        <TabsContent value="income" className="space-y-6">
          {/* Revenue Trend Analysis - API Endpoint: /api/v1/income-statement/revenue-trend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>5-year revenue growth projection</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={threeStatementMockData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']} />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Gross Profit vs Net Income - API Endpoint: /api/v1/income-statement/profit-comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Gross Profit vs Net Income</CardTitle>
                <CardDescription>Profit margin analysis over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={threeStatementMockData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                    <Bar dataKey="value" fill="hsl(var(--chart-1))" name="Gross Profit" />
                    <Bar dataKey="value" fill="hsl(var(--chart-2))" name="Net Income" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Profit Margins KPI Cards - API Endpoint: /api/v1/income-statement/margins */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Gross Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">70%</div>
                <p className="text-xs text-muted-foreground">Industry avg: 65%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>EBITDA Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25%</div>
                <p className="text-xs text-muted-foreground">Industry avg: 22%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Net Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12%</div>
                <p className="text-xs text-muted-foreground">Industry avg: 15%</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 3. Balance Sheet Dashboard - Keep existing implementation */}
        <TabsContent value="balance" className="space-y-6">
          {/* Asset vs Liabilities vs Equity - API Endpoint: /api/v1/balance-sheet/composition */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset vs Liabilities vs Equity</CardTitle>
                <CardDescription>Balance sheet structure over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={threeStatementMockData.balanceSheet}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                    <Bar dataKey="assets" stackId="a" fill="hsl(var(--chart-1))" name="Assets" />
                    <Bar dataKey="liabilities" stackId="a" fill="hsl(var(--chart-2))" name="Liabilities" />
                    <Bar dataKey="equity" stackId="a" fill="hsl(var(--chart-3))" name="Equity" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Equity Movement - API Endpoint: /api/v1/balance-sheet/equity-trend */}
            <Card>
              <CardHeader>
                <CardTitle>Equity Movement</CardTitle>
                <CardDescription>Equity growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={threeStatementMockData.balanceSheet}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Equity']} />
                    <Line type="monotone" dataKey="equity" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Working Capital Components - API Endpoint: /api/v1/balance-sheet/working-capital */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {threeStatementMockData.workingCapital.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{item.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.current} days</div>
                  <p className="text-xs text-muted-foreground">
                    Benchmark: {item.benchmark} days
                    {item.trend === 'up' ? (
                      <TrendingUp className="inline h-3 w-3 ml-1 text-green-600" />
                    ) : (
                      <TrendingDown className="inline h-3 w-3 ml-1 text-red-600" />
                    )}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Components</CardTitle>
                <CardDescription>Operating, investing, and financing cash flows</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={threeStatementMockData.cashFlow}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                    <Bar dataKey="operating" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="investing" fill="hsl(var(--chart-2))" />
                    <Bar dataKey="financing" fill="hsl(var(--chart-3))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cash Balance Trend</CardTitle>
                <CardDescription>Cash position over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={threeStatementMockData.cashFlow}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Cash Balance']} />
                    <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Free Cash Flow Trend</CardTitle>
              <CardDescription>Operating cash flow less capital expenditures</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={threeStatementMockData.cashFlow}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Operating CF']} />
                  <Area type="monotone" dataKey="operating" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ratios" className="space-y-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profitability Ratios</CardTitle>
                <CardDescription>Return and margin metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {threeStatementMockData.ratios.profitability.map((ratio, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="text-sm font-medium text-muted-foreground">{ratio.metric}</div>
                      <div className="text-2xl font-bold">{ratio.value}%</div>
                      <Badge variant={ratio.value >= ratio.benchmark ? "default" : "secondary"}>
                        Benchmark: {ratio.benchmark}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Liquidity Ratios</CardTitle>
                <CardDescription>Short-term financial health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {threeStatementMockData.ratios.liquidity.map((ratio, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="text-sm font-medium text-muted-foreground">{ratio.metric}</div>
                      <div className="text-2xl font-bold">{ratio.value}</div>
                      <Badge variant={ratio.value >= ratio.benchmark ? "default" : "secondary"}>
                        Benchmark: {ratio.benchmark}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Leverage Ratios</CardTitle>
                  <CardDescription>Debt and coverage metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {threeStatementMockData.ratios.leverage.map((ratio, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <div className="font-medium">{ratio.metric}</div>
                          <div className="text-2xl font-bold">{ratio.value}</div>
                        </div>
                        <Badge variant={ratio.value >= ratio.benchmark ? "default" : "secondary"}>
                          Target: {ratio.benchmark}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Efficiency Ratios</CardTitle>
                  <CardDescription>Asset utilization metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {threeStatementMockData.ratios.efficiency.map((ratio, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <div className="font-medium">{ratio.metric}</div>
                          <div className="text-2xl font-bold">{ratio.value}</div>
                        </div>
                        <Badge variant={ratio.value >= ratio.benchmark ? "default" : "secondary"}>
                          Target: {ratio.benchmark}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Forecast vs Actual Revenue</CardTitle>
                <CardDescription>Revenue variance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={threeStatementMockData.forecastVsActual}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                    <Bar dataKey="forecast" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="actual" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forecast vs Actual Profit</CardTitle>
                <CardDescription>Profit variance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={threeStatementMockData.forecastVsActual}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                    <Line type="monotone" dataKey="forecastProfit" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                    <Line type="monotone" dataKey="actualProfit" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Variance Analysis</CardTitle>
              <CardDescription>Performance vs forecast accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threeStatementMockData.forecastVsActual.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex space-x-8">
                      <div>
                        <div className="text-sm text-muted-foreground">{item.year}</div>
                        <div className="font-medium">Forecast: ${item.forecast.toLocaleString()}</div>
                        <div className="font-medium">Actual: ${item.actual.toLocaleString()}</div>
                      </div>
                    </div>
                    <Badge variant={item.variance >= 0 ? "default" : "secondary"}>
                      {item.variance >= 0 ? '+' : ''}{item.variance}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Unit Economics</CardTitle>
              <CardDescription>Key performance metrics per unit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {threeStatementMockData.customKPIs.unitEconomics.map((kpi, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">{kpi.metric}</div>
                    <div className="text-2xl font-bold">{kpi.unit}{kpi.value.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">{kpi.description || `${kpi.employees} employees`}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Strategic Drivers</CardTitle>
              <CardDescription>Business performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {threeStatementMockData.customKPIs.operational.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">{metric.metric}</div>
                    <div className="text-2xl font-bold">{metric.value}{metric.unit}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {metric.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1 text-green-600" />}
                      {metric.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1 text-red-600" />}
                      {metric.trend === 'stable' && <Activity className="h-3 w-3 mr-1 text-blue-600" />}
                      Trend: {metric.trend}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Unit Economics Graph</CardTitle>
              <CardDescription>Visual representation of key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={threeStatementMockData.customKPIs.unitEconomics.slice(0, 3)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThreeStatementDashboard;
