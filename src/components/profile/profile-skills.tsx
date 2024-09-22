import { UserProfile } from '@/lib/types'
import React from 'react'
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

const ProfileSkills = ({ profile, setProfile }: { profile: UserProfile, setProfile: React.Dispatch<React.SetStateAction<UserProfile>> }) => {
  const handleSkillsChange = (value: string) => {
    setProfile(prevProfile => ({ ...prevProfile, skills: value }));
  };

  return (
    <div className="space-y-2">
      <Textarea
        id="skills"
        value={profile.skills}
        onChange={(e) => handleSkillsChange(e.target.value)}
        className="w-full"
        placeholder="Enter your skills (comma-separated)"
        rows={5}
      />
    </div>
  )
}

export default ProfileSkills