
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
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{variable.name}</CardTitle>
        {variable.description && (
          <CardDescription className="text-sm text-muted-foreground">
            {variable.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor={variable.id} className="text-sm font-medium">
            Value {variable.unit && `(${variable.unit})`}
          </Label>
          <Input
            id={variable.id}
            type="number"
            value={value}
            onChange={handleChange}
            className="text-right"
            step={variable.unit === '%' ? 0.1 : variable.unit === '$' ? 1000 : 1}
          />
          <div className="text-xs text-muted-foreground">
            Current: {formatValue(value)} {variable.unit}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
