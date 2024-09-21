import EditorLayout from '../editor-layout';
import { getProfile, getResume } from '@/app/actions';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const [data, resume] = await Promise.all([
        getProfile(),
        getResume(params.id)
    ]);

    if (!resume) {
        notFound();
    }

    if (resume.user !== data.id) {
        return <div>Unauthorized</div>;
    }
    
    return <EditorLayout resumeData={resume} />;
}