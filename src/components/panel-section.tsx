import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from './ui/button';
import { Plus, Trash, Save } from 'lucide-react';

interface ArrayTextAreaProps {
  data: any[];
  title: string;
  onChange: (newData: any[]) => void;
}

export function PanelSection({ data, title, onChange }: ArrayTextAreaProps) {
  const addItem = () => {
    const newData = [...data, {}];
    onChange(newData);
  };

  const deleteItem = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  };

  return (
    <div className="flex flex-col gap-2">
      <h3>{title}</h3>
      {data.map((item, index) => (
        <div key={index} className="bg-white p-2 rounded">
          <div className="flex justify-between items-center mb-2">
            <h4>{title} {index + 1}</h4>
            <div>
              <Button variant="outline" size="icon" className="mr-2" onClick={addItem}>
                <Plus className="h-4 w-4 text-green-500" />
              </Button>
              <Button variant="outline" size="icon" className="mr-2" onClick={() => deleteItem(index)}>
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
              <Button variant="outline" size="icon">
                <Save className="h-4 w-4 text-blue-500" />
              </Button>
            </div>
          </div>
          <Textarea
            value={Object.entries(item)
              .map(([field, value]) => `${field}: ${value}`)
              .join('\n')}
            onChange={(e) => {
              const newData = [...data];
              const updatedItem = e.target.value.split('\n').reduce((acc: Record<string, string>, line) => {
                const [field, value] = line.split(':');
                if (field && value) {
                  acc[field.trim()] = value.trim();
                }
                return acc;
              }, {});
              newData[index] = updatedItem;
              onChange(newData);
            }}
            className="w-full"
            rows={Object.keys(item).length + 1}
          />
        </div>
      ))}
    </div>
  );
}