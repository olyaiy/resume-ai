// File: app/api/save-content/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface SaveRequest {
  content: any;
  filename: string;
}

export async function POST(req: NextRequest) {
  try {
    const { content, filename } = await req.json() as SaveRequest;

    // Validate input
    if (!content || !filename) {
      return NextResponse.json({ error: 'Missing content or filename' }, { status: 400 });
    }

    // Ensure the filename is safe
    const safeName = path.basename(filename).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filePath = path.join(process.cwd(), 'data', `${safeName}.json`);

    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Write the file
    await fs.writeFile(filePath, JSON.stringify(content, null, 2));

    return NextResponse.json({ message: 'Content saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}

// If you need to handle OPTIONS requests (e.g., for CORS preflight)
export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}