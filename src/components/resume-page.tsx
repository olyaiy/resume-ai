'use client'

import { Button } from './ui/button'
import { ForwardRefEditor } from './ForwardRefEditor'
import { askGPT } from '@/lib/openai';


import { useState, useEffect } from 'react';
import { getFileContents } from '@/lib/fileUtils';

const ResumePage = () => {
  const [resumeContent, setResumeContent] = useState('');

  useEffect(() => {
    async function loadResumeContent() {
      try {
        const content = await getFileContents('src/resources/resume.md');

        setResumeContent(content);
      } catch (error) {
        console.error('Error loading resume content:', error);
        // Handle the error (e.g., set an error state)
      }
    }

    loadResumeContent();
  }, []);

  return (
    <div className="flex flex-col h-full gap-4">
        <div className="bg-white w-full h-full p-2 overflow-auto">
            <ForwardRefEditor markdown={resumeContent} />
        </div>
    </div>
  )
}

export default ResumePage