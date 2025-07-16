
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Download,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MODEL_CONFIGS, ModelId, getModelConfig } from '@/config/models';
import ThreeStatementDashboard from '@/components/dashboards/ThreeStatementDashboard';

export default function Dashboard() {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [modelVariables, setModelVariables] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false); // Changed to false to show dashboard immediately

  useEffect(() => {
    // For demonstration purposes, we'll show the dashboard with mock data
    // In a real app, you'd load from localStorage or API
    const mockResults = {
      revenue: 1749006,
      netIncome: 210000,
      ebitda: 420000
    };
    
    const mockVariables = {
      growthRate: 15,
      margin: 25
    };
    
    setCalculationResults(mockResults);
    setModelVariables(mockVariables);
  }, [modelId]);

  const getModelName = () => {
    return modelId ? MODEL_CONFIGS[modelId as ModelId]?.info.name || 'Financial Model' : 'Financial Model';
  };

  const handleRefresh = () => {
    // Reload the dashboard data
    window.location.reload();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar selectedModel={modelId as ModelId} onModelSelect={() => {}} />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/model/${modelId}/variables`)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Variables
            </Button>
            <div className="flex items-center gap-2 flex-1">
              <h1 className="text-xl font-semibold text-foreground">{getModelName()} Dashboard</h1>
              <Badge variant="secondary">Results</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="flex-1 p-6">
            {modelId === '3-statement' ? (
              <ThreeStatementDashboard 
                calculationResults={calculationResults}
                modelId={modelId}
                onRefresh={handleRefresh}
              />
            ) : (
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Dashboard Coming Soon</h2>
                <p className="text-muted-foreground">
                  Dashboard for {getModelName()} is under development.
                </p>
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
