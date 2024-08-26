import ResumePage from "@/components/resume-page";


export default function Home() {
  return (
    <main className="flex min-h-screen bg-zinc-950 p-4">
      <div className="flex-1 flex items-center justify-end">
        <div className="w-full h-full max-w-[calc(100vh*8.5/11)] max-h-[calc(100vw*11/8.5)] aspect-[8.5/11]">
          <ResumePage />
        </div>
      </div>
    </main>
  );
}