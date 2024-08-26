'use client'

import { Button } from './ui/button'

import { askGPT } from '@/lib/openai';


import { useState, useEffect } from 'react';
import { getFileContents } from '@/lib/fileUtils';
import { ForwardRefEditor } from './mdx-editor/ForwardRefEditor';

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

        <div className="bg-white w-full h-full p-2">
            <ForwardRefEditor markdown={resumeContent} />
        </div>

  )
}

export default ResumePage