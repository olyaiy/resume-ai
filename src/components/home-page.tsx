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

  return (
    <div className="flex-1 flex  h-screen justify-between">
      {/* Edit Panel */}
      <EditPanel resumeData={resumeData} onInputChange={handleInputChange} />

      {/* Resume Page */}

        <div className="aspect-[8.5/11] h-full bg-white overflow-scroll">
          <ResumePage />
        </div>
    </div>
  )
}