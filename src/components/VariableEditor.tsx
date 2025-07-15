
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
    <Card className="h-full min-h-[160px] flex flex-col hover:shadow-md transition-shadow duration-200 border-gray-200">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="text-base font-semibold leading-tight line-clamp-2 min-h-[2.5rem] text-gray-900">
          {variable.name}
        </CardTitle>
        {variable.description && (
          <CardDescription className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {variable.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between pt-0">
        <div className="space-y-4">
          <div>
            <Label htmlFor={variable.id} className="text-sm font-medium text-gray-700 mb-2 block">
              Value {variable.unit && `(${variable.unit})`}
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id={variable.id}
                type="number"
                value={value}
                onChange={handleChange}
                className="text-right text-base h-10 flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                step={variable.unit === '%' ? 0.1 : variable.unit === '$' ? 1000 : 1}
              />
              {variable.unit && (
                <span className="text-sm text-gray-500 font-medium min-w-[24px] text-center">
                  {variable.unit}
                </span>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md text-center border">
            <span className="font-medium">Current:</span> {formatValue(value)} {variable.unit}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
