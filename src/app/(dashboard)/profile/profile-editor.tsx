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
        <div className="flex flex-col gap-4 h-full w-1/2">

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


          </div>
      
          {/* Links */}
          {/* <h2 className="text-lg font-semibold mt-4 mb-2">Links</h2>
          <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
            <Label htmlFor="Github" className="text-right">Github</Label>
            <Input
              id="Github"
              name="Github"
              value={profile.Github}
              onChange={handleInputChange}
            />
      
            <Label htmlFor="Linkedin" className="text-right">LinkedIn</Label>
            <Input
              id="Linkedin"
              name="Linkedin"
              value={profile.Linkedin}
              onChange={handleInputChange}
            />
      
            <Label htmlFor="Portfolio" className="text-right">Portfolio</Label>
            <Input
              id="Portfolio"
              name="Portfolio"
              value={profile.Portfolio}
              onChange={handleInputChange}
            />
          </div> */}
      
          {/* Skills */}
          <h2 className="text-lg font-semibold mt-4 mb-2">Skills</h2>

          <ProfileSkills
            profile={profile}
            setProfile={setProfile}
          />
        
          {/* Add skills section here */}
        </div>
      );
    }