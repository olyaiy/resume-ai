'use client';

import { Resume, Profile, Job, DocumentSettings } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Suspense, useRef } from "react";
import { cn } from "@/lib/utils";
import { ResumeEditorActions } from "../actions/resume-editor-actions";
import { TailoredJobAccordion } from "../../management/cards/tailored-job-card";
import { BasicInfoForm } from "../forms/basic-info-form";
import ChatBot from "../../assistant/chatbot";
import { CoverLetterPanel } from "./cover-letter-panel";
import {
  WorkExperienceForm,
  EducationForm,
  SkillsForm,
  ProjectsForm,
  CertificationsForm,
  DocumentSettingsForm
} from '../dynamic-components';
import {LucideIcon } from "lucide-react";
import { ResumeEditorTabs } from "../header/resume-editor-tabs";

interface AccordionHeaderProps {
  icon: LucideIcon;
  label: string;
  iconColor: string;
  bgColor: string;
  textColor: string;
}

function AccordionHeader({ icon: Icon, label, iconColor, bgColor, textColor }: AccordionHeaderProps) {
  return (
    <AccordionTrigger className="px-4 py-2 hover:no-underline group">
      <div className="flex items-center gap-2">
        <div className={cn("p-1 rounded-md transition-transform duration-300 group-data-[state=open]:scale-105", bgColor)}>
          <Icon className={cn("h-3.5 w-3.5", iconColor)} />
        </div>
        <span className={cn("text-sm font-medium", textColor)}>{label}</span>
      </div>
    </AccordionTrigger>
  );
}

interface EditorPanelProps {
  resume: Resume;
  profile: Profile;
  job: Job | null;
  isLoadingJob: boolean;
  onResumeChange: (field: keyof Resume, value: Resume[keyof Resume]) => void;
}

export function EditorPanel({
  resume,
  profile,
  job,
  isLoadingJob,
  onResumeChange,
}: EditorPanelProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col mr-4 relative h-full max-h-full">
      <div className="flex-1 flex flex-col overflow-scroll">
        <ScrollArea className="flex-1 pr-2" ref={scrollAreaRef}>
          <div className="relative pb-12">
            <div className={cn(
              "sticky top-0 z-20 backdrop-blur-sm",
              resume.is_base_resume
                ? "bg-purple-50/80"
                : "bg-pink-100/90 shadow-sm shadow-pink-200/50"
            )}>
              <div className="flex flex-col gap-4">
                <ResumeEditorActions
                  onResumeChange={onResumeChange}
                />
              </div>
            </div>

            <Accordion type="single" collapsible defaultValue="basic" className="mt-6">
              <TailoredJobAccordion
                resume={resume}
                job={job}
                isLoading={isLoadingJob}
              />
            </Accordion>

            <Tabs defaultValue="basic" className="mb-4">
              <ResumeEditorTabs />
              <TabsContent value="basic">
                <BasicInfoForm
                  profile={profile}
                />
              </TabsContent>
              <TabsContent value="work">
                <Suspense fallback={
                  <div className="space-y-4 animate-pulse">
                    <div className="h-8 bg-muted rounded-md w-1/3" />
                    <div className="h-24 bg-muted rounded-md" />
                    <div className="h-24 bg-muted rounded-md" />
                  </div>
                }>
                  <WorkExperienceForm
                    experiences={resume.work_experience}
                    onChange={(experiences) => onResumeChange('work_experience', experiences)}
                    profile={profile}
                    targetRole={resume.target_role}
                  />
                </Suspense>
              </TabsContent>
              <TabsContent value="projects">
                <Suspense fallback={
                  <div className="space-y-4 animate-pulse">
                    <div className="h-8 bg-muted rounded-md w-1/3" />
                    <div className="h-24 bg-muted rounded-md" />
                  </div>
                }>
                  <ProjectsForm
                    projects={resume.projects}
                    onChange={(projects) => onResumeChange('projects', projects)}
                    profile={profile}
                  />
                </Suspense>
              </TabsContent>
              <TabsContent value="education">
                <Suspense fallback={
                  <div className="space-y-4 animate-pulse">
                    <div className="h-8 bg-muted rounded-md w-1/3" />
                    <div className="h-24 bg-muted rounded-md" />
                  </div>
                }>
                  <EducationForm
                    education={resume.education}
                    onChange={(education) => onResumeChange('education', education)}
                    profile={profile}
                  />
                  <CertificationsForm
                    certifications={resume.certifications}
                    onChange={(certifications) => onResumeChange('certifications', certifications)}
                  />
                </Suspense>
              </TabsContent>
              <TabsContent value="skills">
                <Suspense fallback={
                  <div className="space-y-4 animate-pulse">
                    <div className="h-8 bg-muted rounded-md w-1/3" />
                    <div className="h-24 bg-muted rounded-md" />
                  </div>
                }>
                  <SkillsForm
                    skills={resume.skills}
                    onChange={(skills) => onResumeChange('skills', skills)}
                    profile={profile}
                  />
                </Suspense>
              </TabsContent>
              <TabsContent value="settings">
                <Suspense fallback={
                  <div className="space-y-4 animate-pulse">
                    <div className="h-8 bg-muted rounded-md w-1/3" />
                    <div className="h-24 bg-muted rounded-md" />
                  </div>
                }>
                  <DocumentSettingsForm
                    documentSettings={resume.document_settings!}
                    onChange={(_field: 'document_settings', value: DocumentSettings) => {
                      onResumeChange('document_settings', value);
                    }}
                  />
                </Suspense>
              </TabsContent>
              <TabsContent value="cover-letter">
                <CoverLetterPanel
                  resume={resume}
                  job={job}
                  onResumeChange={onResumeChange}
                />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>

      <div className={cn(
        "absolute w-full bottom-0 rounded-lg border`", 
        resume.is_base_resume
          ? "bg-purple-50/50 border-purple-200/40"
          : "bg-pink-50/80 border-pink-300/50 shadow-sm shadow-pink-200/20"
      )}>
        <ChatBot 
          resume={resume} 
          onResumeChange={onResumeChange}
          job={job}
        />
      </div>
    </div>
  );
} 