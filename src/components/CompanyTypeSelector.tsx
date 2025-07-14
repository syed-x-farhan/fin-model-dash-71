
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  ShoppingCart, 
  Laptop, 
  Factory, 
  Stethoscope, 
  GraduationCap
} from 'lucide-react';

const companyTypes = [
  {
    id: 'saas',
    name: 'SaaS / Software',
    description: 'Software as a Service, subscription-based technology companies',
    icon: Laptop,
    characteristics: ['Recurring Revenue', 'High Margins', 'Scalable Growth'],
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
    variables: {
      'Student Enrollment': 500,
      'Tuition per Student': 5000,
      'Student Retention Rate': 90,
      'Teacher to Student Ratio': 0.1,
      'Content Development Cost': 100000
    }
  }
];

interface CompanyTypeSelectorProps {
  onCompanyTypeSelect: (companyType: string) => void;
}

export function CompanyTypeSelector({ onCompanyTypeSelect }: CompanyTypeSelectorProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Select Your Company Type
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Choose the business model that best describes your company. 
          We'll pre-configure the financial model with industry-specific variables and assumptions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {companyTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <Card 
              key={type.id} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border-border bg-card hover:bg-accent/5"
              onClick={() => onCompanyTypeSelect(type.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg text-card-foreground">
                  {type.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {type.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-card-foreground mb-2">Key Characteristics</h4>
                  <div className="flex flex-wrap gap-2">
                    {type.characteristics.map((char, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="text-xs"
                      >
                        {char}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-card-foreground mb-2">Pre-configured Variables</h4>
                  <div className="space-y-1">
                    {Object.entries(type.variables).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="text-xs text-muted-foreground flex justify-between">
                        <span>{key}</span>
                        <span>{typeof value === 'number' && value > 1000 ? `${(value / 1000).toFixed(0)}k` : value}%</span>
                      </div>
                    ))}
                    {Object.keys(type.variables).length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{Object.keys(type.variables).length - 3} more variables
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCompanyTypeSelect(type.id);
                  }}
                >
                  Select {type.name}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Card className="max-w-md mx-auto border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Custom Configuration</CardTitle>
            <CardDescription className="text-muted-foreground">
              Don't see your business model? Start with a blank template.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onCompanyTypeSelect('custom')}
            >
              Start with Blank Template
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
