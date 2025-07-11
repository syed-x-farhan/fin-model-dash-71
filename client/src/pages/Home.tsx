
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const model = {
  id: '3-statement',
  name: '3-Statement Model',
  description: 'Integrated Income Statement, Balance Sheet, and Cash Flow Statement projections',
  icon: BarChart3,
  complexity: 'Intermediate',
  timeEstimate: '15-30 min',
  color: 'from-blue-500 to-cyan-500'
};

const Home = () => {
  const navigate = useNavigate();

  const handleModelSelect = () => {
    navigate('/model/3-statement/configure');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Financial Modeling Suite
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Professional-grade 3-Statement financial modeling to power your investment decisions. 
            Build comprehensive financial projections with integrated Income Statement, Balance Sheet, 
            and Cash Flow Statement analysis.
          </p>
        </div>

        {/* Model Card */}
        <div className="flex justify-center max-w-2xl mx-auto">
          <Card 
            className="bg-slate-800/80 border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer group w-full"
            onClick={handleModelSelect}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${model.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                    {model.complexity}
                  </Badge>
                  <span className="text-sm text-slate-400">{model.timeEstimate}</span>
                </div>
              </div>
              <CardTitle className="text-2xl text-white mt-4 group-hover:text-blue-400 transition-colors">
                {model.name}
              </CardTitle>
              <CardDescription className="text-slate-300 text-base leading-relaxed">
                {model.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handleModelSelect();
                }}
              >
                Configure Model
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">3-Statement Model Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Income Statement</h3>
              <p className="text-slate-300">Comprehensive revenue, expense, and profitability projections with detailed line items and growth assumptions.</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Balance Sheet</h3>
              <p className="text-slate-300">Integrated asset, liability, and equity modeling with automatic balancing and working capital analysis.</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Cash Flow</h3>
              <p className="text-slate-300">Operating, investing, and financing cash flow projections with free cash flow calculations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
