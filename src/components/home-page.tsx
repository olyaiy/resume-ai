'use client'

import React, { useEffect, useState } from 'react'
import ResumePage from './resume-page'
import { Textarea } from './ui/textarea'
import { ResumeSection } from './resume-section'


export default function HomePage({ resume }: { resume: any }) {
  const [resumeData, setResumeData] = useState(resume)

  useEffect(() => {
    setResumeData(resume)
  }, [resume])


  const handleInputChange = (section: string, value: string | any[]) => {
    setResumeData((prev: typeof resumeData) => ({ ...prev, [section]: value }))
  }


  const relevantFields = ['name', 'skills', 'work_experience', 'projects', 'education']
  // const { name, skills, education, work_experience, projects } = resume;


  console.log(resume)

  return (
    <div className="flex-1 flex items-center gap-4 h-screen overflow-hidden">
        
        {/* Info Page */}
        <div className="h-full w-1/2 bg-zinc-200 flex flex-col gap-4 p-4 overflow-y-auto">
          {relevantFields.map(key => {
            const value = resumeData[key];
            if (Array.isArray(value)) {
              return (
                <ResumeSection
                  key={key}
                  data={value}
                  title={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                  onChange={(newData) => handleInputChange(key, newData)}
                />
              );
            }
            return (
              <div key={key} className="flex flex-col gap-2">
                <h3>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}</h3>
                <Textarea
                  value={typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full"
                  rows={4}
                />
              </div>
            );
          })}
        </div>
        

        {/* Resume Page */}
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="w-full h-full max-w-[calc(100vh*8.5/11)] max-h-[calc(100vw*11/8.5)] aspect-[8.5/11] overflow-hidden">
            <ResumePage />
          </div>
        </div>

  </div>
  )
}