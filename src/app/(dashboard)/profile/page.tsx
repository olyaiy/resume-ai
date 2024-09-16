import { getProfile } from '@/app/actions';
import { UserProfile } from '@/lib/types';
import { ProfileEditor } from './profile-editor';

export default async function Page() {
    const data: UserProfile = await getProfile();
    
    return (
        <div className="space-y-8 p-4">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            <ProfileEditor initialProfile={data} />
        </div>
    );
}