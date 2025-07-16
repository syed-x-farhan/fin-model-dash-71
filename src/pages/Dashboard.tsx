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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load calculation results and variables from localStorage
    const results = localStorage.getItem('calculationResults');
    const variables = localStorage.getItem('modelVariables');
    
    if (results && variables) {
      setCalculationResults(JSON.parse(results));
      setModelVariables(JSON.parse(variables));
    } else {
      toast({
        title: "No Data Found",
        description: "Please configure variables and run calculations first.",
        variant: "destructive"
      });
      setTimeout(() => {
        navigate(`/model/${modelId}/variables`);
      }, 2000);
    }
    setIsLoading(false);
  }, [modelId, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
