'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { FileText } from "lucide-react";
import { Resume } from "@/lib/types";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { createResume } from "@/app/actions";

export default function Dashboard({resumeList}: {resumeList: Resume[]}) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleCreateResume = async () => {
        const resumeName = document.getElementById('resumeName') as HTMLInputElement;
        const result = await createResume(resumeName.value);
        if (result.success) {
            setIsOpen(false);
            router.push(`/editor/${result.id}`);
        } else {
            // Handle error, maybe show an alert or set an error state
            console.error(result.message);
        }
    }


    return (
        <div className="gap-2 flex flex-col items-start">
             <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* New Resume Button */}
                <DialogTrigger asChild>
                    <Button className="h-12">
                        <FileText className="mr-2 h-4 w-4" />
                        New Resume
                    </Button>
                </DialogTrigger>

                {/* Dialog Content */}
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Name Your Resume</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input
                            id="resumeName"
                            placeholder="Enter resume name"
                        />
                    </div>
                    <Button onClick={handleCreateResume}>Continue</Button>
                </DialogContent>

            </Dialog>
            
            {/* <Button  className="h-12" onClick={() =>  router.push('/editor')}>
                <FileText className="mr-2 h-4 w-4" />
                New Resume
            </Button> */}

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