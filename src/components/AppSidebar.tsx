
import { BarChart3, TrendingUp } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const models = [
  {
    id: '3-statement',
    name: '3-Statement Model',
    icon: BarChart3,
  },
  {
    id: 'dcf',
    name: 'DCF Model',
    icon: TrendingUp,
  },
];

interface AppSidebarProps {
  selectedModel: string | null;
  onModelSelect: (modelId: string) => void;
}

export function AppSidebar({ selectedModel, onModelSelect }: AppSidebarProps) {
  return (
    <Sidebar className="w-64 border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">FinanceModel</h2>
              <p className="text-xs text-sidebar-foreground/60">Pro Dashboard</p>
            </div>
          </div>
        </div>
        
        <SidebarGroup className="px-0 pt-4">
          <SidebarGroupLabel className="px-4 py-2 mb-2 text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wide">
            Financial Models
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu className="space-y-2">
              {models.map((model) => {
                const IconComponent = model.icon;
                const isActive = selectedModel === model.id;
                
                return (
                  <SidebarMenuItem key={model.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => onModelSelect(model.id)}
                      className={`w-full justify-start px-3 py-2.5 mx-1 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground font-medium shadow-sm border border-primary/20' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }`}
                    >
                      <IconComponent className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span className="text-sm truncate">{model.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
