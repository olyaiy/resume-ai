

import Editor from "@/components/Editor";
import { getResumeContent } from "@/lib/getResumeContent";

export default function Home() {

  const filePath = '@/resumes/resume.json';

  return (
    <main className="flex min-w-screen min-h-screen flex-col items-center py-24 px-12">
      <div className="w-full h-full flex max-w-screen-md ">

      <Editor initialContent={getResumeContent()} saveLocation={filePath} />
      </div>
    </main>
  );
}
