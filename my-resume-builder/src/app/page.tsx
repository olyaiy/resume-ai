

import Editor from "@/components/Editor";
import { getResumeContent } from "@/lib/getResumeContent";

export default function Home() {

  
  const resumeContent = getResumeContent();

  return (
    <main className="flex min-w-screen min-h-screen flex-col items-center p-24">
      <div className="w-full h-full flex ">

      <Editor initialContent={resumeContent}  />
      </div>
    </main>
  );
}
