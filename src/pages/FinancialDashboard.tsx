import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle, Trash2, Calculator, TrendingUp, DollarSign, BarChart3, Activity, ChevronDown, Play, Building2, Laptop, Home, Factory, FileText, TrendingDown, Plus, Edit3, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import organized model configurations
import { MODEL_CONFIGS, ModelId, getModelConfig, isValidModelId } from '@/config/models';
import { Variable, VariableSection } from '@/config/models/threeStatementConfig';

// Keep existing import statements for dashboard components
import ThreeStatementDashboard from '@/components/dashboards/ThreeStatementDashboard';
import DCFDashboard from '@/components/dashboards/DCFDashboard';
import LBODashboard from '@/components/dashboards/LBODashboard';
import StartupDashboard from '@/components/dashboards/StartupDashboard';

// Import Excel components
import { ImportWizard } from '@/components/excel/ImportWizard';
import { RowData, ColumnMapping } from '@/components/excel/DataPreviewTable';

/**
 * Form Data Interface for Variable Creation
 * This matches the Variable interface exactly to avoid type conflicts
 */
interface VariableFormData {
  name: string;
  value: number;
  input_type: 'percentage' | 'fixed' | 'formula';
  category: string;
  applies_to: 'income_statement' | 'balance_sheet' | 'cash_flow';
  description?: string;
  unit?: string;
  relative_to?: string;
}

// UI Configuration Options
const INPUT_TYPE_OPTIONS = [
  { value: 'percentage', label: 'Percentage' },
  { value: 'fixed', label: 'Fixed Amount' },
  { value: 'formula', label: 'Formula' }
];

const CATEGORY_OPTIONS = [
  { value: 'revenue', label: 'Revenue' },
  { value: 'expense', label: 'Expense' },
  { value: 'tax', label: 'Tax' },
  { value: 'capex', label: 'Capital Expenditure' },
  { value: 'working_capital', label: 'Working Capital' },
  { value: 'depreciation', label: 'Depreciation' },
  { value: 'interest', label: 'Interest' }
];

const APPLIES_TO_OPTIONS = [
  { value: 'income_statement', label: 'Income Statement' },
  { value: 'balance_sheet', label: 'Balance Sheet' },
  { value: 'cash_flow', label: 'Cash Flow' }
];

const RELATIVE_TO_OPTIONS = [
  { value: 'revenue', label: 'Revenue' },
  { value: 'gross_profit', label: 'Gross Profit' },
  { value: 'ebit', label: 'EBIT' },
  { value: 'ebitda', label: 'EBITDA' },
  { value: 'pre_tax_income', label: 'Pre-tax Income' },
  { value: 'net_income', label: 'Net Income' }
];

/**
 * Main Financial Dashboard Component
 * 
 * This component orchestrates the entire financial modeling experience.
 * It's organized to be backend-friendly with clear separation of concerns:
 * 
 * 1. Model Selection - Handled by AppSidebar
 * 2. Variable Configuration - Model-specific variable sections
 * 3. Dashboard Display - Model-specific dashboard components
 * 4. Data Management - Ready for FastAPI integration
 */
