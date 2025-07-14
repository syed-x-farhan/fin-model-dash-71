
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  ShoppingCart, 
  Laptop, 
  Factory, 
  Stethoscope, 
  GraduationCap,
  ArrowLeft
} from 'lucide-react';

const companyTypes = [
  {
    id: 'saas',
    name: 'SaaS / Software',
    description: 'Software as a Service, subscription-based technology companies',
    icon: Laptop,
    characteristics: ['Recurring Revenue', 'High Margins', 'Scalable Growth'],
    color: 'from-blue-500 to-cyan-500',
    variables: {
      'Monthly Recurring Revenue': 50000,
      'Customer Acquisition Cost': 500,
      'Customer Lifetime Value': 5000,
      'Churn Rate': 5,
      'Gross Margin': 85
    }
  },
  {
    id: 'retail',
    name: 'Retail / E-commerce',
    description: 'Physical or online retail businesses selling products to consumers',
    icon: ShoppingCart,
    characteristics: ['Inventory Management', 'Seasonal Patterns', 'Volume-based'],
    color: 'from-green-500 to-emerald-500',
    variables: {
      'Average Order Value': 75,
      'Inventory Turnover': 6,
      'Gross Margin': 45,
      'Customer Acquisition Cost': 25,
      'Conversion Rate': 2.5
    }
  },
  {
    id: 'service',
    name: 'Professional Services',
    description: 'Consulting, agencies, and other professional service providers',
    icon: Building2,
    characteristics: ['Labor-intensive', 'Project-based', 'Expertise-driven'],
    color: 'from-purple-500 to-violet-500',
    variables: {
      'Billable Hours per Employee': 1800,
      'Average Hourly Rate': 150,
      'Utilization Rate': 75,
      'Employee Overhead': 80000,
      'Project Margin': 65
    }
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Companies that produce physical goods and products',
    icon: Factory,
    characteristics: ['Capital Intensive', 'Fixed Costs', 'Supply Chain'],
    color: 'from-orange-500 to-red-500',
    variables: {
      'Production Capacity': 100000,
      'Material Cost per Unit': 15,
      'Labor Cost per Unit': 8,
      'Fixed Manufacturing Overhead': 500000,
      'Capacity Utilization': 80
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Medical practices, healthcare services, and medical technology',
    icon: Stethoscope,
    characteristics: ['Regulated Industry', 'Insurance-based', 'Compliance-heavy'],
    color: 'from-teal-500 to-cyan-500',
    variables: {
      'Patients per Month': 1200,
      'Average Revenue per Patient': 250,
      'Insurance Reimbursement Rate': 85,
      'Medical Equipment Depreciation': 50000,
      'Staff to Patient Ratio': 0.3
    }
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Educational institutions, online learning, and training companies',
    icon: GraduationCap,
    characteristics: ['Enrollment-based', 'Seasonal Revenue', 'Content-driven'],
    color: 'from-indigo-500 to-purple-500',
    variables: {
      'Student Enrollment': 500,
      'Tuition per Student': 5000,
      'Student Retention Rate': 90,
      'Teacher to Student Ratio': 0.1,
      'Content Development Cost': 100000
    }
  }
];

const CompanyTypeSelection = () => {
  const navigate = useNavigate();
  const { modelId } = useParams<{ modelId: string }>();

  const handleCompanyTypeSelect = (companyType: string) => {
    // Navigate to model configuration with company type
    navigate(`/model/${modelId}/configure?companyType=${companyType}`);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Models
          </Button>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Select Your Company Type
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Choose the business model that best describes your company. 
            We'll pre-configure the financial model with industry-specific variables and assumptions.
          </p>
        </div>

        {/* Company Type Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {companyTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card 
                key={type.id} 
                className="bg-slate-800/80 border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer group"
                onClick={() => handleCompanyTypeSelect(type.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${type.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                    {type.name}
                  </CardTitle>
                  <CardDescription className="text-slate-300 leading-relaxed">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Characteristics */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 mb-2">Key Characteristics</h4>
                    <div className="flex flex-wrap gap-2">
                      {type.characteristics.map((char, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-slate-700 text-slate-200 text-xs"
                        >
                          {char}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Sample Variables */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 mb-2">Pre-configured Variables</h4>
                    <div className="space-y-1">
                      {Object.entries(type.variables).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="text-xs text-slate-400 flex justify-between">
                          <span>{key}</span>
                          <span className="text-slate-300">{typeof value === 'number' && value > 1000 ? `${(value / 1000).toFixed(0)}k` : value}%</span>
                        </div>
                      ))}
                      {Object.keys(type.variables).length > 3 && (
                        <div className="text-xs text-slate-500">
                          +{Object.keys(type.variables).length - 3} more variables
                        </div>
                      )}
                    </div>
                  </div>

                  <Button 
                    className={`w-full bg-gradient-to-r ${type.color} hover:opacity-90 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompanyTypeSelect(type.id);
                    }}
                  >
                    Select {type.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Custom Option */}
        <div className="mt-12 text-center">
          <Card className="bg-slate-800/50 border-slate-700 max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-white">Custom Configuration</CardTitle>
              <CardDescription className="text-slate-300">
                Don't see your business model? Start with a blank template.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={() => handleCompanyTypeSelect('custom')}
              >
                Start with Blank Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyTypeSelection;
