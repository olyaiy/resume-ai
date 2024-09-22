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
        className="w-full h-72"
        placeholder={`Example:
Languages: Python, JavaScript, Typescript, C, C++, Java, HTML, CSS, SQL, BASH

Frameworks/Libraries: React, ReactNative, NextJS, Express.js, Node.js, Mongoose, GraphQL, Tailwind, Vite

Developer Tools: Git, Docker, AWS (S3, EC2, ECS, Lambda), Linux, MSSQL, PostgreSQL, NGINX, REST APIs

Other Skills: Web development, Data processing, Data handling, Data analysis, Database management, Content management systems, Workflow creation`}
        rows={5}
      />
    </div>
  )
}

export default ProfileSkills