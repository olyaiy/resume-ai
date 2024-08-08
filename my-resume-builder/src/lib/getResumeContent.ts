import fs from 'fs';
import path from 'path';

export function getResumeContent() {
  const filePath = path.join(process.cwd(), 'src', 'resumes', 'resume.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}