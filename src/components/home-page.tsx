'use client'

import React, { useEffect, useState } from 'react'
import ResumePage from './resume-page'
import EditPanel from './edit-panel'
import { askGPT } from '@/lib/openai'


export default function HomePage({ resume }: { resume: any }) {
  const [resumeData, setResumeData] = useState(resume)

  useEffect(() => {
    setResumeData(resume)
  }, [resume])

  const handleInputChange = (section: string, value: string | any[]) => {
    setResumeData((prev: typeof resumeData) => ({ ...prev, [section]: value }))
  }

  console.log(askGPT('hello what is your name?'))

  return (
    <div className="flex-1 flex  h-screen justify-between p-4">
      {/* Edit Panel */}
      <EditPanel resumeData={resumeData} onInputChange={handleInputChange} />

      {/* Resume Page */}

        <div className="aspect-[8.5/11] h-full bg-slate-300 overflow-scroll p-4">
          {/* Use text area component for now until we find a good editor */}
          {/* <ResumePage /> */}
          <textarea className="w-full h-full"/>
        </div>
    </div>
  )
}