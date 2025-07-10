import React, { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export interface ColumnMapping {
  excelColumn: string;
  mappedTo: string | null;
  dataType: 'text' | 'number' | 'currency' | 'percentage';
  isRequired: boolean;
}

interface ColumnMapperProps {
  columnMappings: ColumnMapping[];
  onMappingChange: (mappings: ColumnMapping[]) => void;
}

interface FinancialCategory {
  id: string;
  name: string;
  category: 'Income Statement' | 'Balance Sheet' | 'Cash Flow' | 'Assumptions';
  description: string;
  dataType: 'currency' | 'number' | 'percentage' | 'text';
  isRequired: boolean;
}

const financialCategories: FinancialCategory[] = [
  // Income Statement
  { id: 'revenue', name: 'Total Revenue', category: 'Income Statement', description: 'Total sales revenue', dataType: 'currency', isRequired: true },
  { id: 'cogs', name: 'Cost of Goods Sold', category: 'Income Statement', description: 'Direct costs of producing goods', dataType: 'currency', isRequired: true },
  { id: 'gross_profit', name: 'Gross Profit', category: 'Income Statement', description: 'Revenue minus COGS', dataType: 'currency', isRequired: false },
  { id: 'operating_expenses', name: 'Operating Expenses', category: 'Income Statement', description: 'General operating costs', dataType: 'currency', isRequired: true },
  { id: 'ebitda', name: 'EBITDA', category: 'Income Statement', description: 'Earnings before interest, taxes, depreciation', dataType: 'currency', isRequired: false },
  { id: 'depreciation', name: 'Depreciation & Amortization', category: 'Income Statement', description: 'Non-cash depreciation expense', dataType: 'currency', isRequired: true },
  { id: 'interest_expense', name: 'Interest Expense', category: 'Income Statement', description: 'Cost of debt financing', dataType: 'currency', isRequired: false },
  { id: 'tax_expense', name: 'Tax Expense', category: 'Income Statement', description: 'Income tax liability', dataType: 'currency', isRequired: false },
  { id: 'net_income', name: 'Net Income', category: 'Income Statement', description: 'Bottom line profit', dataType: 'currency', isRequired: true },

  // Balance Sheet
  { id: 'cash', name: 'Cash & Cash Equivalents', category: 'Balance Sheet', description: 'Liquid cash assets', dataType: 'currency', isRequired: true },
  { id: 'accounts_receivable', name: 'Accounts Receivable', category: 'Balance Sheet', description: 'Money owed by customers', dataType: 'currency', isRequired: false },
  { id: 'inventory', name: 'Inventory', category: 'Balance Sheet', description: 'Goods held for sale', dataType: 'currency', isRequired: false },
  { id: 'current_assets', name: 'Total Current Assets', category: 'Balance Sheet', description: 'Assets convertible to cash within 1 year', dataType: 'currency', isRequired: true },
  { id: 'ppe', name: 'Property, Plant & Equipment', category: 'Balance Sheet', description: 'Fixed assets', dataType: 'currency', isRequired: true },
  { id: 'total_assets', name: 'Total Assets', category: 'Balance Sheet', description: 'Sum of all assets', dataType: 'currency', isRequired: true },
  { id: 'accounts_payable', name: 'Accounts Payable', category: 'Balance Sheet', description: 'Money owed to suppliers', dataType: 'currency', isRequired: false },
  { id: 'current_liabilities', name: 'Total Current Liabilities', category: 'Balance Sheet', description: 'Debts due within 1 year', dataType: 'currency', isRequired: true },
  { id: 'long_term_debt', name: 'Long-term Debt', category: 'Balance Sheet', description: 'Debt due after 1 year', dataType: 'currency', isRequired: false },
  { id: 'total_liabilities', name: 'Total Liabilities', category: 'Balance Sheet', description: 'Sum of all liabilities', dataType: 'currency', isRequired: true },
  { id: 'shareholders_equity', name: "Shareholders' Equity", category: 'Balance Sheet', description: 'Ownership value', dataType: 'currency', isRequired: true },

  // Cash Flow
  { id: 'operating_cash_flow', name: 'Operating Cash Flow', category: 'Cash Flow', description: 'Cash from core business operations', dataType: 'currency', isRequired: true },
  { id: 'investing_cash_flow', name: 'Investing Cash Flow', category: 'Cash Flow', description: 'Cash from investments', dataType: 'currency', isRequired: false },
  { id: 'financing_cash_flow', name: 'Financing Cash Flow', category: 'Cash Flow', description: 'Cash from financing activities', dataType: 'currency', isRequired: false },
  { id: 'free_cash_flow', name: 'Free Cash Flow', category: 'Cash Flow', description: 'Cash available after investments', dataType: 'currency', isRequired: true },

  // Assumptions
  { id: 'revenue_growth_rate', name: 'Revenue Growth Rate', category: 'Assumptions', description: 'Annual revenue growth percentage', dataType: 'percentage', isRequired: true },
  { id: 'gross_margin', name: 'Gross Margin %', category: 'Assumptions', description: 'Gross profit as % of revenue', dataType: 'percentage', isRequired: true },
  { id: 'tax_rate', name: 'Tax Rate', category: 'Assumptions', description: 'Corporate tax rate', dataType: 'percentage', isRequired: true },
  { id: 'discount_rate', name: 'Discount Rate', category: 'Assumptions', description: 'Cost of capital for DCF', dataType: 'percentage', isRequired: false }
];

export const ColumnMapper: React.FC<ColumnMapperProps> = ({
  columnMappings,
  onMappingChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleMappingChange = (excelColumn: string, mappedTo: string | null) => {
    const newMappings = columnMappings.map(mapping => {
      if (mapping.excelColumn === excelColumn) {
        const category = mappedTo ? financialCategories.find(c => c.id === mappedTo) : null;
        return {
          ...mapping,
          mappedTo,
          dataType: category?.dataType || mapping.dataType,
          isRequired: category?.isRequired || false
        };
      }
      return mapping;
    });
    onMappingChange(newMappings);
  };

  const clearAllMappings = () => {
    const clearedMappings = columnMappings.map(mapping => ({
      ...mapping,
      mappedTo: null,
      isRequired: false
    }));
    onMappingChange(clearedMappings);
  };

  const autoMapColumns = () => {
    const newMappings = columnMappings.map(mapping => {
      // Simple auto-mapping logic based on column name similarity
      const columnName = mapping.excelColumn.toLowerCase();
      let bestMatch: FinancialCategory | null = null;

      for (const category of financialCategories) {
        const categoryName = category.name.toLowerCase();
        const categoryId = category.id.toLowerCase();
        
        if (columnName.includes(categoryId.replace('_', ' ')) || 
            columnName.includes(categoryName) ||
            categoryName.includes(columnName)) {
          bestMatch = category;
          break;
        }
      }

      return {
        ...mapping,
        mappedTo: bestMatch?.id || null,
        dataType: bestMatch?.dataType || mapping.dataType,
        isRequired: bestMatch?.isRequired || false
      };
    });
    onMappingChange(newMappings);
  };

  const categories = ['all', ...Array.from(new Set(financialCategories.map(c => c.category)))];
  const filteredCategories = selectedCategory === 'all' 
    ? financialCategories 
    : financialCategories.filter(c => c.category === selectedCategory);

  const mappedColumns = columnMappings.filter(m => m.mappedTo).length;
  const requiredMappings = financialCategories.filter(c => c.isRequired).length;
  const mappedRequired = columnMappings.filter(m => 
    m.mappedTo && financialCategories.find(c => c.id === m.mappedTo)?.isRequired
  ).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Mapped Columns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mappedColumns}</div>
            <p className="text-xs text-muted-foreground">
              of {columnMappings.length} total columns
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Required Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mappedRequired}</div>
            <p className="text-xs text-muted-foreground">
              of {requiredMappings} required fields mapped
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((mappedRequired / requiredMappings) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Required mappings complete
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button onClick={autoMapColumns} variant="outline">
          Auto Map Columns
        </Button>
        <Button onClick={clearAllMappings} variant="outline">
          Clear All Mappings
        </Button>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mapping Alert */}
      {mappedRequired < requiredMappings && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please map all required fields to proceed. {requiredMappings - mappedRequired} required fields are still unmapped.
          </AlertDescription>
        </Alert>
      )}

      {/* Column Mapping Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Excel Columns */}
        <Card>
          <CardHeader>
            <CardTitle>Excel Columns</CardTitle>
            <CardDescription>
              Columns found in your uploaded Excel file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {columnMappings.map((mapping, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{mapping.excelColumn}</p>
                      <p className="text-sm text-muted-foreground">
                        Type: {mapping.dataType}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={mapping.mappedTo || ''}
                      onValueChange={(value) => handleMappingChange(mapping.excelColumn, value || null)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select mapping" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No mapping</SelectItem>
                        {filteredCategories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center gap-2">
                              <span>{category.name}</span>
                              {category.isRequired && (
                                <Badge variant="destructive" className="text-xs">Required</Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Categories</CardTitle>
            <CardDescription>
              Available financial statement line items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.slice(1).map(category => {
                const categoryItems = financialCategories.filter(c => c.category === category);
                const mappedItems = categoryItems.filter(item => 
                  columnMappings.some(m => m.mappedTo === item.id)
                );
                
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{category}</h4>
                      <Badge variant="outline">
                        {mappedItems.length}/{categoryItems.length} mapped
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {categoryItems.map(item => {
                        const isMapped = columnMappings.some(m => m.mappedTo === item.id);
                        
                        return (
                          <div 
                            key={item.id} 
                            className={`p-2 border rounded ${isMapped ? 'bg-green-50 border-green-200' : 'bg-muted/50'}`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {item.isRequired && (
                                  <Badge variant="destructive" className="text-xs">Required</Badge>
                                )}
                                {isMapped && (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {category !== categories[categories.length - 1] && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mapping Status */}
      {mappedRequired >= requiredMappings && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            All required fields have been mapped! You can proceed to the next step.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};