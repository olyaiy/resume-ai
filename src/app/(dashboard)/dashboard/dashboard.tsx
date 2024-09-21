'use client'

import { Resume } from "@/lib/types";
import { NewResumeDialog } from "@/components/NewResumeDialog";
import { ResumeList } from "@/components/ResumeList";

export default function Dashboard({ resumeList }: { resumeList: Resume[] }) {
    return (
        <div className="gap-2 flex flex-col items-start">
            <NewResumeDialog />
            <ResumeList resumeList={resumeList} />
        </div>
    );
}