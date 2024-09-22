'use client';

import { useState } from 'react';
import { UserProfile, Skill, WorkExperience, Project, Education } from '@/lib/types';
import { updateProfile } from '@/app/actions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ProfileSkills from '@/components/profile/profile-skills';
import Work from '@/components/editor/work';
import ProfileWork from '@/components/profile/profile-work';
import ProfileProjects from '@/components/profile/profile-projects';
import ProfileEducation from '@/components/profile/profile-education';
import { ClearProfileButton } from '@/components/profile/reset-profile';
import { generateEducationHistory, generatePersonalInfo, generateProjects, generateSkills, generateWorkExperience } from '@/lib/ai-actions';
import { Loader2 } from "lucide-react"; // Add this import

export function ProfileEditor({ initialProfile }: { initialProfile: UserProfile }) {
    
    const [profile, setProfile] = useState<UserProfile>(initialProfile);
    const [aiPrompt, setAiPrompt] = useState('');
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false); // Add this state

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
          ...prevProfile,
          [name]: value,
        }));
    };

    const handleAIFill = async () => {
      setIsLoading(true); // Set loading to true when starting
      try {
        const personalInfoResult = await generatePersonalInfo(`make this into a json format:${aiPrompt}`);
        const educationResult = await generateEducationHistory(`make this into a json format:${aiPrompt}`);
        const workExperienceResult = await generateWorkExperience(`make this into a json format:${aiPrompt}`);
        const projectsResult = await generateProjects(`make this into a json format:${aiPrompt}`);
        const skillsResult = await generateSkills(`make this into a json format:${aiPrompt}`);
        
        if (educationResult?.education_history && workExperienceResult?.work_experience) {
          setProfile(prevProfile => ({
            ...prevProfile,
            education_history: educationResult.education_history,
            work_history: workExperienceResult.work_experience,
            skills: skillsResult.skills,
            projects: projectsResult.projects,
            first_name: personalInfoResult.first_name,
            last_name: personalInfoResult.last_name,
            Github: personalInfoResult.Github || prevProfile.Github,
            Linkedin: personalInfoResult.Linkedin || prevProfile.Linkedin,
            Portfolio: personalInfoResult.Portfolio || prevProfile.Portfolio,
            
          }));
          console.log("Updated profile:", {
            education_history: educationResult.education_history,
            work_history: workExperienceResult.work_experience
          });
          toast({
            title: "Success",
            description: "Education history and work experience updated with AI-generated content",
            variant: "default",
          });
        } else {
          throw new Error("Invalid response from AI");
        }
      } catch (error) {
        console.error("Error generating profile content:", error);
        toast({
          title: "Error",
          description: "Failed to generate profile content",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false); // Set loading to false when done
      }
    };

    return (
      <div className="flex flex-col relative">
        

        {/* sticky bar */}
        <div className="w-full flex flex-row justify-between sticky top-0 z-10 bg-card border-2 border-border px-4 py-2 items-center rounded-md">
          <h1>User Profile</h1>

          <div className="flex gap-2">

             {/* Button to clear profile */}
            <ClearProfileButton profile={profile} setProfile={setProfile} />
            
            {/* Button to save profile */}
            <Button
              onClick={async () => {
                const result = await updateProfile(profile);
                if (result.success) {
                  toast({
                    title: "Success",
                    description: result.message,
                    variant: "default",
                  });
                } else {
                  toast({
                    title: "Error",
                    description: result.message,
                    variant: "destructive",
                  });
                }
              }}
            >
              Save Profile Info
            </Button>

           

          </div>


        </div>

        <div className="flex flex-row p-8 gap-4">

          

          {/* Editor (Left Side) */}
          <div className="flex flex-col gap-4 w-1/2">
            <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
            <h3>Paste your information here</h3>
            <Button 
              className='w-full'
              onClick={handleAIFill}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Fill Profile With AI'
              )}
            </Button>

            <Textarea 
              className='w-full h-auto min-h-[500px]' 
              placeholder='Copy and paste your linkedin profile, previous resumes, or anything else about yourself here!'
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
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
        </div>
      );
    }