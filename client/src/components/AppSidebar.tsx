
import { BarChart3 } from 'lucide-react';
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
        
        <SidebarGroup className="px-0">
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wide">
            Financial Models
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {models.map((model) => {
                const IconComponent = model.icon;
                const isActive = selectedModel === model.id;
                
                return (
                  <SidebarMenuItem key={model.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => onModelSelect(model.id)}
                      className={`w-full justify-start px-3 py-2 mx-2 mb-1 rounded-lg ${
                        isActive 
                          ? 'bg-primary text-primary-foreground font-medium' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent'
                      }`}
                    >
                      <IconComponent className="h-4 w-4 mr-3" />
                      <span className="text-sm">{model.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-8 px-2">
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wide">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full justify-start px-3 py-2 mx-2 mb-1 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent">
                    <BarChart3 className="h-4 w-4 mr-3" />
                    <span className="text-sm">Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
