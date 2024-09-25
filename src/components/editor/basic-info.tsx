import { Resume } from "@/lib/types";
import { Input } from "../ui/input";

export default function BasicInfo({resume, setResume}: {resume: Resume, setResume: (resume: Resume) => void}) {
    // Event handler for input change
    const handleInputChange = (field: keyof Resume, value: string) => {
        setResume({
            ...resume,
            [field]: value,
        });
    };

    return (
        <>
            {/* Basic Information */}
            <div className="space-y-2 bg-card p-4 border rounded">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                <div className="flex items-center space-x-2">
                    <label className="w-24">Name:</label>
                    <Input
                        type="text"
                        value={resume.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="flex-grow p-2 border rounded"
                        placeholder="Name"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <label className="w-24">Resume Name:</label>
                    <Input
                        type="text"
                        value={resume.resume_name}
                        onChange={(e) => handleInputChange('resume_name', e.target.value)}
                        className="flex-grow p-2 border rounded"
                        placeholder="Resume Name"
                    />
                </div>
                {/* New fields */}
                <div className="flex items-center space-x-2">
                    <label className="w-24">Email:</label>
                    <Input
                        type="email"
                        value={resume.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-grow p-2 border rounded"
                        placeholder="Email"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <label className="w-24">LinkedIn:</label>
                    <Input
                        type="text"
                        value={resume.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className="flex-grow p-2 border rounded"
                        placeholder="LinkedIn URL"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <label className="w-24">GitHub:</label>
                    <Input
                        type="text"
                        value={resume.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        className="flex-grow p-2 border rounded"
                        placeholder="GitHub URL"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <label className="w-24">Portfolio:</label>
                    <Input
                        type="text"
                        value={resume.portfolio}
                        onChange={(e) => handleInputChange('portfolio', e.target.value)}
                        className="flex-grow p-2 border rounded"
                        placeholder="Portfolio URL"
                    />
                </div>
            </div>
        </>
    );
}