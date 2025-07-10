
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Clock, Target, Users, BookOpen, Upload, FileSpreadsheet, Database } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { threeStatementVariables, threeStatementModelInfo, threeStatementImportConfig, defaultThreeStatementVariables } from '@/config/models/threeStatementConfig';
import { VariableEditor } from '@/components/VariableEditor';
import { ImportWizard } from '@/components/excel/ImportWizard';
import { RowData, ColumnMapping } from '@/components/excel/DataPreviewTable';

interface ModelConfigurationProps {
  modelId: string;
}

const ModelConfiguration: React.FC<ModelConfigurationProps> = ({ modelId = '3-statement' }) => {
  const [variables, setVariables] = useState<Record<string, number>>(defaultThreeStatementVariables);
  const [showImportWizard, setShowImportWizard] = useState(false);
  const [importedData, setImportedData] = useState<any>(null);
  const [hasImportedData, setHasImportedData] = useState(false);

  const handleVariableChange = (variableId: string, value: number) => {
    setVariables(prev => ({
      ...prev,
      [variableId]: value
    }));
  };

  const handleImportComplete = async (data: RowData[], mappings: ColumnMapping[]) => {
    try {
      // Process imported data and update variables
      const updatedVariables = { ...variables };
      
      data.forEach(row => {
        const nameMapping = mappings.find(m => m.targetField === 'name');
        const valueMapping = mappings.find(m => m.targetField === 'value');
        
        if (nameMapping && valueMapping && row[nameMapping.sourceColumn] && row[valueMapping.sourceColumn]) {
          const variableName = String(row[nameMapping.sourceColumn]).toLowerCase().replace(/\s+/g, '-');
          const value = parseFloat(String(row[valueMapping.sourceColumn])) || 0;
          
          // Find matching variable by name similarity
          const matchingVariableId = Object.keys(defaultThreeStatementVariables).find(id => 
            id.includes(variableName) || variableName.includes(id.replace(/-/g, ''))
          );
          
          if (matchingVariableId) {
            updatedVariables[matchingVariableId] = value;
          }
        }
      });
      
      setVariables(updatedVariables);
      setImportedData({
        fileName: 'uploaded_file.xlsx',
        importDate: new Date(),
        rowCount: data.length
      });
      setHasImportedData(true);
      setShowImportWizard(false);
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  const handleImportCancel = () => {
    setShowImportWizard(false);
  };

  const clearImport = () => {
    setImportedData(null);
    setHasImportedData(false);
    setVariables(defaultThreeStatementVariables);
  };

  const calculateTotalAssets = () => {
    return variables['cash'] + variables['accounts-receivable'] + variables['inventory'] + 
           variables['other-current-assets'] + variables['ppe-fixed-assets'];
  };

  const calculateTotalLiabilities = () => {
    return variables['accounts-payable'] + variables['accrued-expenses'] + 
           variables['short-term-debt'] + variables['long-term-debt'];
  };

  const calculateTotalEquity = () => {
    return variables['retained-earnings'] + variables['share-capital-equity'];
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Configure Your Financial Model</h1>
        <p className="text-lg text-muted-foreground">
          Set up variables and assumptions for your {threeStatementModelInfo.name}
        </p>
        
        {/* Import Data Controls */}
        <div className="flex justify-center gap-3">
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
                  Upload and map your Excel data to populate the 3-statement model variables
                </DialogDescription>
              </DialogHeader>
              <ImportWizard
                onImportComplete={handleImportComplete}
                onCancel={handleImportCancel}
              />
            </DialogContent>
          </Dialog>
          
          {hasImportedData && (
            <>
              <Button variant="secondary" className="gap-2">
                <Database className="h-4 w-4" />
                Data Source: {importedData?.fileName}
              </Button>
              <Button variant="ghost" onClick={clearImport} size="sm">
                Clear Import
              </Button>
            </>
          )}
        </div>

        {/* Import Status Alert */}
        {hasImportedData && (
          <Alert className="max-w-2xl mx-auto">
            <FileSpreadsheet className="h-4 w-4" />
            <AlertDescription>
              Financial data loaded from <strong>{importedData?.fileName}</strong> imported on{' '}
              {importedData?.importDate.toLocaleDateString()}. The variables now show your imported values.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Model Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{threeStatementModelInfo.name}</CardTitle>
              <CardDescription className="text-lg mt-2">
                {threeStatementModelInfo.description}
              </CardDescription>
            </div>
            <div className="text-right space-y-2">
              <Badge variant="secondary" className="gap-1">
                <Target className="h-3 w-3" />
                {threeStatementModelInfo.complexity}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                {threeStatementModelInfo.timeEstimate}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${calculateTotalAssets().toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Liabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${calculateTotalLiabilities().toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Equity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${calculateTotalEquity().toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Variable Configuration Sections */}
      <div className="space-y-8">
        {threeStatementVariables.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription>
                      Configure the {section.title.toLowerCase()} for your financial model
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.variables.map((variable) => (
                    <VariableEditor
                      key={variable.id}
                      variable={variable}
                      value={variables[variable.id] || variable.value}
                      onChange={handleVariableChange}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button size="lg" className="gap-2">
          <Target className="h-4 w-4" />
          Generate Model
        </Button>
        <Button variant="outline" size="lg">
          Save Configuration
        </Button>
        <Button variant="ghost" size="lg">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default ModelConfiguration;
