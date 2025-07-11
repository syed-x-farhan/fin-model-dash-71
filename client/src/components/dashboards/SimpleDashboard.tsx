import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Activity, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface SimpleDashboardProps {
  modelType: string;
}

const SimpleDashboard: React.FC<SimpleDashboardProps> = ({ modelType }) => {
  // Sample data that represents backend calculations
  const sampleData = [
    { year: 2024, revenue: 10.0, profit: 1.8, cashFlow: 1.4 },
    { year: 2025, revenue: 11.0, profit: 2.0, cashFlow: 1.6 },
    { year: 2026, revenue: 12.1, profit: 2.2, cashFlow: 1.8 },
    { year: 2027, revenue: 13.3, profit: 2.4, cashFlow: 2.0 },
    { year: 2028, revenue: 14.6, profit: 2.7, cashFlow: 2.2 }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">{modelType} Financial Model Results</h1>
        <p className="text-muted-foreground">Financial projections calculated by backend engine</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (5Y)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$61.0M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">CAGR: 10.0%</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Net Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.2M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Final Year: $2.7M</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EBITDA Margin</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25.0%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Industry avg: 22%</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Cash Flow</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$9.0M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">5-year total</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Profitability Trend</CardTitle>
            <CardDescription>Backend calculated projections ($ millions)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`$${value}M`, name]} />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="profit" stroke="#82ca9d" strokeWidth={2} name="Net Income" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Analysis</CardTitle>
            <CardDescription>Free cash flow projections</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`$${value}M`, name]} />
                <Bar dataKey="cashFlow" fill="#8884d8" name="Free Cash Flow" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleDashboard;