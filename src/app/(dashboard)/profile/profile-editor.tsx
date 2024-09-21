'use client';

import { useState } from 'react';
import { UserProfile, Skill, WorkExperience, Project, Education } from '@/lib/types';
import { updateProfile } from '@/app/actions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlusCircle, Trash2 } from "lucide-react";
import ProfileSkills from '@/components/profile/profile-skills';
import Work from '@/components/editor/work';
import ProfileWork from '@/components/profile/profile-work';
import ProfileProjects from '@/components/profile/profile-projects';
import ProfileEducation from '@/components/profile/profile-education';


export function ProfileEditor({ initialProfile }: { initialProfile: UserProfile }) {
    
    const [profile, setProfile] = useState<UserProfile>(initialProfile);
    const { toast } = useToast();


    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
          ...prevProfile,
          [name]: value,
        }));
    };

   

    return (
      <div className="flex flex-row p-8 gap-4">

        {/* Editor (Left Side) */}
        <div className="flex flex-col gap-4 w-1/2">
        <Textarea className='w-full h-auto min-h-[500px]' />
      </div>

        {/* Editor (Right Side) */}
        <div className="flex flex-col gap-4 w-1/2 ">

          {/* Personal Information */}
          <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
          
          <div className="grid grid-cols-[120px_1fr] gap-4 items-center">

            {/* First Name */}
            <Label htmlFor="first_name" className="text-right">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              value={profile.first_name}
              onChange={handleInputChange}
            />

            {/* Last Name */}
            <Label htmlFor="last_name" className="text-right">Last Name</Label>
            <Input
              id="last_name"
              name="last_name"
              value={profile.last_name}
              onChange={handleInputChange}
            />

            {/* Email */}
            <Label htmlFor="email" className="text-right">Email Address</Label>
            <Input
              id="email"
              name="email"
              value={profile.email} 
              onChange={handleInputChange}
            />


              {/* Github */}
              <Label htmlFor="github" className="text-right">Github Link</Label>
            <Input
              id="github"
              name="github"
              value={profile.Github} 
              onChange={handleInputChange}
            />

            {/* Linkedin */}
            <Label htmlFor="Linkedin" className="text-right">Linkedin Link</Label>
            <Input
              id="Linkedin"
              name="Linkedin"
              value={profile.Linkedin} 
              onChange={handleInputChange}
            />

            {/* Portfolio */}
            <Label htmlFor="Portfolio" className="text-right">Portfolio Link</Label>
            <Input
              id="Portfolio"
              name="Portfolio"
              value={profile.Portfolio} 
              onChange={handleInputChange}
            />


          </div>
      
          {/* Links */}

          
      
          {/* Skills */}
          <h2 className="text-lg font-semibold mt-4 mb-2">Skills</h2>

          <ProfileSkills
            profile={profile}
            setProfile={setProfile}
          />


          {/* Work  */}
          <ProfileWork
            profile={profile}
            setProfile={setProfile}
          />

          {/* Projects  */}
          <ProfileProjects
            profile={profile}
            setProfile={setProfile}
          />

          {/* Education History  */}
          <ProfileEducation
            profile={profile}
            setProfile={setProfile}
          />
        
          {/* Add skills section here */}
        </div>
      
        </div>
      );
    }