import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { Brain } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

interface ImportMethodRadioItemProps extends ComponentPropsWithoutRef<'input'> {
  title: string;
  description: string;
  icon: React.ReactNode;
  checked?: boolean;
}

function ImportMethodRadioItem({
  title,
  description,
  icon,
  ...props
}: ImportMethodRadioItemProps) {
  return (
    <div className="h-full">
      <input
        type="radio"
        className="sr-only peer"
        {...props}
      />
      <div
        role="button"
        tabIndex={0}
        className={cn(
          "flex flex-col items-center justify-center rounded-xl p-4",
          "bg-white/80 border-2 shadow-sm h-full",
          "hover:border-pink-200 hover:bg-pink-50/50",
          "transition-all duration-300 cursor-pointer",
          "peer-checked:border-pink-500 peer-checked:bg-pink-50",
          "peer-checked:shadow-md peer-checked:shadow-pink-100",
          "focus:outline-none focus:ring-2 focus:ring-pink-500/50"
        )}
      >
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center mb-3">
            {icon}
          </div>
          <div className="font-semibold text-sm text-pink-950 mb-1.5">{title}</div>
          <span className="text-xs leading-relaxed text-gray-600">{description}</span>
        </div>
      </div>
    </div>
  );
}

interface ImportMethodRadioGroupProps {
  value: 'import-profile' | 'ai';
  onChange: (value: 'import-profile' | 'ai') => void;
}

export function ImportMethodRadioGroup({ value, onChange }: ImportMethodRadioGroupProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ImportMethodRadioItem
        name="tailorOption"
        value="ai"
        id="ai-tailor"
        checked={value === 'ai'}
        onChange={() => onChange('ai')}
        title="Tailor with AI"
        description="Let AI analyze the job description and optimize your resume for the best match"
        icon={<Brain className="h-6 w-6 text-pink-600" />}
      />
      
      <ImportMethodRadioItem
        name="tailorOption"
        value="import-profile"
        id="manual-tailor"
        checked={value === 'import-profile'}
        onChange={() => onChange('import-profile')}
        title="Copy Base Resume"
        description="Create an exact copy of your base resume and make your own modifications"
        icon={<Copy className="h-6 w-6 text-pink-600" />}
      />
    </div>
  );
} 