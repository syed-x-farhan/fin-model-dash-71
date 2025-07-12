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

// Import Excel components
import { ImportWizard } from '@/components/excel/ImportWizard';
import { RowData, ColumnMapping } from '@/components/excel/DataPreviewTable';

/**
 * =============================================================================
 * BACKEND INTEGRATION CONFIGURATION FOR FASTAPI
 * =============================================================================
 * 
 * API Base URL Configuration:
 * - Development: http://localhost:8000/api/v1
 * - Production: https://your-api-domain.com/api/v1
 * 
 * Required FastAPI Endpoints to Implement:
 * 
 * 1. MODEL MANAGEMENT ENDPOINTS:
 *    GET    /api/v1/models                     - Get all available models
 *    GET    /api/v1/models/{model_id}          - Get specific model info
 *    POST   /api/v1/models/{model_id}/calculate - Run model calculations
 * 
 * 2. VARIABLE MANAGEMENT ENDPOINTS:
 *    GET    /api/v1/models/{model_id}/variables        - Get model variables
 *    POST   /api/v1/models/{model_id}/variables        - Create new variable
 *    PUT    /api/v1/models/{model_id}/variables/{var_id} - Update variable
 *    DELETE /api/v1/models/{model_id}/variables/{var_id} - Delete variable
 * 
 * 3. DASHBOARD DATA ENDPOINTS:
 *    GET    /api/v1/models/{model_id}/dashboard         - Get dashboard data
 *    GET    /api/v1/models/{model_id}/results          - Get calculation results
 * 
 * 4. IMPORT/EXPORT ENDPOINTS:
 *    POST   /api/v1/models/{model_id}/import           - Import Excel data
 *    GET    /api/v1/models/{model_id}/export           - Export to Excel
 * 
 * 5. USER MANAGEMENT (if authentication needed):
 *    POST   /api/v1/auth/login                         - User login
 *    POST   /api/v1/auth/logout                        - User logout
 *    GET    /api/v1/auth/me                           - Get current user
 */

// Backend API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

/**
 * API Service Functions for FastAPI Backend Integration
 * Replace the mock implementations below with actual API calls
 */
const apiService = {
  // Model Management API Calls
  async getModels() {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/models`);
    // return await response.json();
    console.log('API Call: GET /models - Fetching available models');
    return Promise.resolve(Object.keys(MODEL_CONFIGS));
  },

  async getModelById(modelId: string) {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/models/${modelId}`);
    // return await response.json();
    console.log(`API Call: GET /models/${modelId} - Fetching model details`);
    return Promise.resolve(getModelConfig(modelId as ModelId));
  },

  // Variable Management API Calls
  async getModelVariables(modelId: string) {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/models/${modelId}/variables`);
    // return await response.json();
    console.log(`API Call: GET /models/${modelId}/variables - Fetching model variables`);
    const config = getModelConfig(modelId as ModelId);
    return Promise.resolve(config.variables);
  },

  async createVariable(modelId: string, sectionId: string, variable: Variable) {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/models/${modelId}/variables`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ sectionId, variable })
    // });
    // return await response.json();
    console.log(`API Call: POST /models/${modelId}/variables - Creating variable:`, variable);
    return Promise.resolve(variable);
  },

  async updateVariable(modelId: string, sectionId: string, variableId: string, value: number) {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/models/${modelId}/variables/${variableId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ sectionId, value })
    // });
    // return await response.json();
    console.log(`API Call: PUT /models/${modelId}/variables/${variableId} - Updating variable value:`, value);
    return Promise.resolve({ variableId, value });
  },

  async deleteVariable(modelId: string, sectionId: string, variableId: string) {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/models/${modelId}/variables/${variableId}`, {
    //   method: 'DELETE'
    // });
    // return await response.json();
    console.log(`API Call: DELETE /models/${modelId}/variables/${variableId} - Deleting variable`);
    return Promise.resolve({ success: true });
  },

  // Model Calculation API Calls
  async calculateModel(modelId: string, variables: VariableSection[]) {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/models/${modelId}/calculate`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ variables })
    // });
    // return await response.json();
    console.log(`API Call: POST /models/${modelId}/calculate - Running calculations with variables:`, variables);
    return Promise.resolve({ calculationId: Date.now(), status: 'completed' });
  },

  // Dashboard Data API Calls
  async getDashboardData(modelId: string) {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/models/${modelId}/dashboard`);
    // return await response.json();
    console.log(`API Call: GET /models/${modelId}/dashboard - Fetching dashboard data`);
    return Promise.resolve({ charts: [], metrics: [] });
  },

  // Import/Export API Calls
  async importExcelData(modelId: string, data: RowData[], mappings: ColumnMapping[]) {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/models/${modelId}/import`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ data, mappings })
    // });
    // return await response.json();
    console.log(`API Call: POST /models/${modelId}/import - Importing Excel data:`, { data, mappings });
    return Promise.resolve({ imported: data.length });
  }
};

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
 * Main Financial Dashboard Component - Backend Ready
 * 
 * This component orchestrates the entire financial modeling experience.
 * All data operations are routed through the apiService for FastAPI integration.
 * 
 * Backend Integration Status:
 * ✅ API service layer implemented
 * ✅ Error handling prepared
 * ✅ Loading states ready
 * ⏳ Replace mock API calls with actual endpoints
 */
