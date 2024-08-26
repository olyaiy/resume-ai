import { NextResponse } from 'next/server';


export async function askGPT(prompt: string): Promise<string> {
    console.log('askGPT called')
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch OpenAI response');
    }
  
    const data = await response.json();
    console.log('WE GOT THIS IN THE HOOK', data)
    return data.response;
    }
  