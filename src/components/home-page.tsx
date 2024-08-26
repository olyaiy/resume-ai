'use client'

import React, { useEffect, useState } from 'react'
import ResumePage from './resume-page'
import EditPanel from './edit-panel'


export default function HomePage({ resume }: { resume: any }) {
  const [resumeData, setResumeData] = useState(resume)

  useEffect(() => {
    setResumeData(resume)
  }, [resume])

  const handleInputChange = (section: string, value: string | any[]) => {
    setResumeData((prev: typeof resumeData) => ({ ...prev, [section]: value }))
  }

  console.log(resume)

  return (
    <div className="flex-1 flex items-center gap-4 h-screen overflow-hidden">
      {/* Edit Panel */}
      <EditPanel resumeData={resumeData} onInputChange={handleInputChange} />

      {/* Resume Page */}
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="w-full h-full max-w-[calc(100vh*8.5/11)] max-h-[calc(100vw*11/8.5)] aspect-[8.5/11] overflow-hidden">
          <ResumePage />
        </div>
      </div>
    </div>
  )
}