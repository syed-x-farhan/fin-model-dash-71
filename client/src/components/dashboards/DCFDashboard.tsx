import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { DollarSign, TrendingUp, Calculator, Target, Settings, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock DCF calculation data
const mockDCFData = {
  overview: {
    enterpriseValue: 145200000,
    equityValue: 125200000,
    sharePrice: 25.04,
    wacc: 9.5,
    terminalValue: 98800000,
    shares: 5000000
  },
  fcfForecast: [
    { year: 'Y1', revenue: 16675000, ebit: 3669500, capex: 1167250, wcChange: 333500, fcf: 2435000 },
    { year: 'Y2', revenue: 18676000, ebit: 4108720, capex: 1307320, wcChange: 373520, fcf: 2720000 },
    { year: 'Y3', revenue: 20543600, ebit: 4519592, capex: 1438052, wcChange: 410872, fcf: 2995000 },
    { year: 'Y4', revenue: 22187088, ebit: 4881159, capex: 1553096, wcChange: 443742, fcf: 3240000 },
    { year: 'Y5', revenue: 23518273, ebit: 5174020, capex: 1646279, wcChange: 470365, fcf: 3420000 }
  ],
  discountedFCF: [
    { year: 'Y1', fcf: 2435000, discountFactor: 0.913, discountedFCF: 2223000 },
    { year: 'Y2', fcf: 2720000, discountFactor: 0.834, discountedFCF: 2268000 },
    { year: 'Y3', fcf: 2995000, discountFactor: 0.762, discountedFCF: 2282000 },
    { year: 'Y4', fcf: 3240000, discountFactor: 0.696, discountedFCF: 2255000 },
    { year: 'Y5', fcf: 3420000, discountFactor: 0.636, discountedFCF: 2175000 }
  ],
  terminalValueComparison: [
    { method: 'Gordon Growth', value: 98800000, description: '2.5% perpetual growth' },
    { method: 'Exit Multiple', value: 102400000, description: '8x Terminal EBITDA' }
  ],
  assumptions: {
    revenueGrowth: [15, 12, 10, 8, 6],
    operatingMargin: 22,
    capexPercent: 7,
    wcPercent: 2,
    taxRate: 25,
    wacc: 9.5,
    terminalGrowth: 2.5,
    exitMultiple: 8
  }
};

const DCFDashboard: React.FC = () => {
  const [waccSlider, setWaccSlider] = useState([9.5]);
  const [terminalGrowthSlider, setTerminalGrowthSlider] = useState([2.5]);
  const [exitMultipleSlider, setExitMultipleSlider] = useState([8]);

  // Calculate sensitivity matrix
  const generateSensitivityMatrix = () => {
    const waccRange = [7, 8, 9, 10, 11, 12];
    const growthRange = [1, 1.5, 2, 2.5, 3, 3.5, 4];
    
    return growthRange.map(growth => ({
      growth: growth,
      wacc_7: Math.round(mockDCFData.overview.equityValue * (1 + (2.5 - growth) * 0.1) * (1 + (9.5 - 7) * 0.08)),
      wacc_8: Math.round(mockDCFData.overview.equityValue * (1 + (2.5 - growth) * 0.1) * (1 + (9.5 - 8) * 0.08)),
      wacc_9: Math.round(mockDCFData.overview.equityValue * (1 + (2.5 - growth) * 0.1) * (1 + (9.5 - 9) * 0.08)),
      wacc_10: Math.round(mockDCFData.overview.equityValue * (1 + (2.5 - growth) * 0.1) * (1 + (9.5 - 10) * 0.08)),
      wacc_11: Math.round(mockDCFData.overview.equityValue * (1 + (2.5 - growth) * 0.1) * (1 + (9.5 - 11) * 0.08)),
      wacc_12: Math.round(mockDCFData.overview.equityValue * (1 + (2.5 - growth) * 0.1) * (1 + (9.5 - 12) * 0.08))
    }));
  };

  const sensitivityData = generateSensitivityMatrix();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">DCF Valuation Model Results</h1>
        <p className="text-muted-foreground">Discounted Cash Flow analysis with enterprise and equity valuation</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">DCF Overview</TabsTrigger>
          <TabsTrigger value="fcf">FCF Forecast</TabsTrigger>
          <TabsTrigger value="discounting">Discounting</TabsTrigger>
          <TabsTrigger value="terminal">Terminal Value</TabsTrigger>
          <TabsTrigger value="sensitivity">Sensitivity</TabsTrigger>
          <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
        </TabsList>

        {/* 1. DCF Overview Page */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enterprise Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(mockDCFData.overview.enterpriseValue / 1000000).toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground">Sum of DCF + Terminal Value</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Equity Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(mockDCFData.overview.equityValue / 1000000).toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground">Enterprise Value - Net Debt</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Share Price</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${mockDCFData.overview.sharePrice}</div>
                <p className="text-xs text-muted-foreground">Equity Value ÷ Shares Outstanding</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>WACC Components</CardTitle>
                <CardDescription>Weighted Average Cost of Capital breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current WACC</span>
                    <Badge variant="outline">{mockDCFData.overview.wacc}%</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Cost of Equity</span>
                      <span>11.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cost of Debt</span>
                      <span>5.0%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax Shield</span>
                      <span>25%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Terminal Value
                </CardTitle>
                <CardDescription>Represents {((mockDCFData.overview.terminalValue / mockDCFData.overview.enterpriseValue) * 100).toFixed(0)}% of Enterprise Value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">${(mockDCFData.overview.terminalValue / 1000000).toFixed(1)}M</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Using Gordon Growth Model with {mockDCFData.assumptions.terminalGrowth}% perpetual growth
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 2. Free Cash Flow Forecast Page */}
        <TabsContent value="fcf" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Free Cash Flow Projections</CardTitle>
                <CardDescription>5-year FCF forecast and components</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockDCFData.fcfForecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number / 1000000).toFixed(2)}M`, '']} />
                    <Line type="monotone" dataKey="fcf" stroke="hsl(var(--primary))" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FCF Components Analysis</CardTitle>
                <CardDescription>EBIT, CapEx, and Working Capital changes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockDCFData.fcfForecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number / 1000000).toFixed(2)}M`, '']} />
                    <Bar dataKey="ebit" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="capex" fill="hsl(var(--chart-2))" />
                    <Bar dataKey="wcChange" fill="hsl(var(--chart-3))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* FCF Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed FCF Forecast Table</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Year</th>
                      <th className="text-right p-2">Revenue</th>
                      <th className="text-right p-2">EBIT</th>
                      <th className="text-right p-2">CapEx</th>
                      <th className="text-right p-2">WC Change</th>
                      <th className="text-right p-2 font-bold">FCF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDCFData.fcfForecast.map((year) => (
                      <tr key={year.year} className="border-b">
                        <td className="p-2 font-medium">{year.year}</td>
                        <td className="p-2 text-right">${(year.revenue / 1000000).toFixed(1)}M</td>
                        <td className="p-2 text-right">${(year.ebit / 1000000).toFixed(1)}M</td>
                        <td className="p-2 text-right">${(year.capex / 1000000).toFixed(1)}M</td>
                        <td className="p-2 text-right">${(year.wcChange / 1000000).toFixed(1)}M</td>
                        <td className="p-2 text-right font-bold">${(year.fcf / 1000000).toFixed(1)}M</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. Discounting Calculation Page */}
        <TabsContent value="discounting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Present Value of FCFs</CardTitle>
                <CardDescription>Discounted cash flows at {mockDCFData.assumptions.wacc}% WACC</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={mockDCFData.discountedFCF}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number / 1000000).toFixed(2)}M`, '']} />
                    <Bar dataKey="fcf" fill="hsl(var(--chart-1))" />
                    <Line type="monotone" dataKey="discountedFCF" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Discount Factors</CardTitle>
                <CardDescription>Present value multipliers by year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDCFData.discountedFCF.map((year) => (
                    <div key={year.year} className="flex justify-between items-center">
                      <span className="font-medium">{year.year}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">{year.discountFactor.toFixed(3)}</div>
                        <div className="text-xs text-muted-foreground">
                          PV: ${(year.discountedFCF / 1000000).toFixed(2)}M
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>DCF Valuation Bridge</CardTitle>
              <CardDescription>From FCF to Enterprise Value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span>Sum of PV of FCFs</span>
                  <span className="font-medium">$11.2M</span>
                </div>
                <div className="flex justify-between py-2 text-lg font-bold border-t">
                  <span>Terminal Value (PV)</span>
                  <span>$134.0M</span>
                </div>
                <div className="flex justify-between py-2 text-xl font-bold border-t border-b-2">
                  <span>Enterprise Value</span>
                  <span>${(mockDCFData.overview.enterpriseValue / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. Terminal Value Page */}
        <TabsContent value="terminal" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Gordon Growth vs Exit Multiple</CardTitle>
                <CardDescription>Comparison of terminal value methods</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockDCFData.terminalValueComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="method" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number / 1000000).toFixed(1)}M`, 'Terminal Value']} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Terminal Value Sensitivity</CardTitle>
                <CardDescription>Adjust key parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Terminal Growth Rate: {terminalGrowthSlider[0]}%</Label>
                  <Slider
                    value={terminalGrowthSlider}
                    onValueChange={setTerminalGrowthSlider}
                    max={4}
                    min={1}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Exit Multiple: {exitMultipleSlider[0]}x</Label>
                  <Slider
                    value={exitMultipleSlider}
                    onValueChange={setExitMultipleSlider}
                    max={12}
                    min={6}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <div className="text-sm font-medium">Updated Terminal Value</div>
                  <div className="text-2xl font-bold text-primary">
                    ${(98800000 * (terminalGrowthSlider[0] / 2.5) * (exitMultipleSlider[0] / 8) / 1000000).toFixed(1)}M
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 5. Sensitivity Analysis Page */}
        <TabsContent value="sensitivity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sensitivity Analysis</CardTitle>
              <CardDescription>Equity value sensitivity to WACC and terminal growth rate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label>WACC: {waccSlider[0]}%</Label>
                  <Slider
                    value={waccSlider}
                    onValueChange={setWaccSlider}
                    max={12}
                    min={7}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Terminal Growth: {terminalGrowthSlider[0]}%</Label>
                  <Slider
                    value={terminalGrowthSlider}
                    onValueChange={setTerminalGrowthSlider}
                    max={4}
                    min={0}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Sensitivity Matrix */}
              <div className="overflow-x-auto">
                <div className="text-sm font-medium mb-2">Equity Value Sensitivity Matrix ($M)</div>
                <table className="w-full text-xs border border-border">
                  <thead>
                    <tr>
                      <th className="border p-2 bg-muted">Growth \ WACC</th>
                      <th className="border p-2 bg-muted">7%</th>
                      <th className="border p-2 bg-muted">8%</th>
                      <th className="border p-2 bg-muted">9%</th>
                      <th className="border p-2 bg-muted">10%</th>
                      <th className="border p-2 bg-muted">11%</th>
                      <th className="border p-2 bg-muted">12%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensitivityData.map((row) => (
                      <tr key={row.growth}>
                        <td className="border p-2 bg-muted font-medium">{row.growth}%</td>
                        <td className="border p-2 text-center">{(row.wacc_7 / 1000000).toFixed(0)}</td>
                        <td className="border p-2 text-center">{(row.wacc_8 / 1000000).toFixed(0)}</td>
                        <td className="border p-2 text-center">{(row.wacc_9 / 1000000).toFixed(0)}</td>
                        <td className="border p-2 text-center">{(row.wacc_10 / 1000000).toFixed(0)}</td>
                        <td className="border p-2 text-center">{(row.wacc_11 / 1000000).toFixed(0)}</td>
                        <td className="border p-2 text-center">{(row.wacc_12 / 1000000).toFixed(0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 6. Assumptions Page */}
        <TabsContent value="assumptions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Operating Assumptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue Growth Rates</span>
                  </div>
                  {mockDCFData.assumptions.revenueGrowth.map((rate, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>Year {index + 1}</span>
                      <span>{rate}%</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Operating Margin (EBIT %)</span>
                  <span className="text-sm font-medium">{mockDCFData.assumptions.operatingMargin}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">CapEx % of Revenue</span>
                  <span className="text-sm font-medium">{mockDCFData.assumptions.capexPercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Working Capital % of Revenue</span>
                  <span className="text-sm font-medium">{mockDCFData.assumptions.wcPercent}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>WACC & Valuation Assumptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">WACC</span>
                  <span className="text-sm font-medium">{mockDCFData.assumptions.wacc}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tax Rate</span>
                  <span className="text-sm font-medium">{mockDCFData.assumptions.taxRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Terminal Growth Rate</span>
                  <span className="text-sm font-medium">{mockDCFData.assumptions.terminalGrowth}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Exit Multiple (EV/EBITDA)</span>
                  <span className="text-sm font-medium">{mockDCFData.assumptions.exitMultiple}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shares Outstanding</span>
                  <span className="text-sm font-medium">{(mockDCFData.overview.shares / 1000000).toFixed(1)}M</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Model Outputs Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Enterprise Value</div>
                  <div className="text-xl font-bold">${(mockDCFData.overview.enterpriseValue / 1000000).toFixed(0)}M</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Equity Value</div>
                  <div className="text-xl font-bold">${(mockDCFData.overview.equityValue / 1000000).toFixed(0)}M</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Price per Share</div>
                  <div className="text-xl font-bold">${mockDCFData.overview.sharePrice}</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Terminal Value</div>
                  <div className="text-xl font-bold">${(mockDCFData.overview.terminalValue / 1000000).toFixed(0)}M</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DCFDashboard;