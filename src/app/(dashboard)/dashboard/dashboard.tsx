'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { FileText } from "lucide-react";
import { Resume } from "@/lib/types";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Dashboard({resumeList}: {resumeList: Resume[]}) {
    const router = useRouter();

    return (
        <div className="gap-2 flex flex-col items-start">
            <Button  className="h-12" onClick={() =>  router.push('/editor')}>
                <FileText className="mr-2 h-4 w-4" />
                New Resume
            </Button>

            <div className="">
                {resumeList.map((resume: any)=>{
                    return (
                        <Link href={`/editor/${resume.id}`} key={resume.id}>
                            <Card className="flex flex-col w-[300px] h-[300px] items-center justify-end p-4 gap-2">
                                <div className="text-lg">{resume.resume_name}</div>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}