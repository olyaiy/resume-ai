'use client';

import { useState } from 'react';
import { UserProfile } from '@/lib/types';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

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
      setIsLoading(true);
      try {
        const [workExperienceResult, projectsResult] = await Promise.all([
          generateWorkExperience(aiPrompt),
          generateProjects(aiPrompt)
        ]);

        console.log('Work Experience Result:', workExperienceResult);
        console.log('Projects Result:', projectsResult);

        setProfile(prevProfile => ({
          ...prevProfile,
          work_history: Array.isArray(workExperienceResult) ? workExperienceResult : prevProfile.work_history,
          projects: Array.isArray(projectsResult) ? projectsResult : prevProfile.projects
        }));

        console.log('Updated profile:', {
          work_history: Array.isArray(workExperienceResult) ? workExperienceResult : 'No change',
          projects: Array.isArray(projectsResult) ? projectsResult : 'No change'
        });

      } catch (error) {
        console.error("Error generating profile data:", error);
        toast({
          title: "Error",
          description: "Failed to generate profile data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
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

          <div className="flex flex-col mt-4 px-8 py-4 ">
              <p className="text-md font-semibold">
                Paste In your Linkedin Profile, Resume, or anything else about yourself Here. Our 
                AI will separate the information into different sections for your resumes.
                Then, whenever you create a new resume, our AI will generate 
                bullet points, quantified achievements, descriptions, and skills, from each section.
              </p>

            <Alert className="my-4">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>
              <div className="flex flex-col gap-4">
              

                It's okay if the data here is unstructured! We'll do the work to extract it for you during resume generation.
                This is just to get your information saved so we can use it to generate your resumes later on.
                </div>
             
              </AlertDescription>
            </Alert>

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

            <Accordion type="multiple" defaultValue={["personal", "skills", "work", "projects", "education"]} className="w-full">
              <AccordionItem value="personal">
                <AccordionTrigger>Personal Information</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">

                    {/* First Name */}
                    <div className="flex items-center">
                      <Label htmlFor="first_name" className="w-32">First Name</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={profile.first_name}
                        onChange={handleInputChange}
                        className="flex-grow"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex items-center">
                      <Label htmlFor="last_name" className="w-32">Last Name</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        value={profile.last_name}
                        onChange={handleInputChange}
                        className="flex-grow"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex items-center">
                      <Label htmlFor="email" className="w-32">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        value={profile.email} 
                        onChange={handleInputChange}
                        className="flex-grow"
                      />
                    </div>

                    {/* Github */}
                    <div className="flex items-center">
                      <Label htmlFor="github" className="w-32">Github Link</Label>
                      <Input
                        id="github"
                        name="github"
                        value={profile.Github} 
                        onChange={handleInputChange}
                        className="flex-grow"
                      />
                    </div>

                    {/* Linkedin */}
                    <div className="flex items-center">
                      <Label htmlFor="Linkedin" className="w-32">Linkedin Link</Label>
                      <Input
                        id="Linkedin"
                        name="Linkedin"
                        value={profile.Linkedin} 
                        onChange={handleInputChange}
                        className="flex-grow"
                      />
                    </div>

                    {/* Portfolio */}
                    <div className="flex items-center">
                      <Label htmlFor="Portfolio" className="w-32">Portfolio Link</Label>
                      <Input
                        id="Portfolio"
                        name="Portfolio"
                        value={profile.Portfolio} 
                        onChange={handleInputChange}
                        className="flex-grow"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="skills">
                <AccordionTrigger>Skills</AccordionTrigger>
                <AccordionContent>
                  <ProfileSkills
                    profile={profile}
                    setProfile={setProfile}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="work">
                <AccordionTrigger>Work Experience</AccordionTrigger>
                <AccordionContent>
                  <ProfileWork
                    profile={profile}
                    setProfile={setProfile}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="projects">
                <AccordionTrigger>Projects</AccordionTrigger>
                <AccordionContent>
                  <ProfileProjects
                    profile={profile}
                    setProfile={setProfile}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="education">
                <AccordionTrigger>Education History</AccordionTrigger>
                <AccordionContent>
                  <ProfileEducation
                    profile={profile}
                    setProfile={setProfile}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        
          </div>
        </div>
      );
    }