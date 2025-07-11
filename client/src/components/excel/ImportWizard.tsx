import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Upload, FileSpreadsheet, CheckCircle, Settings, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ExcelUploadDialog } from './ExcelUploadDialog';
import { DataPreviewTable, RowData, ColumnMapping } from './DataPreviewTable';
import { ColumnMapper } from './ColumnMapper';

interface ImportWizardProps {
  onImportComplete: (data: RowData[], mappings: ColumnMapping[]) => void;
  onCancel: () => void;
}

interface ImportStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  completed: boolean;
}

interface ParsedExcelData {
  sheets: string[];
  rowCount: number;
  fileName: string;
  data?: RowData[];
  columns?: string[];
}

export const ImportWizard: React.FC<ImportWizardProps> = ({
  onImportComplete,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedExcelData | null>(null);
  const [previewData, setPreviewData] = useState<RowData[]>([]);
  const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps: ImportStep[] = [
    {
      id: 'upload',
      title: 'Upload File',
      description: 'Select and upload your Excel file',
      icon: Upload,
      completed: !!parsedData
    },
    {
      id: 'preview',
      title: 'Preview Data',
      description: 'Review and edit imported data',
      icon: Eye,
      completed: previewData.length > 0 && currentStep > 1
    },
    {
      id: 'mapping',
      title: 'Map Columns',
      description: 'Map Excel columns to financial categories',
      icon: Settings,
      completed: columnMappings.some(m => m.mappedTo !== null) && currentStep > 2
    },
    {
      id: 'confirm',
      title: 'Confirm Import',
      description: 'Review and confirm the import',
      icon: CheckCircle,
      completed: false
    }
  ];

  // Mock data for preview - replace with actual parsed data from backend
  const generateMockData = (fileName: string): RowData[] => {
    return [
      {
        'Year': { value: '2024', type: 'text' },
        'Revenue': { value: 1500000, type: 'currency' },
        'COGS': { value: 600000, type: 'currency' },
        'Operating Expenses': { value: 400000, type: 'currency' },
        'Net Income': { value: 500000, type: 'currency' }
      },
      {
        'Year': { value: '2025', type: 'text' },
        'Revenue': { value: 1800000, type: 'currency' },
        'COGS': { value: 720000, type: 'currency' },
        'Operating Expenses': { value: 450000, type: 'currency' },
        'Net Income': { value: 630000, type: 'currency' }
      },
      {
        'Year': { value: '2026', type: 'text' },
        'Revenue': { value: 2100000, type: 'currency' },
        'COGS': { value: 840000, type: 'currency' },
        'Operating Expenses': { value: 500000, type: 'currency' },
        'Net Income': { value: 760000, type: 'currency' }
      }
    ];
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleUploadComplete = (data: ParsedExcelData) => {
    setParsedData(data);
    
    // Generate mock preview data - replace with actual parsed data
    const mockData = generateMockData(data.fileName);
    setPreviewData(mockData);
    
    // Initialize column mappings
    const columns = Object.keys(mockData[0] || {});
    const initialMappings: ColumnMapping[] = columns.map(column => ({
      excelColumn: column,
      mappedTo: null,
      dataType: mockData[0][column]?.type as any || 'text',
      isRequired: false
    }));
    setColumnMappings(initialMappings);
    
    setCurrentStep(1);
  };

  const handleDataChange = (newData: RowData[]) => {
    setPreviewData(newData);
  };

  const handleMappingChange = (newMappings: ColumnMapping[]) => {
    setColumnMappings(newMappings);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onImportComplete(previewData, columnMappings);
    } finally {
      setIsProcessing(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!parsedData;
      case 1:
        return previewData.length > 0;
      case 2:
        return columnMappings.some(m => m.mappedTo !== null);
      case 3:
        return true;
      default:
        return false;
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <FileSpreadsheet className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Your Financial Data</h3>
              <p className="text-muted-foreground">
                Select an Excel file containing your financial statements, assumptions, or forecasts
              </p>
            </div>
            
            <ExcelUploadDialog
              onFileSelect={handleFileSelect}
              onUploadComplete={handleUploadComplete}
              trigger={
                <Button size="lg" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Excel File
                </Button>
              }
            />
            
            {parsedData && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">File Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">File:</span> {parsedData.fileName}</p>
                  <p><span className="font-medium">Sheets:</span> {parsedData.sheets.join(', ')}</p>
                  <p><span className="font-medium">Rows:</span> {parsedData.rowCount}</p>
                </div>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Preview & Edit Data</h3>
              <p className="text-muted-foreground">
                Review the imported data and make any necessary corrections
              </p>
            </div>
            
            <DataPreviewTable
              data={previewData}
              columns={Object.keys(previewData[0] || {})}
              onDataChange={handleDataChange}
              maxRows={10}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Map Excel Columns</h3>
              <p className="text-muted-foreground">
                Map your Excel columns to the appropriate financial statement categories
              </p>
            </div>
            
            <ColumnMapper
              columnMappings={columnMappings}
              onMappingChange={handleMappingChange}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Confirm Import</h3>
              <p className="text-muted-foreground">
                Review your settings and confirm the data import
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Import Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>File:</span>
                    <span className="font-medium">{parsedData?.fileName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rows:</span>
                    <span className="font-medium">{previewData.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Columns:</span>
                    <span className="font-medium">{columnMappings.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mapped:</span>
                    <span className="font-medium">
                      {columnMappings.filter(m => m.mappedTo).length}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Column Mappings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {columnMappings
                      .filter(m => m.mappedTo)
                      .map((mapping, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{mapping.excelColumn}</span>
                        <Badge variant="secondary">{mapping.mappedTo}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = step.completed;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    isActive 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-muted-foreground bg-background'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <Separator className="w-24 mx-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card className="min-h-[500px]">
        <CardContent className="p-6">
          {getStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={currentStep === 0 ? onCancel : handleBack}
          disabled={isProcessing}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {currentStep === 0 ? 'Cancel' : 'Back'}
        </Button>
        
        <Button
          onClick={currentStep === steps.length - 1 ? handleComplete : handleNext}
          disabled={!canProceed() || isProcessing}
        >
          {isProcessing ? 'Processing...' : currentStep === steps.length - 1 ? 'Complete Import' : 'Next'}
          {!isProcessing && currentStep < steps.length - 1 && (
            <ChevronRight className="h-4 w-4 ml-2" />
          )}
        </Button>
      </div>
    </div>
  );
};