export default function FinancialDashboard() {
  const { toast } = useToast();
  
  // State Management - Backend Integration Points
  const [selectedModel, setSelectedModel] = useState<ModelId | null>(null);
  const [variableSections, setVariableSections] = useState<VariableSection[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  // UI State for Variable Management
  const [newVariableName, setNewVariableName] = useState('');
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [isAddingVariable, setIsAddingVariable] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showImportWizard, setShowImportWizard] = useState(false);

  // Form Management for Adding Variables - Fixed Type Definition
  const addVariableForm = useForm<VariableFormData>({
    defaultValues: {
      name: '',
      value: 0,
      input_type: 'fixed',
      category: 'revenue',
      applies_to: 'income_statement',
      description: '',
      unit: '$'
    }
  });

  /**
   * Handle Model Selection
   * Backend Integration: This will trigger API calls to load model-specific data
   * API Endpoint: GET /api/v1/models/{model_id}/variables
   */
  const handleModelSelect = (modelId: string) => {
    if (!isValidModelId(modelId)) {
      console.error(`Invalid model ID: ${modelId}`);
      return;
    }
    
    console.log(`Selecting model: ${modelId}`);
    setSelectedModel(modelId);
    
    // Load model-specific variables from configuration
    const modelConfig = getModelConfig(modelId);
    setVariableSections(modelConfig.variables);
    setShowResults(false);
    
    // TODO: Backend Integration - Load saved variables from API
    // const savedVariables = await fetchModelVariables(modelId);
    // if (savedVariables) setVariableSections(savedVariables);
  };

  /**
   * Handle Variable Addition
   * Backend Integration: POST /api/v1/models/{model_id}/variables
   */
  const handleAddVariable = (sectionId: string) => {
    if (newVariableName.trim()) {
      const newVariable: Variable = {
        id: Date.now().toString(),
        name: newVariableName,
        value: 0,
        input_type: 'fixed',
        category: 'revenue',
        applies_to: 'income_statement',
        unit: '%',
      };
      
      setVariableSections(sections =>
        sections.map(section =>
          section.id === sectionId
            ? { ...section, variables: [...section.variables, newVariable] }
            : section
        )
      );
      setNewVariableName('');
      
      // TODO: Backend Integration - Save new variable to API
      // await saveVariable(selectedModel, sectionId, newVariable);
    }
  };

  /**
   * Handle Variable Removal
   * Backend Integration: DELETE /api/v1/models/{model_id}/variables/{variable_id}
   */
  const handleRemoveVariable = (sectionId: string, variableId: string) => {
    setVariableSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? { ...section, variables: section.variables.filter(v => v.id !== variableId) }
          : section
      )
    );
    
    // TODO: Backend Integration - Remove variable from API
    // await deleteVariable(selectedModel, sectionId, variableId);
  };

  /**
   * Handle Variable Value Changes
   * Backend Integration: PUT /api/v1/models/{model_id}/variables/{variable_id}
   */
  const handleVariableChange = (sectionId: string, variableId: string, value: number) => {
    setVariableSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              variables: section.variables.map(variable =>
                variable.id === variableId ? { ...variable, value } : variable
              )
            }
          : section
      )
    );
    
    // TODO: Backend Integration - Update variable value in API
    // await updateVariableValue(selectedModel, sectionId, variableId, value);
  };

  /**
   * Handle Excel Import
   */
  const handleImportComplete = async (data: RowData[], mappings: ColumnMapping[]) => {
    try {
      // Process imported data and update variables
      const updatedSections = [...variableSections];
      
      data.forEach(row => {
        const nameMapping = mappings.find(m => m.targetField === 'name');
        const valueMapping = mappings.find(m => m.targetField === 'value');
        
        if (nameMapping && valueMapping && row[nameMapping.sourceColumn] && row[valueMapping.sourceColumn]) {
          const variableName = String(row[nameMapping.sourceColumn]).toLowerCase().replace(/\s+/g, '-');
          const value = parseFloat(String(row[valueMapping.sourceColumn])) || 0;
          
          // Find matching variable by name similarity across all sections
          updatedSections.forEach(section => {
            const matchingVariable = section.variables.find(variable => 
              variable.name.toLowerCase().includes(variableName) || 
              variableName.includes(variable.name.toLowerCase().replace(/\s+/g, '-'))
            );
            
            if (matchingVariable) {
              matchingVariable.value = value;
            }
          });
        }
      });
      
      setVariableSections(updatedSections);
      setShowImportWizard(false);
      
      toast({
        title: "Import Successful",
        description: `Imported ${data.length} rows of financial data.`
      });
    } catch (error) {
      console.error('Import failed:', error);
      toast({
        title: "Import Failed",
        description: "There was an error importing your data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleImportCancel = () => {
    setShowImportWizard(false);
  };

  /**
   * Get Model Display Information
   */
  const getModelName = () => {
    return selectedModel ? MODEL_CONFIGS[selectedModel].info.name : '';
  };

  const getModelDescription = () => {
    return selectedModel ? MODEL_CONFIGS[selectedModel].info.description : '';
  };

  /**
   * Render Model-Specific Dashboard
   * Each model has its own dashboard component for better organization
   */
  const renderModelDashboard = () => {
    if (!selectedModel || !showResults) return null;

    switch (selectedModel) {
      case '3-statement':
        return <ThreeStatementDashboard />;
      case 'dcf':
        return <DCFDashboard />;
      case 'lbo':
        return <LBODashboard />;
      case 'startup':
        return <StartupDashboard />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground">{getModelName()} Results</h1>
              <p className="text-muted-foreground">Financial analysis and projections dashboard</p>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar - Model Selection */}
        <AppSidebar selectedModel={selectedModel} onModelSelect={handleModelSelect} />
        
        <SidebarInset className="flex-1">
          {/* Header - Model Information and Actions */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">{getModelName()}</h1>
              <p className="text-sm text-muted-foreground">{getModelDescription()}</p>
            </div>
            {selectedModel && !showResults && (
              <Button 
                onClick={() => setShowResults(true)}
                className="ml-auto flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Calculate Model
              </Button>
            )}
          </header>

          {/* Main Content Area */}
          {!selectedModel ? (
            // Welcome Screen
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Welcome to Financial Modeling Suite
                </h2>
                <p className="text-muted-foreground">
                  Select a financial model from the sidebar to get started
                </p>
              </div>
            </div>
          ) : !showResults ? (
            // Variable Configuration Screen
            <div className="flex-1 p-6">
              <div className="max-w-7xl mx-auto">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">Model Variables</h2>
                    <Dialog open={showImportWizard} onOpenChange={setShowImportWizard}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <Upload className="h-4 w-4" />
                          Import from Excel
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl h-[90vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>Import Financial Data</DialogTitle>
                          <DialogDescription>
                            Upload and map your Excel data to populate the model variables
                          </DialogDescription>
                        </DialogHeader>
                        <ImportWizard
                          onImportComplete={handleImportComplete}
                          onCancel={handleImportCancel}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Variable Sections Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {variableSections.map((section) => {
                      const IconComponent = section.icon;
                      return (
                        <Card key={section.id} className="h-fit">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                              <IconComponent className="h-5 w-5" />
                              {section.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Variable List */}
                            <div className="space-y-3">
                              {section.variables.map((variable) => (
                                <div key={variable.id} className="flex items-center gap-2">
                                  <div className="flex-1">
                                    <Label htmlFor={variable.id} className="text-xs text-muted-foreground">
                                      {variable.name}
                                    </Label>
                                    <div className="flex items-center gap-1 mt-1">
                                      <Input
                                        id={variable.id}
                                        type="number"
                                        value={variable.value}
                                        onChange={(e) => handleVariableChange(
                                          section.id, 
                                          variable.id, 
                                          parseFloat(e.target.value) || 0
                                        )}
                                        className="h-8 text-xs"
                                      />
                                      {variable.unit && (
                                        <span className="text-xs text-muted-foreground min-w-fit">
                                          {variable.unit}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveVariable(section.id, variable.id)}
                                    className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>

                            {/* Add Variable Button and Dialog */}
                            <div className="border-t pt-3">
                              <Dialog open={isAddingVariable && activeSection === section.id} onOpenChange={(open) => {
                                setIsAddingVariable(open);
                                if (open) setActiveSection(section.id);
                                else setActiveSection(null);
                              }}>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                    onClick={() => {
                                      setActiveSection(section.id);
                                      setIsAddingVariable(true);
                                    }}
                                  >
                                    <Plus className="h-3 w-3 mr-2" />
                                    Add Variable
                                  </Button>
                                </DialogTrigger>
                                
                                {/* Add Variable Dialog Content - Fixed Form Handling */}
                                <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Add Variable to {section.title}</DialogTitle>
                                    <DialogDescription className="text-gray-600">
                                      Configure a new variable with metadata for proper categorization
                                    </DialogDescription>
                                  </DialogHeader>
                                  <Form {...addVariableForm}>
                                    <form onSubmit={addVariableForm.handleSubmit((data: VariableFormData) => {
                                      const newVariable: Variable = {
                                        ...data,
                                        id: Date.now().toString(),
                                      };
                                      setVariableSections(sections =>
                                        sections.map(s =>
                                          s.id === section.id
                                            ? { ...s, variables: [...s.variables, newVariable] }
                                            : s
                                        )
                                      );
                                      setIsAddingVariable(false);
                                      setActiveSection(null);
                                      addVariableForm.reset();
                                      toast({
                                        title: "Variable Added",
                                        description: `"${data.name}" has been added to ${section.title}.`
                                      });
                                    })} className="space-y-6">
                                      <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                          control={addVariableForm.control}
                                          name="name"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Variable Name</FormLabel>
                                              <FormControl>
                                                <Input {...field} className="bg-gray-50 border-gray-300 text-gray-900" placeholder="Enter variable name" />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={addVariableForm.control}
                                          name="value"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Value</FormLabel>
                                              <FormControl>
                                                <Input 
                                                  type="number" 
                                                  {...field} 
                                                  value={field.value || 0}
                                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                  className="bg-gray-50 border-gray-300 text-gray-900" 
                                                  placeholder="0"
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                          control={addVariableForm.control}
                                          name="input_type"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Input Type</FormLabel>
                                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900">
                                                    <SelectValue placeholder="Select input type" />
                                                  </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-white border-gray-200">
                                                  {INPUT_TYPE_OPTIONS.map((option) => (
                                                    <SelectItem key={option.value} value={option.value} className="text-gray-900 hover:bg-gray-100">
                                                      {option.label}
                                                    </SelectItem>
                                                  ))}
                                                </SelectContent>
                                              </Select>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={addVariableForm.control}
                                          name="category"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Category</FormLabel>
                                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900">
                                                    <SelectValue placeholder="Select category" />
                                                  </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-white border-gray-200">
                                                  {CATEGORY_OPTIONS.map((option) => (
                                                    <SelectItem key={option.value} value={option.value} className="text-gray-900 hover:bg-gray-100">
                                                      {option.label}
                                                    </SelectItem>
                                                  ))}
                                                </SelectContent>
                                              </Select>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                          control={addVariableForm.control}
                                          name="applies_to"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Applies To</FormLabel>
                                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900">
                                                    <SelectValue placeholder="Select statement" />
                                                  </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-white border-gray-200">
                                                  {APPLIES_TO_OPTIONS.map((option) => (
                                                    <SelectItem key={option.value} value={option.value} className="text-gray-900 hover:bg-gray-100">
                                                      {option.label}
                                                    </SelectItem>
                                                  ))}
                                                </SelectContent>
                                              </Select>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        {addVariableForm.watch('input_type') === 'percentage' && (
                                          <FormField
                                            control={addVariableForm.control}
                                            name="relative_to"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Relative To</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value || ''}>
                                                  <FormControl>
                                                    <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900">
                                                      <SelectValue placeholder="Select base value" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent className="bg-white border-gray-200">
                                                    {RELATIVE_TO_OPTIONS.map((option) => (
                                                      <SelectItem key={option.value} value={option.value} className="text-gray-900 hover:bg-gray-100">
                                                        {option.label}
                                                      </SelectItem>
                                                    ))}
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        )}
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                          control={addVariableForm.control}
                                          name="unit"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Unit</FormLabel>
                                              <FormControl>
                                                <Input {...field} value={field.value || ''} className="bg-gray-50 border-gray-300 text-gray-900" placeholder="e.g., $, %, months" />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={addVariableForm.control}
                                          name="description"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Description (Optional)</FormLabel>
                                              <FormControl>
                                                <Input {...field} value={field.value || ''} className="bg-gray-50 border-gray-300 text-gray-900" placeholder="Enter description" />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>

                                      <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => {
                                          setIsAddingVariable(false);
                                          setActiveSection(null);
                                        }} className="bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200">
                                          Cancel
                                        </Button>
                                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                                          Add Variable
                                        </Button>
                                      </DialogFooter>
                                    </form>
                                  </Form>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Dashboard Results Screen
            renderModelDashboard()
          )}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
