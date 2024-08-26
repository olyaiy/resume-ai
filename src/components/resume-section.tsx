import React from 'react';
import { Textarea } from './ui/textarea';

interface ArrayTextAreaProps {
  data: any[];
  title: string;
  onChange: (newData: any[]) => void;
}

export function ResumeSection({ data, title, onChange }: ArrayTextAreaProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3>{title}</h3>
      {data.map((item, index) => (
        <div key={index} className="bg-white p-2 rounded">
          <h4>{title} {index + 1}</h4>
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