
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Rocket, Building2, Users, ArrowRight } from 'lucide-react';

const models = [
  {
    id: 'corporate',
    name: 'Corporate Financial Model',
    description: 'Integrated 3-Statement Model with DCF Valuation - Complete financial analysis for established businesses',
    icon: Building2,
    features: ['Income Statement', 'Balance Sheet', 'Cash Flow Statement', 'DCF Valuation', 'Scenario Analysis'],
    complexity: 'Advanced',
    timeEstimate: '30-45 min',
    color: 'from-blue-500 to-indigo-600',
    badge: 'Most Popular'
  },
  {
    id: 'startup',
    name: 'Startup Financial Model',
    description: 'Growth-focused projections for early-stage companies with specialized startup metrics',
    icon: Rocket,
    features: ['Revenue Projections', 'Burn Rate Analysis', 'Runway Calculation', 'Unit Economics', 'Fundraising Planning'],
    complexity: 'Intermediate',
    timeEstimate: '20-30 min',
    color: 'from-emerald-500 to-teal-600',
    badge: 'Growth Focused'
  }
];

const workflowSteps = [
  { step: 1, title: 'Select Model', description: 'Choose your financial model type', icon: BarChart3 },
  { step: 2, title: 'Company Details', description: 'Define company type & industry', icon: Building2 },
  { step: 3, title: 'Input Variables', description: 'Configure financial assumptions', icon: TrendingUp },
  { step: 4, title: 'Financial Statements', description: 'Review generated statements', icon: Users },
  { step: 5, title: 'Dashboard & Analysis', description: 'Explore insights & scenarios', icon: Rocket }
];

const Home = () => {
  const navigate = useNavigate();

  const handleModelSelect = (modelId: string) => {
    navigate(`/model/${modelId}/company-type`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Financial Modeling Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Build comprehensive financial models with integrated statements and valuation analysis. 
            Choose from our streamlined model options designed for different business stages.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Simple 5-Step Process
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            {workflowSteps.map((step, index) => (
              <div key={step.step} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-full border-2 border-blue-500 flex items-center justify-center mb-2">
                    <step.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500 max-w-20">{step.description}</div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-gray-400 ml-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Model Selection */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Choose Your Financial Model
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {models.map((model) => {
              const IconComponent = model.icon;
              return (
                <Card 
                  key={model.id} 
                  className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group relative overflow-hidden"
                  onClick={() => handleModelSelect(model.id)}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${model.color}`} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${model.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                          {model.badge}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {model.complexity}
                        </Badge>
                        <span className="text-sm text-gray-500">{model.timeEstimate}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {model.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {model.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Includes:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {model.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${model.color} hover:opacity-90 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModelSelect(model.id);
                      }}
                    >
                      Start Building Model
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrated Analysis</h3>
              <p className="text-gray-600">Complete financial statements automatically generate from your inputs with built-in DCF valuation.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Updates</h3>
              <p className="text-gray-600">See your model outputs update instantly with interactive charts and scenario analysis.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Grade</h3>
              <p className="text-gray-600">Built with industry-standard methodologies used by top investment banks and consulting firms.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
