import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DocumentSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react"
import { Switch } from "@/components/ui/switch";
import { SavedStylesDialog } from "./saved-styles-dialog";

interface DocumentSettingsFormProps {
  // resume: Resume;
  documentSettings: DocumentSettings;
  onChange: (field: 'document_settings', value: DocumentSettings) => void;
}

interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
}

function NumberInput({ value, onChange, min, max, step }: NumberInputProps) {
  const increment = () => {
    const newValue = Math.min(max, value + step)
    onChange(Number(newValue.toFixed(2)))
  }

  const decrement = () => {
    const newValue = Math.max(min, value - step)
    onChange(Number(newValue.toFixed(2)))
  }

  const displayValue = Number(value.toFixed(2))

  return (
    <div className="flex items-center space-x-1">
      <span className="text-xs text-muted-foreground/60 w-8">{displayValue}</span>
      <div className="flex flex-col">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-4 w-4 hover:bg-slate-100"
          onClick={increment}
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-4 w-4 hover:bg-slate-100"
          onClick={decrement}
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}

export function DocumentSettingsForm({ documentSettings, onChange }: DocumentSettingsFormProps) {

  const defaultSettings = {
    // Global Settings
    document_font_size: 10,
    document_line_height: 1.5,
    document_margin_vertical: 36,
    document_margin_horizontal: 36,

    // Header Settings
    header_name_size: 24,
    header_name_bottom_spacing: 24,

    // Skills Section
    skills_margin_top: 2,
    skills_margin_bottom: 2,
    skills_margin_horizontal: 0,
    skills_item_spacing: 2,

    // Experience Section
    experience_margin_top: 2,
    experience_margin_bottom: 2,
    experience_margin_horizontal: 0,
    experience_item_spacing: 4,

    // Projects Section
    projects_margin_top: 2,
    projects_margin_bottom: 2,
    projects_margin_horizontal: 0,
    projects_item_spacing: 4,

    // Education Section
    education_margin_top: 2,
    education_margin_bottom: 2,
    education_margin_horizontal: 0,
    education_item_spacing: 4,
  };

  // Initialize document_settings if it doesn't exist
  if (!documentSettings) {
    onChange('document_settings', defaultSettings);
    return null; // Return null while initializing to prevent errors
  }

  const handleSettingsChange = (newSettings: DocumentSettings) => {

    onChange('document_settings', newSettings);
  };

  const handleFontSizeChange = (value: number) => {
    const newSettings: DocumentSettings = {
      ...documentSettings, // Don't spread defaultSettings here
      document_font_size: value
    };
    handleSettingsChange(newSettings);
  };

  const handleRestoreDefaults = () => {
    handleSettingsChange(defaultSettings);
  };

  const SectionSettings = ({ title, section }: { title: string; section: 'skills' | 'experience' | 'projects' | 'education' }) => (
    <div className="space-y-4 bg-slate-50/50 rounded-lg border border-slate-200/50">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-muted-foreground">Space Above {title} Section</Label>
          <div className="flex items-center">
            <NumberInput
              value={documentSettings?.[`${section}_margin_top`] ?? 2}
              min={0}
              max={48}
              step={1}
              onChange={(value) => 
                handleSettingsChange({
                  ...documentSettings,
                  [`${section}_margin_top`]: value
                })
              }
            />
            <span className="text-xs text-muted-foreground/60 ml-1">pt</span>
          </div>
        </div>
        <Slider
          value={[Number(documentSettings?.[`${section}_margin_top`] ?? 2)]}
          min={0}
          max={48}
          step={1}
          onValueChange={([value]) => 
            handleSettingsChange({
              ...documentSettings,
              [`${section}_margin_top`]: value
            })
          }
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-muted-foreground">Space Below {title} Section</Label>
          <div className="flex items-center">
            <NumberInput
              value={documentSettings?.[`${section}_margin_bottom`] ?? 2}
              min={0}
              max={48}
              step={1}
              onChange={(value) => 
                handleSettingsChange({
                  ...documentSettings,
                  [`${section}_margin_bottom`]: value
                })
              }
            />
            <span className="text-xs text-muted-foreground/60 ml-1">pt</span>
          </div>
        </div>
        <Slider
          value={[Number(documentSettings?.[`${section}_margin_bottom`] ?? 2)]}
          min={0}
          max={48}
          step={1}
          onValueChange={([value]) => 
            handleSettingsChange({
              ...documentSettings,
              [`${section}_margin_bottom`]: value
            })
          }
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-muted-foreground">Horizontal Margins</Label>
          <div className="flex items-center">
            <NumberInput
              value={documentSettings?.[`${section}_margin_horizontal`] ?? 0}
              min={0}
              max={72}
              step={2}
              onChange={(value) => 
                handleSettingsChange({
                  ...documentSettings,
                  [`${section}_margin_horizontal`]: value
                })
              }
            />
            <span className="text-xs text-muted-foreground/60 ml-1">pt</span>
          </div>
        </div>
        <Slider
          value={[Number(documentSettings?.[`${section}_margin_horizontal`] ?? 0)]}
          min={0}
          max={72}
          step={2}
          onValueChange={([value]) => 
            handleSettingsChange({
              ...documentSettings,
              [`${section}_margin_horizontal`]: value
            })
          }
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-muted-foreground">Space Between Items</Label>
          <div className="flex items-center">
            <NumberInput
              value={documentSettings?.[`${section}_item_spacing`] ?? 4}
              min={0}
              max={16}
              step={0.5}
              onChange={(value) => 
                handleSettingsChange({
                  ...documentSettings,
                  [`${section}_item_spacing`]: value
                })
              }
            />
            <span className="text-xs text-muted-foreground/60 ml-1">pt</span>
          </div>
        </div>
        <Slider
          value={[Number(documentSettings?.[`${section}_item_spacing`] ?? 4)]}
          min={0}
          max={16}
          step={0.5}
          onValueChange={([value]) => 
            handleSettingsChange({
              ...documentSettings,
              [`${section}_item_spacing`]: value
            })
          }
        />
      </div>
    </div>
  );

  return (
    <div className="">
        <Card className="">

        {/* Buttons */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center space-x-2  w-full">
            <SavedStylesDialog
              currentSettings={documentSettings || defaultSettings}
              onApplyStyle={(settings) => handleSettingsChange(settings)}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestoreDefaults}
              className="text-xs text-muted-foreground hover:text-teal-600 border-slate-400 hover:border-teal-600 transition-colors w-full"
            >
              Restore Defaults
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-6 ">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Footer Options
              </Label>
              <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-teal-200/20 via-cyan-200/20 to-transparent" />
            </div>

            <div className="space-y-2 bg-slate-50/50 rounded-lg  border border-slate-200/50">
              <div className="flex items-center justify-between space-x-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Show UBC Science Co-op Footer
                </Label>
                <Switch
                  checked={documentSettings?.show_ubc_footer ?? false}
                  onCheckedChange={(checked) =>
                    handleSettingsChange({
                      ...documentSettings,
                      show_ubc_footer: checked,
                    })
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground/60 mt-2">
                By enabling this footer, I confirm that I am a UBC Faculty of Science Co-op student and acknowledge that I am responsible for ensuring appropriate use of UBC branding in my resume.
              </p>
              
              {/* Footer Width Control - Only shown when footer is enabled */}
              {documentSettings?.show_ubc_footer && (
                <div className="space-y-2 mt-4 pt-4 border-t border-slate-200/50">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-muted-foreground">Footer Width</Label>
                    <div className="flex items-center">
                      <NumberInput
                        value={documentSettings?.footer_width ?? 95}
                        min={50}
                        max={100}
                        step={1}
                        onChange={(value) => 
                          handleSettingsChange({
                            ...documentSettings,
                            footer_width: value
                          })
                        }
                      />
                      <span className="text-xs text-muted-foreground/60 ml-1">%</span>
                    </div>
                  </div>
                  <Slider
                    value={[documentSettings?.footer_width ?? 95]}
                    min={50}
                    max={100}
                    step={1}
                    onValueChange={([value]) => 
                      handleSettingsChange({
                        ...documentSettings,
                        footer_width: value
                      })
                    }
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-muted-foreground/40">Narrow</span>
                    <span className="text-[10px] text-muted-foreground/40">Full Width</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Global Document Settings */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Document</Label>
              <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-teal-200/20 via-cyan-200/20 to-transparent" />
            </div>

            <div className="space-y-4 bg-slate-50/50 rounded-lg p-4 border border-slate-200/50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-muted-foreground">Font Size</Label>
                  <div className="flex items-center">
                    <NumberInput
                      value={documentSettings?.document_font_size ?? 10}
                      min={8}
                      max={12}
                      step={0.5}
                      onChange={handleFontSizeChange}
                    />
                    <span className="text-xs text-muted-foreground/60 ml-1">pt</span>
                  </div>
                </div>
                <Slider
                  value={[documentSettings?.document_font_size ?? 10]}
                  min={8}
                  max={12}
                  step={0.5}
                  onValueChange={([value]) => 
                    handleSettingsChange({
                      ...documentSettings,
                      document_font_size: value
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-muted-foreground">Line Height</Label>
                  <div className="flex items-center">
                    <NumberInput
                      value={documentSettings?.document_line_height ?? 1.5}
                      min={1}
                      max={2}
                      step={0.1}
                      onChange={(value) => 
                        handleSettingsChange({
                          ...documentSettings,
                          document_line_height: value
                        })
                      }
                    />
                    <span className="text-xs text-muted-foreground/60 ml-1">x</span>
                  </div>
                </div>
                <Slider
                  value={[documentSettings?.document_line_height ?? 1.5]}
                  min={1}
                  max={2}
                  step={0.1}
                  onValueChange={([value]) => 
                    handleSettingsChange({
                      ...documentSettings,
                      document_line_height: value
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-muted-foreground">Vertical Margins</Label>
                  <div className="flex items-center">
                    <NumberInput
                      value={documentSettings?.document_margin_vertical ?? 36}
                      min={18}
                      max={108}
                      step={2}
                      onChange={(value) => 
                        handleSettingsChange({
                          ...documentSettings,
                          document_margin_vertical: value
                        })
                      }
                    />
                    <span className="text-xs text-muted-foreground/60 ml-1">pt</span>
                  </div>
                </div>
                <Slider
                  value={[documentSettings?.document_margin_vertical ?? 36]}
                  min={18}
                  max={108}
                  step={2}
                  onValueChange={([value]) => 
                    handleSettingsChange({
                      ...documentSettings,
                      document_margin_vertical: value
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-muted-foreground">Horizontal Margins</Label>
                  <div className="flex items-center">
                    <NumberInput
                      value={documentSettings?.document_margin_horizontal ?? 36}
                      min={18}
                      max={108}
                      step={2}
                      onChange={(value) => 
                        handleSettingsChange({
                          ...documentSettings,
                          document_margin_horizontal: value
                        })
                      }
                    />
                    <span className="text-xs text-muted-foreground/60 ml-1">pt</span>
                  </div>
                </div>
                <Slider
                  value={[documentSettings?.document_margin_horizontal ?? 36]}
                  min={18}
                  max={108}
                  step={2}
                  onValueChange={([value]) => 
                    handleSettingsChange({
                      ...documentSettings,
                      document_margin_horizontal: value
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Header Settings */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Header</Label>
              <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-teal-200/20 via-cyan-200/20 to-transparent" />
            </div>

            <div className="space-y-4 bg-slate-50/50 rounded-lg p-4 border border-slate-200/50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-muted-foreground">Name Size</Label>
                  <div className="flex items-center">
                    <NumberInput
                      value={documentSettings?.header_name_size ?? 24}
                      min={0}
                      max={40}
                      step={1}
                      onChange={(value) => 
                        handleSettingsChange({
                          ...documentSettings,
                          header_name_size: value
                        })
                      }
                    />
                    <span className="text-xs text-muted-foreground/60 ml-1">pt</span>
                  </div>
                </div>
                <Slider
                  value={[documentSettings?.header_name_size ?? 24]}
                  min={0}
                  max={40}
                  step={1}
                  onValueChange={([value]) => 
                    handleSettingsChange({
                      ...documentSettings,
                      header_name_size: value
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-muted-foreground">Space Below Name</Label>
                  <div className="flex items-center">
                    <NumberInput
                      value={documentSettings?.header_name_bottom_spacing ?? 24}
                      min={0}
                      max={50}
                      step={1}
                      onChange={(value) => 
                        handleSettingsChange({
                          ...documentSettings,
                          header_name_bottom_spacing: value
                        })
                      }
                    />
                    <span className="text-xs text-muted-foreground/60 ml-1">pt</span>
                  </div>
                </div>
                <Slider
                  value={[documentSettings?.header_name_bottom_spacing ?? 24]}
                  min={0}
                  max={50}
                  step={1}
                  onValueChange={([value]) => 
                    handleSettingsChange({
                      ...documentSettings,
                      header_name_bottom_spacing: value
                    })
                  }
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-muted-foreground/40">Compact</span>
                  <span className="text-[10px] text-muted-foreground/40">Spacious</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Skills</Label>
              <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-teal-200/20 via-cyan-200/20 to-transparent" />
            </div>
            <SectionSettings title="Skills" section="skills" />
          </div>

          {/* Experience Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Experience</Label>
              <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-teal-200/20 via-cyan-200/20 to-transparent" />
            </div>
            <SectionSettings title="Experience" section="experience" />
          </div>

          {/* Projects Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Projects</Label>
              <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-teal-200/20 via-cyan-200/20 to-transparent" />
            </div>
            <SectionSettings title="Projects" section="projects" />
          </div>

          {/* Education Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Education</Label>
              <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-teal-200/20 via-cyan-200/20 to-transparent" />
            </div>
            <SectionSettings title="Education" section="education" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 