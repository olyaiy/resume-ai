import { Profile } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Edit2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ProfileCardProps {
  profile: Profile;
}

function calculateProfileCompletion(profile: Profile): number {
  const sections = [
    !!profile.first_name && !!profile.last_name, // Basic info
    !!profile.email,
    !!profile.phone_number,
    !!profile.location,
    profile.work_experience.length > 0,
    profile.education.length > 0,
    profile.skills.length > 0,
    profile.projects.length > 0
  ];

  const completedSections = sections.filter(Boolean).length;
  return Math.round((completedSections / sections.length) * 100);
}

function getMissingSections(profile: Profile): string[] {
  const missing: string[] = [];
  
  if (!profile.first_name || !profile.last_name) missing.push('Basic Info');
  if (!profile.email) missing.push('Email');
  if (!profile.phone_number) missing.push('Phone Number');
  if (!profile.location) missing.push('Location');
  if (profile.work_experience.length === 0) missing.push('Work Experience');
  if (profile.education.length === 0) missing.push('Education');
  if (profile.skills.length === 0) missing.push('Skills');
  if (profile.projects.length === 0) missing.push('Projects');
  
  return missing;
}

function getProfileStatus(completion: number): {
  label: string;
  color: {
    bg: string;
    text: string;
    border: string;
  };
} {
  if (completion >= 90) return { 
    label: 'Complete',
    color: {
      bg: 'bg-green-500/10 hover:bg-green-500/20',
      text: 'text-green-600',
      border: 'border-green-500/20 hover:border-green-500/30'
    }
  };
  if (completion >= 70) return { 
    label: 'Almost Complete',
    color: {
      bg: 'bg-blue-500/10 hover:bg-blue-500/20',
      text: 'text-blue-600',
      border: 'border-blue-500/20 hover:border-blue-500/30'
    }
  };
  if (completion >= 40) return { 
    label: 'In Progress',
    color: {
      bg: 'bg-yellow-500/10 hover:bg-yellow-500/20',
      text: 'text-yellow-600',
      border: 'border-yellow-500/20 hover:border-yellow-500/30'
    }
  };
  return { 
    label: 'Just Started',
    color: {
      bg: 'bg-gray-500/10 hover:bg-gray-500/20',
      text: 'text-gray-600',
      border: 'border-gray-500/20 hover:border-gray-500/30'
    }
  };
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const completion = calculateProfileCompletion(profile);
  const status = getProfileStatus(completion);
  const missingSections = getMissingSections(profile);

  return (
    <Card className="overflow-hidden border-white/40 shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-300">
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_14px] opacity-20" />
        </div>
        
        {/* Content Container */}
        <div className="relative px-6 py-4 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/10">
              <User className="h-5 w-5 text-teal-600" />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Profile
                </h2>
                <p className="text-xs text-muted-foreground">
                  Master information
                </p>
              </div>
              <Badge 
                variant="outline" 
                className={`${status.color.bg} ${status.color.text} ${status.color.border} flex items-center gap-1.5 transition-all duration-300 ml-1`}
              >
                <Sparkles className="h-3 w-3" />
                {status.label}
              </Badge>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Progress Section */}
            <div className="flex items-center gap-4">
              <div className="w-32">
                <Progress value={completion} className="h-2" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`font-medium ${status.color.text} text-sm tabular-nums`}>{completion}%</span>
                {completion < 100 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className="bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/20 transition-colors cursor-help text-xs"
                        >
                          {missingSections.length} missing
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1.5">
                          <p className="font-medium text-sm">Missing sections:</p>
                          <div className="flex flex-wrap gap-1">
                            {missingSections.map((section, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-[10px] py-0"
                              >
                                {section}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            <Link href="/profile">
              <Button 
                size="sm"
                variant="outline" 
                className="bg-white/50 border-teal-200 hover:border-teal-300 hover:bg-white/60 transition-all duration-300"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
} 