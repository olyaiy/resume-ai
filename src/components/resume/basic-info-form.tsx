'use client';

import { Resume, Profile } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, User, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BasicInfoFormProps {
  resume: Resume | Profile;
  profile?: Profile;
  onChange: (field: keyof (Resume | Profile), value: string) => void;
}

export function BasicInfoForm({ resume, profile, onChange }: BasicInfoFormProps) {
  const handleFillFromProfile = () => {
    if (!profile) return;
    
    // List of fields to copy from profile
    const fieldsToFill: (keyof Profile)[] = [
      'first_name',
      'last_name',
      'email',
      'phone_number',
      'location',
      'website',
      'linkedin_url',
      'github_url'
    ];

    // Copy each field if it exists in the profile
    fieldsToFill.forEach((field) => {
      if (profile[field]) {
        onChange(field, profile[field] as string);
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card className="relative group bg-gradient-to-r from-teal-500/5 via-teal-500/10 to-cyan-500/5 backdrop-blur-md border border-teal-500/30 hover:border-teal-500/40 hover:shadow-lg transition-all duration-300 shadow-sm">
        <CardContent className="p-3 sm:p-4">
          {profile && (
            <div className="mb-3 sm:mb-4">
              <Button
                onClick={handleFillFromProfile}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm hover:from-teal-700 hover:to-cyan-700 transition-all duration-500 shadow-md hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5"
              >
                <UserCircle2 className="mr-2 h-3.5 w-3.5" />
                Fill from Profile
              </Button>
            </div>
          )}

          <div className="space-y-2 sm:space-y-3">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* First Name */}
              <div className="relative group">
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <div className="p-1 rounded-full bg-teal-100/80 transition-transform duration-300 group-focus-within:scale-110">
                    <User className="h-3.5 w-3.5 text-teal-600" />
                  </div>
                </div>
                <Input
                  value={resume.first_name || ''}
                  onChange={(e) => onChange('first_name', e.target.value)}
                  className="pr-10 text-sm font-medium bg-white/50 border-gray-200 rounded-lg h-9
                    focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                    hover:border-teal-500/30 hover:bg-white/60 transition-colors
                    placeholder:text-gray-400"
                  placeholder="First Name"
                />
                <div className="absolute -top-2 left-2 px-1 bg-white/80 text-[9px] font-medium text-teal-700">
                  FIRST NAME
                </div>
              </div>

              {/* Last Name */}
              <div className="relative group">
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <div className="p-1 rounded-full bg-teal-100/80 transition-transform duration-300 group-focus-within:scale-110">
                    <User className="h-3.5 w-3.5 text-teal-600" />
                  </div>
                </div>
                <Input
                  value={resume.last_name || ''}
                  onChange={(e) => onChange('last_name', e.target.value)}
                  className="pr-10 text-sm font-medium bg-white/50 border-gray-200 rounded-lg h-9
                    focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                    hover:border-teal-500/30 hover:bg-white/60 transition-colors
                    placeholder:text-gray-400"
                  placeholder="Last Name"
                />
                <div className="absolute -top-2 left-2 px-1 bg-white/80 text-[9px] font-medium text-teal-700">
                  LAST NAME
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="relative group">
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <div className="p-1 rounded-full bg-teal-100/80 transition-transform duration-300 group-focus-within:scale-110">
                  <Mail className="h-3.5 w-3.5 text-teal-600" />
                </div>
              </div>
              <Input
                type="email"
                value={resume.email || ''}
                onChange={(e) => onChange('email', e.target.value)}
                className="pr-10 text-sm bg-white/50 border-gray-200 rounded-lg h-9
                  focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                  hover:border-teal-500/30 hover:bg-white/60 transition-colors
                  placeholder:text-gray-400"
                placeholder="email@example.com"
              />
              <div className="absolute -top-2 left-2 px-1 bg-white/80 text-[9px] font-medium text-teal-700">
                EMAIL
              </div>
            </div>

            {/* Phone */}
            <div className="relative group">
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <div className="p-1 rounded-full bg-teal-100/80 transition-transform duration-300 group-focus-within:scale-110">
                  <Phone className="h-3.5 w-3.5 text-teal-600" />
                </div>
              </div>
              <Input
                type="tel"
                value={resume.phone_number || ''}
                onChange={(e) => onChange('phone_number', e.target.value)}
                className="pr-10 text-sm bg-white/50 border-gray-200 rounded-lg h-9
                  focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                  hover:border-teal-500/30 hover:bg-white/60 transition-colors
                  placeholder:text-gray-400"
                placeholder="+1 (555) 000-0000"
              />
              <div className="absolute -top-2 left-2 px-1 bg-white/80 text-[9px] font-medium text-teal-700">
                PHONE
              </div>
            </div>

            {/* Location */}
            <div className="relative group">
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <div className="p-1 rounded-full bg-teal-100/80 transition-transform duration-300 group-focus-within:scale-110">
                  <MapPin className="h-3.5 w-3.5 text-teal-600" />
                </div>
              </div>
              <Input
                value={resume.location || ''}
                onChange={(e) => onChange('location', e.target.value)}
                className="pr-10 text-sm bg-white/50 border-gray-200 rounded-lg h-9
                  focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                  hover:border-teal-500/30 hover:bg-white/60 transition-colors
                  placeholder:text-gray-400"
                placeholder="City, State, Country"
              />
              <div className="absolute -top-2 left-2 px-1 bg-white/80 text-[9px] font-medium text-teal-700">
                LOCATION
              </div>
            </div>

            {/* Online Presence */}
            <div className="space-y-2 sm:space-y-3">
              {/* Website */}
              <div className="relative group">
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <div className="p-1 rounded-full bg-teal-100/80 transition-transform duration-300 group-focus-within:scale-110">
                    <Globe className="h-3.5 w-3.5 text-teal-600" />
                  </div>
                </div>
                <Input
                  type="url"
                  value={resume.website || ''}
                  onChange={(e) => onChange('website', e.target.value)}
                  className="pr-10 text-sm bg-white/50 border-gray-200 rounded-lg h-9
                    focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                    hover:border-teal-500/30 hover:bg-white/60 transition-colors
                    placeholder:text-gray-400"
                  placeholder="https://your-website.com"
                />
                <div className="absolute -top-2 left-2 px-1 bg-white/80 text-[9px] font-medium text-teal-700">
                  WEBSITE
                </div>
              </div>

              {/* LinkedIn */}
              <div className="relative group">
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <div className="p-1 rounded-full bg-teal-100/80 transition-transform duration-300 group-focus-within:scale-110">
                    <Linkedin className="h-3.5 w-3.5 text-teal-600" />
                  </div>
                </div>
                <Input
                  type="url"
                  value={resume.linkedin_url || ''}
                  onChange={(e) => onChange('linkedin_url', e.target.value)}
                  className="pr-10 text-sm bg-white/50 border-gray-200 rounded-lg h-9
                    focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                    hover:border-teal-500/30 hover:bg-white/60 transition-colors
                    placeholder:text-gray-400"
                  placeholder="https://linkedin.com/in/username"
                />
                <div className="absolute -top-2 left-2 px-1 bg-white/80 text-[9px] font-medium text-teal-700">
                  LINKEDIN
                </div>
              </div>

              {/* GitHub */}
              <div className="relative group">
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <div className="p-1 rounded-full bg-teal-100/80 transition-transform duration-300 group-focus-within:scale-110">
                    <Github className="h-3.5 w-3.5 text-teal-600" />
                  </div>
                </div>
                <Input
                  type="url"
                  value={resume.github_url || ''}
                  onChange={(e) => onChange('github_url', e.target.value)}
                  className="pr-10 text-sm bg-white/50 border-gray-200 rounded-lg h-9
                    focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                    hover:border-teal-500/30 hover:bg-white/60 transition-colors
                    placeholder:text-gray-400"
                  placeholder="https://github.com/username"
                />
                <div className="absolute -top-2 left-2 px-1 bg-white/80 text-[9px] font-medium text-teal-700">
                  GITHUB
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 