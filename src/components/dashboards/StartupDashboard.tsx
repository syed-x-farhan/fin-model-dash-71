
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PDFExporter from '@/components/PDFExporter';

interface StartupDashboardProps {
  calculationResults?: any;
  modelId?: string;
  onRefresh?: () => Promise<void>;
}

const StartupDashboard: React.FC<StartupDashboardProps> = ({ 
  calculationResults, 
  modelId, 
  onRefresh 
}) => {
  // Backend Integration: Use calculationResults when available
  React.useEffect(() => {
    if (calculationResults) {
      console.log('Startup Dashboard received calculation results:', calculationResults);
    }
  }, [calculationResults]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Startup Financial Model Results</h1>
            <p className="text-muted-foreground">Growth-stage company financial projections and unit economics</p>
          </div>
          <PDFExporter 
            title="Startup Financial Model Results"
            subtitle="Growth-stage company financial projections and unit economics"
            dashboardType="startup"
            data={calculationResults}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$87K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+32%</span> month-over-month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Burn Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$75K</div>
            <p className="text-xs text-muted-foreground">Monthly operating expenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,847</div>
            <p className="text-xs text-muted-foreground">5% monthly churn rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Runway</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 mo</div>
            <p className="text-xs text-muted-foreground">Until next funding round</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-muted-foreground">
        <p>Startup Dashboard implementation coming soon...</p>
      </div>
    </div>
  );
};

export default StartupDashboard;
