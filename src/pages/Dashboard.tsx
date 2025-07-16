import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Activity,
  ArrowLeft,
  Download,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MODEL_CONFIGS, ModelId, getModelConfig } from '@/config/models';

export default function Dashboard() {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [modelVariables, setModelVariables] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load calculation results and variables from localStorage
    const results = localStorage.getItem('calculationResults');
    const variables = localStorage.getItem('modelVariables');
    
    if (results && variables) {
      setCalculationResults(JSON.parse(results));
      setModelVariables(JSON.parse(variables));
    } else {
      toast({
        title: "No Data Found",
        description: "Please configure variables and run calculations first.",
        variant: "destructive"
      });
      setTimeout(() => {
        navigate(`/model/${modelId}/variables`);
      }, 2000);
    }
    setIsLoading(false);
  }, [modelId, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getModelName = () => {
    return modelId ? MODEL_CONFIGS[modelId as ModelId]?.info.name || 'Financial Model' : 'Financial Model';
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
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="flex-1 p-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Business Overview</TabsTrigger>
                <TabsTrigger value="revenue">Revenue & Profitability</TabsTrigger>
                <TabsTrigger value="expenses">Expenses & Operations</TabsTrigger>
                <TabsTrigger value="cashflow">Cash Flow & Finance</TabsTrigger>
                <TabsTrigger value="equity">Equity & Capital</TabsTrigger>
                <TabsTrigger value="forecast">Forecast & Planning</TabsTrigger>
              </TabsList>

              {/* Tab 1: Business Overview */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$1,250,000</div>
                      <p className="text-xs text-muted-foreground">+12.5% from last year</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Net Income</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$185,000</div>
                      <p className="text-xs text-muted-foreground">+8.2% from last year</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Ending Cash</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$425,000</div>
                      <p className="text-xs text-muted-foreground">+15.3% cash growth</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Gross Margin</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">68.5%</div>
                      <p className="text-xs text-muted-foreground">+2.1% improvement</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Expense Ratio</CardTitle>
                      <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">52.3%</div>
                      <p className="text-xs text-muted-foreground">-1.5% efficiency gain</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue vs Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                        Revenue vs Expenses Chart
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Net Income Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                        Net Income Trend Chart
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Forecast Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Year</th>
                            <th className="text-left p-2">Revenue</th>
                            <th className="text-left p-2">Net Income</th>
                            <th className="text-left p-2">Cash Flow</th>
                            <th className="text-left p-2">Growth %</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">2024</td>
                            <td className="p-2">$1,250,000</td>
                            <td className="p-2">$185,000</td>
                            <td className="p-2">$210,000</td>
                            <td className="p-2">12.5%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">2025</td>
                            <td className="p-2">$1,425,000</td>
                            <td className="p-2">$225,000</td>
                            <td className="p-2">$260,000</td>
                            <td className="p-2">14.0%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">2026</td>
                            <td className="p-2">$1,650,000</td>
                            <td className="p-2">$275,000</td>
                            <td className="p-2">$320,000</td>
                            <td className="p-2">15.8%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 2: Revenue & Profitability */}
              <TabsContent value="revenue">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Revenue & Profitability Analysis</h2>
                  <p>Detailed insights into revenue streams, cost of goods sold, and profitability metrics.</p>
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                        Revenue Breakdown Chart
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Tab 3: Expenses & Operations */}
              <TabsContent value="expenses">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Expenses & Operations Overview</h2>
                  <p>Analysis of operating expenses, administrative costs, and operational efficiency.</p>
                  <Card>
                    <CardHeader>
                      <CardTitle>Operating Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                        Operating Expenses Chart
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Tab 4: Cash Flow & Finance */}
              <TabsContent value="cashflow">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Cash Flow & Financial Health</h2>
                  <p>Insights into cash flow from operations, investing, and financing activities.</p>
                  <Card>
                    <CardHeader>
                      <CardTitle>Cash Flow Statement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                        Cash Flow Statement Chart
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Tab 5: Equity & Capital */}
              <TabsContent value="equity">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Equity & Capital Structure</h2>
                  <p>Analysis of equity, debt, and capital structure.</p>
                  <Card>
                    <CardHeader>
                      <CardTitle>Equity Composition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                        Equity Composition Chart
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Tab 6: Forecast & Planning */}
              <TabsContent value="forecast">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Forecast & Financial Planning</h2>
                  <p>Projected financial performance and strategic planning insights.</p>
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                        Revenue Forecast Chart
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
