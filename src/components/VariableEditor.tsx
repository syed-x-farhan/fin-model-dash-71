
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Variable } from '@/config/models/threeStatementConfig';

interface VariableEditorProps {
  variable: Variable;
  value: number;
  onChange: (variableId: string, value: number) => void;
}

export function VariableEditor({ variable, value, onChange }: VariableEditorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(variable.id, newValue);
  };

  const formatValue = (val: number) => {
    if (variable.unit === '$') {
      return val.toLocaleString();
    }
    return val.toString();
  };

  return (
    <Card className="h-full min-h-[140px] flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="text-sm font-medium leading-tight line-clamp-2 min-h-[2.5rem]">
          {variable.name}
        </CardTitle>
        {variable.description && (
          <CardDescription className="text-xs text-muted-foreground line-clamp-2">
            {variable.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div>
            <Label htmlFor={variable.id} className="text-xs font-medium text-muted-foreground">
              Value {variable.unit && `(${variable.unit})`}
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                id={variable.id}
                type="number"
                value={value}
                onChange={handleChange}
                className="text-right text-sm h-9 flex-1"
                step={variable.unit === '%' ? 0.1 : variable.unit === '$' ? 1000 : 1}
              />
              {variable.unit && (
                <span className="text-xs text-muted-foreground font-medium min-w-[20px] text-center">
                  {variable.unit}
                </span>
              )}
            </div>
          </div>
          <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded text-center">
            Current: {formatValue(value)} {variable.unit}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
