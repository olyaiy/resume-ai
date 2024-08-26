'use client'

import React from 'react'
import ResumePage from './resume-page'
import { Textarea } from './ui/textarea'

const HomePage = () => {
  return (
    <div className="flex-1 flex items-center">
        
        {/* Info Page */}
        <div className="h-full w-1/2 bg-zinc-200 flex flex-col gap-4 p-4">

          <div className="flex flex-col gap-2">
            <h3>Job Info</h3>
            <Textarea placeholder="Job Description here." className="w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <h3>Your Details</h3>
            <Textarea placeholder="Your details here." className="w-full" />
          </div>


        </div>

        {/* Resume Page */}
        <div className="w-full h-full max-w-[calc(100vh*8.5/11)] max-h-[calc(100vw*11/8.5)] aspect-[8.5/11]">
        <ResumePage />
        </div>


  </div>
  )
}

export default HomePage