export default function FinancialDashboard() {
  const { toast } = useToast();
  
  // State Management - Backend Integration Points
  const [selectedModel, setSelectedModel] = useState<ModelId | null>(null);
  const [variableSections, setVariableSections] = useState<VariableSection[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [calculationResults, setCalculationResults] = useState<any>(null);
  
  // UI State for Variable Management
  const [newVariableName, setNewVariableName] = useState('');
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [isAddingVariable, setIsAddingVariable] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showImportWizard, setShowImportWizard] = useState(false);

  // Form Management for Adding Variables
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
   * Handle Model Selection - Backend Integration
   * FastAPI Endpoint: GET /api/v1/models/{model_id}/variables
   */
  const handleModelSelect = async (modelId: string) => {
    if (!isValidModelId(modelId)) {
      console.error(`Invalid model ID: ${modelId}`);
      return;
    }
    
    try {
      setIsLoading(true);
      console.log(`Selecting model: ${modelId}`);
      setSelectedModel(modelId);
      
      // Backend Integration: Load model-specific variables from API
      const variables = await apiService.getModelVariables(modelId);
      setVariableSections(variables);
      setShowResults(false);
      
      toast({
        title: "Model Loaded",
        description: `${getModelConfig(modelId).info.name} variables loaded successfully.`
      });
    } catch (error) {
      console.error('Error loading model:', error);
      toast({
        title: "Error Loading Model",
        description: "Failed to load model variables. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle Variable Addition - Backend Integration
   * FastAPI Endpoint: POST /api/v1/models/{model_id}/variables
   */
  const handleAddVariable = async (sectionId: string) => {
    if (!selectedModel || !newVariableName.trim()) return;

    try {
      const newVariable: Variable = {
        id: Date.now().toString(),
        name: newVariableName,
        value: 0,
        input_type: 'fixed',
        category: 'revenue',
        applies_to: 'income_statement',
        unit: '%',
      };
      
      // Backend Integration: Save new variable to API
      await apiService.createVariable(selectedModel, sectionId, newVariable);
      
      setVariableSections(sections =>
        sections.map(section =>
          section.id === sectionId
            ? { ...section, variables: [...section.variables, newVariable] }
            : section
        )
      );
      setNewVariableName('');
      
      toast({
        title: "Variable Added",
        description: "New variable has been saved to the backend."
      });
    } catch (error) {
      console.error('Error adding variable:', error);
      toast({
        title: "Error Adding Variable",
        description: "Failed to save variable. Please try again.",
        variant: "destructive"
      });
    }
  };

  /**
   * Handle Variable Removal - Backend Integration
   * FastAPI Endpoint: DELETE /api/v1/models/{model_id}/variables/{variable_id}
   */
  const handleRemoveVariable = async (sectionId: string, variableId: string) => {
    if (!selectedModel) return;

    try {
      // Backend Integration: Remove variable from API
      await apiService.deleteVariable(selectedModel, sectionId, variableId);
      
      setVariableSections(sections =>
        sections.map(section =>
          section.id === sectionId
            ? { ...section, variables: section.variables.filter(v => v.id !== variableId) }
            : section
        )
      );
      
      toast({
        title: "Variable Removed",
        description: "Variable has been deleted from the backend."
      });
    } catch (error) {
      console.error('Error removing variable:', error);
      toast({
        title: "Error Removing Variable",
        description: "Failed to delete variable. Please try again.",
        variant: "destructive"
      });
    }
  };

  /**
   * Handle Variable Value Changes - Backend Integration
   * FastAPI Endpoint: PUT /api/v1/models/{model_id}/variables/{variable_id}
   */
  const handleVariableChange = async (sectionId: string, variableId: string, value: number) => {
    if (!selectedModel) return;

    try {
      // Backend Integration: Update variable value in API
      await apiService.updateVariable(selectedModel, sectionId, variableId, value);
      
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
    } catch (error) {
      console.error('Error updating variable:', error);
      toast({
        title: "Error Updating Variable",
        description: "Failed to save variable changes.",
        variant: "destructive"
      });
    }
  };

  /**
   * Handle Model Calculation - Backend Integration
   * FastAPI Endpoint: POST /api/v1/models/{model_id}/calculate
   */
  const handleCalculateModel = async () => {
    if (!selectedModel) return;

    try {
      setIsLoading(true);
      
      // Backend Integration: Send variables to API for calculation
      const results = await apiService.calculateModel(selectedModel, variableSections);
      setCalculationResults(results);
      setShowResults(true);
      
      toast({
        title: "Calculation Complete",
        description: "Model calculations have been completed successfully."
      });
    } catch (error) {
      console.error('Error calculating model:', error);
      toast({
        title: "Calculation Error",
        description: "Failed to run model calculations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle Excel Import - Backend Integration
   * FastAPI Endpoint: POST /api/v1/models/{model_id}/import
   */
  const handleImportComplete = async (data: RowData[], mappings: ColumnMapping[]) => {
    if (!selectedModel) return;

    try {
      setIsLoading(true);
      
      // Backend Integration: Send import data to API
      const importResult = await apiService.importExcelData(selectedModel, data, mappings);
      
      // Update local state with processed data
      const updatedSections = [...variableSections];
      
      data.forEach(row => {
        mappings.forEach(mapping => {
          if (mapping.mappedTo && row[mapping.excelColumn]) {
            const mappedCategory = mapping.mappedTo;
            const value = parseFloat(String(row[mapping.excelColumn].value)) || 0;
            
            updatedSections.forEach(section => {
              const matchingVariable = section.variables.find(variable => 
                variable.name.toLowerCase().includes(mappedCategory.toLowerCase()) || 
                mappedCategory.toLowerCase().includes(variable.name.toLowerCase().replace(/\s+/g, '_'))
              );
              
              if (matchingVariable) {
                matchingVariable.value = value;
              }
            });
          }
        });
      });
      
      setVariableSections(updatedSections);
      setShowImportWizard(false);
      
      toast({
        title: "Import Successful",
        description: `Imported ${importResult.imported} rows from Excel file.`
      });
    } catch (error) {
      console.error('Import failed:', error);
      toast({
        title: "Import Failed",
        description: "There was an error importing your data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
   * Render Model-Specific Dashboard - Backend Data Integration
   * Each dashboard component should receive calculationResults from backend
   */
  const renderModelDashboard = () => {
    if (!selectedModel || !showResults) return null;

    // Props to pass backend calculation results to dashboard components
    const dashboardProps = {
      calculationResults,
      modelId: selectedModel,
      onRefresh: handleCalculateModel
    };

    switch (selectedModel) {
      case '3-statement':
        return <ThreeStatementDashboard {...dashboardProps} />;
      case 'dcf':
        return <DCFDashboard {...dashboardProps} />;
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
                onClick={handleCalculateModel}
                disabled={isLoading}
                className="ml-auto flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                {isLoading ? 'Calculating...' : 'Calculate Model'}
              </Button>
            )}
          </header>

          {/* Loading State */}
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground">Processing...</p>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          {!isLoading && !selectedModel ? (
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
          ) : !isLoading && !showResults ? (
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

                  {/* Variable Sections Grid - Backend Data Driven */}
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
                            {/* Variable List - Backend Synced */}
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

                            {/* Add Variable Button and Dialog - Backend Integration */}
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
                                
                                {/* Add Variable Dialog Content - Backend Ready */}
                                <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Add Variable to {section.title}</DialogTitle>
                                    <DialogDescription className="text-gray-600">
                                      Configure a new variable with metadata for proper categorization
                                    </DialogDescription>
                                  </DialogHeader>
                                  <Form {...addVariableForm}>
                                    <form onSubmit={addVariableForm.handleSubmit(async (data: VariableFormData) => {
                                      try {
                                        const newVariable: Variable = {
                                          ...data,
                                          id: Date.now().toString(),
                                        };
                                        
                                        // Backend Integration: Save to API
                                        if (selectedModel) {
                                          await apiService.createVariable(selectedModel, section.id, newVariable);
                                        }
                                        
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
                                          description: `"${data.name}" has been added to ${section.title} and saved to backend.`
                                        });
                                      } catch (error) {
                                        console.error('Error adding variable:', error);
                                        toast({
                                          title: "Error",
                                          description: "Failed to add variable. Please try again.",
                                          variant: "destructive"
                                        });
                                      }
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
            // Dashboard Results Screen - Backend Data Driven
            renderModelDashboard()
          )}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
