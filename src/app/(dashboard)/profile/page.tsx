import { getProfile } from '@/app/actions';
import { UserProfile } from '@/lib/types';
import { ProfileEditor } from './profile-editor';

export default async function Page() {
    const data: UserProfile = await getProfile();
    
    return (
        <div className="space-y-8 p-4">
            <ProfileEditor initialProfile={data} />
        </div>
    );
}