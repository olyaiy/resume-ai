'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { FileText } from "lucide-react";

export default function Dashboard() {
    const router = useRouter();

    return (
        <>
        <Button  className="h-12" onClick={() =>  router.push('/editor')}>
            <FileText className="mr-2 h-4 w-4" />
            New Resume
        </Button>
        </>
    );
}