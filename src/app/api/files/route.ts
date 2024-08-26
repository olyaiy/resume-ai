import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const filePath = request.nextUrl.searchParams.get('path');
    if (!filePath) {
      return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
    }

    const fullPath = path.join(process.cwd(), filePath);
    const fileContents = await fs.readFile(fullPath, 'utf-8');
    return NextResponse.json({ content: fileContents });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
  }
}