
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Factory, Store, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { WorkflowStepper } from './WorkflowStepper';

const companyTypes = [
  {
    id: 'technology',
    name: 'Technology',
    description: 'Software, SaaS, Tech Hardware',
    icon: Building2,
    examples: ['Software Companies', 'SaaS Platforms', 'Tech Hardware', 'Digital Services']
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Production, Industrial, Materials',
    icon: Factory,
    examples: ['Industrial Manufacturing', 'Consumer Goods', 'Materials & Chemicals', 'Automotive']
  },
  {
    id: 'retail',
    name: 'Retail & Consumer',
    description: 'Retail, E-commerce, Consumer Goods',
    icon: Store,
    examples: ['Retail Chains', 'E-commerce', 'Consumer Products', 'Food & Beverage']
  },
  {
    id: 'services',
    name: 'Professional Services',
    description: 'Consulting, Financial, Healthcare',
    icon: Users,
    examples: ['Consulting', 'Financial Services', 'Healthcare', 'Professional Services']
  }
];

const workflowSteps = [
  { id: 'model', title: 'Model' },
  { id: 'company-type', title: 'Company Type' },
  { id: 'variables', title: 'Variables' },
  { id: 'statements', title: 'Statements' },
  { id: 'dashboard', title: 'Dashboard' }
];

export function CompanyTypeSelector() {
  const { modelId } = useParams<{ modelId: string }>();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const modelName = modelId === 'corporate' ? 'Corporate Financial Model' : 'Startup Financial Model';

  const handleContinue = () => {
    if (selectedType) {
      navigate(`/model/${modelId}/variables?companyType=${selectedType}`);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header with Workflow */}
        <div className="mb-8">
          <WorkflowStepper 
            steps={workflowSteps}
            currentStep="company-type"
            completedSteps={['model']}
            className="mb-8"
          />
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {modelName}
            </h1>
            <p className="text-gray-600">
              Select your company type to customize the financial model variables
            </p>
          </div>
        </div>

        {/* Company Type Selection */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {companyTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = selectedType === type.id;
              
              return (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className={`text-xl ${
                          isSelected ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {type.name}
                        </CardTitle>
                        <CardDescription className={
                          isSelected ? 'text-blue-700' : 'text-gray-600'
                        }>
                          {type.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Examples:</p>
                      <div className="grid grid-cols-2 gap-1">
                        {type.examples.map((example, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            • {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Models
            </Button>
            
            <Button 
              onClick={handleContinue}
              disabled={!selectedType}
              className="flex items-center bg-blue-600 hover:bg-blue-700"
            >
              Continue to Variables
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
