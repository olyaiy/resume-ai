// File: app/api/save-content/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface SaveRequest {
  content: any;
}

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json() as SaveRequest;

    // Validate input
    if (!content) {
      return NextResponse.json({ error: 'Missing content' }, { status: 400 });
    }

    // Set the file path to resumes/resume.json
    const filePath = path.join(process.cwd(), 'src', 'resumes', 'resume.json');

    // Write the file
    await fs.writeFile(filePath, JSON.stringify(content, null, 2));

    return NextResponse.json({ message: 'Content saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}