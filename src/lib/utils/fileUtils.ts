import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function getFileContents(filePath: string): Promise<string> {
  try {
    const response = await fetch(`/api/files?path=${encodeURIComponent(filePath)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error fetching file contents:", error);
    throw error;
  }
}