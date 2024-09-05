import React from 'react'
import { Textarea } from './ui/textarea'
import { PanelSection } from './panel-section'
import { Button } from './ui/button' // Add this import

interface EditPanelProps {
  resumeData: any
  onInputChange: (section: string, value: string | any[]) => void
}

export default function EditPanel({ resumeData, onInputChange }: EditPanelProps) {
  const relevantFields = ['name', 'skills', 'work_experience', 'projects', 'education']

  return (
    <div className="h-full w-1/2 bg-zinc-200 flex flex-col gap-2 overflow-y-auto">
      <div className="sticky top-0 bg-navy-900 p-2 z-10 flex justify-end gap-2 bg-black mx-4 rounded-md">
        <Button variant="outline">
          Save Content
        </Button>
        <Button>
          Download
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Generate Resume with AI
        </Button>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {relevantFields.map(key => {
          const value = resumeData[key];
          if (Array.isArray(value)) {
            return (
              <PanelSection
                key={key}
                data={value}
                title={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                onChange={(newData) => onInputChange(key, newData)}
              />
            );
          }
          return (
            <div key={key} className="flex flex-col gap-2">
              <h3>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}</h3>
              <Textarea
                value={typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                onChange={(e) => onInputChange(key, e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
          );
        })}
      </div>
    </div>
  )
}