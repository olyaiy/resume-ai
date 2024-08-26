import React from 'react'

const ResumePage = () => {
  return (
    <div className="bg-white w-full h-full p-4 overflow-auto">
      <h1 className="text-black text-2xl mb-4">Resume Content</h1>
      <p className="text-black">This is the resume content. It should be visible and scrollable if it exceeds the container.</p>
      {/* Add more content here to test scrolling */}
    </div>
  )
}

export default ResumePage