
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Calculator, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DCFDashboardProps {
  calculationResults?: any;
  modelId?: string;
  onRefresh?: () => Promise<void>;
}

const DCFDashboard: React.FC<DCFDashboardProps> = ({ 
  calculationResults, 
  modelId, 
  onRefresh 
}) => {
  // Backend Integration: Use calculationResults when available
  React.useEffect(() => {
    if (calculationResults) {
      console.log('DCF Dashboard received calculation results:', calculationResults);
    }
  }, [calculationResults]);

  // Sample data for visualization
  const cashFlowData = [
    { year: 'Year 1', fcf: 50 },
    { year: 'Year 2', fcf: 65 },
    { year: 'Year 3', fcf: 82 },
    { year: 'Year 4', fcf: 98 },
    { year: 'Year 5', fcf: 115 },
    { year: 'Terminal', fcf: 135 }
  ];

  const sensitivityData = [
    { wacc: '8%', growth: '2%', value: 850 },
    { wacc: '9%', growth: '2%', value: 780 },
    { wacc: '10%', growth: '2%', value: 720 },
    { wacc: '8%', growth: '3%', value: 920 },
    { wacc: '9%', growth: '3%', value: 840 },
    { wacc: '10%', growth: '3%', value: 770 }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">DCF Valuation Results</h1>
        <p className="text-muted-foreground">Discounted cash flow analysis and enterprise valuation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enterprise Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$842M</div>
            <p className="text-xs text-muted-foreground">Present value of FCF</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WACC</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.2%</div>
            <p className="text-xs text-muted-foreground">Weighted avg cost of capital</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminal Growth</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5%</div>
            <p className="text-xs text-muted-foreground">Long-term growth rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminal Value</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$695M</div>
            <p className="text-xs text-muted-foreground">82% of enterprise value</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cashflow" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cashflow">Cash Flow Projection</TabsTrigger>
          <TabsTrigger value="sensitivity">Sensitivity Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cashflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Free Cash Flow Projection</CardTitle>
              <CardDescription>
                Projected free cash flows and terminal value
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="fcf" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sensitivity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Valuation Sensitivity</CardTitle>
              <CardDescription>
                Enterprise value sensitivity to WACC and growth rate assumptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={sensitivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="wacc" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DCFDashboard;
