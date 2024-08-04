import Editor from "@/components/Editor";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-screen h-screen flex-col items-center p-24">
      <div className="w-full h-full flex ">
      <Editor />
      </div>
    </main>
  );
}
