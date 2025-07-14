
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { CompanyTypeSelector } from '@/components/CompanyTypeSelector';
import { VariableEditor } from '@/components/VariableEditor';
import { SidebarProvider } from '@/components/ui/sidebar';

const ModelConfiguration = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const navigate = useNavigate();
  const [selectedCompanyType, setSelectedCompanyType] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'company-type' | 'variables'>('company-type');

  const handleModelSelect = (newModelId: string) => {
    navigate(`/model/${newModelId}/configure`);
    setSelectedCompanyType(null);
    setCurrentStep('company-type');
  };

  const handleCompanyTypeSelect = (companyType: string) => {
    setSelectedCompanyType(companyType);
    setCurrentStep('variables');
  };

  const handleBackToCompanyType = () => {
    setCurrentStep('company-type');
    setSelectedCompanyType(null);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar 
          selectedModel={modelId || null}
          onModelSelect={handleModelSelect}
        />
        
        <main className="flex-1 flex flex-col">
          <div className="border-b border-border bg-background">
            <div className="flex h-16 items-center px-6">
              <h1 className="text-xl font-semibold text-foreground">
                {modelId ? modelId.charAt(0).toUpperCase() + modelId.slice(1).replace('-', ' ') : 'Select Model'}
              </h1>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            {!modelId ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Select a Model</h2>
                  <p className="text-muted-foreground">Choose a financial model from the sidebar to get started</p>
                </div>
              </div>
            ) : currentStep === 'company-type' ? (
              <CompanyTypeSelector onCompanyTypeSelect={handleCompanyTypeSelect} />
            ) : (
              <div>
                <button 
                  onClick={handleBackToCompanyType}
                  className="mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to Company Type Selection
                </button>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Variables Configuration</h2>
                  <p className="text-muted-foreground mb-8">
                    Configure your {selectedCompanyType} model variables
                  </p>
                  <p className="text-sm text-muted-foreground">Variables editor will be integrated here</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ModelConfiguration;
