'use client'

import { Button } from './ui/button'
import { ForwardRefEditor } from './ForwardRefEditor'
import { askGPT } from '@/lib/openai';


import { useState, useEffect } from 'react';
import { getFileContents } from '@/lib/utils/fileUtils';

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
    <div className="flex flex-col h-full gap-2">
            <Button 
                className="bg-green-700"
                onClick={async () => {
                  try {
                    const result = await askGPT('hi how are you?');
                    console.log('Result from askGPT:', result);
                  } catch (error) {
                    console.error('Error calling askGPT:', error);
                  }
                }}   
                > 
                 
                    Save 
            </Button>
            <Button className=""> Load </Button>
        <div className="bg-white w-full h-full p-4 overflow-auto">

        <ForwardRefEditor markdown={resumeContent} />
        </div>
    </div>
  )
}

export default ResumePage