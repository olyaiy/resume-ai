import { getProfile } from '@/app/actions';
import { UserProfile, Education, WorkExperience, Project, Skill } from '@/lib/types';
import Image from 'next/image';

export default async function Page() {
    const data: UserProfile = await getProfile();
    
    return (
        <div className="space-y-8 p-4">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            
            <section>
                <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><strong>ID:</strong> {data?.id || 'N/A'}</p>
                    <p><strong>Username:</strong> {data?.username || 'N/A'}</p>
                    <p><strong>Name:</strong> {`${data?.first_name || ''} ${data?.last_name || ''}`.trim() || 'N/A'}</p>
                    <p><strong>Email:</strong> {data?.email || 'N/A'}</p>
                    <p><strong>Email Visibility:</strong> {data?.emailVisibility ? 'Public' : 'Private'}</p>
                    <p><strong>Verified:</strong> {data?.verified ? 'Yes' : 'No'}</p>
                    <p><strong>Created:</strong> {data?.created ? new Date(data.created).toLocaleString() : 'N/A'}</p>
                    <p><strong>Updated:</strong> {data?.updated ? new Date(data.updated).toLocaleString() : 'N/A'}</p>
                    <p><strong>Collection ID:</strong> {data?.collectionId || 'N/A'}</p>
                    <p><strong>Collection Name:</strong> {data?.collectionName || 'N/A'}</p>
                </div>
                {data?.avatar && (
                    <div className="mt-4">
                        <strong>Avatar:</strong>
                        <Image src={data.avatar} alt="User Avatar" width={96} height={96} className="mt-2 object-cover rounded-full" />
                    </div>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Fields of Interest</h2>
                {data?.field && data.field.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {data.field.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No fields specified</p>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                {data?.skills && data.skills.length > 0 ? (
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {data.skills.map((skill: Skill, index) => (
                            <li key={index} className="bg-gray-100 p-2 rounded">
                                {Object.entries(skill).map(([key, value]) => (
                                    <span key={key}>{key}: {value}</span>
                                ))}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No skills specified</p>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
                {data?.work_history && data.work_history.length > 0 ? (
                    <ul className="space-y-4">
                        {data.work_history.map((job: WorkExperience, index) => (
                            <li key={index} className="border-b pb-4">
                                <h3 className="text-xl font-medium">{job.position} at {job.company}</h3>
                                <p className="text-sm text-gray-600">{job.date}</p>
                                <p className="mt-2">{job.description}</p>
                                {job.accomplishments && job.accomplishments.length > 0 && (
                                    <ul className="list-disc list-inside mt-2">
                                        {job.accomplishments.map((acc, accIndex) => (
                                            <li key={accIndex}>{acc}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No work experience specified</p>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Education</h2>
                {data?.education_history && data.education_history.length > 0 ? (
                    <ul className="space-y-4">
                        {data.education_history.map((edu: Education, index) => (
                            <li key={index} className="border-b pb-4">
                                <h3 className="text-xl font-medium">{edu.degree}</h3>
                                <p className="text-sm text-gray-600">{edu.institution} - {edu.date}</p>
                                {edu.description && <p className="mt-2">{edu.description}</p>}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No education history specified</p>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Projects</h2>
                {data?.projects && data.projects.length > 0 ? (
                    <ul className="space-y-6">
                        {data.projects.map((project: Project, index) => (
                            <li key={index} className="border-b pb-4">
                                <h3 className="text-xl font-medium">{project.name}</h3>
                                <p className="mt-2">{project.description}</p>
                                {project.accomplishments && project.accomplishments.length > 0 && (
                                    <>
                                        <h4 className="text-lg font-medium mt-2">Accomplishments:</h4>
                                        <ul className="list-disc list-inside mt-1">
                                            {project.accomplishments.map((acc, accIndex) => (
                                                <li key={accIndex}>{acc}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {project.technologies && project.technologies.length > 0 && (
                                    <>
                                        <h4 className="text-lg font-medium mt-2">Technologies:</h4>
                                        <ul className="flex flex-wrap gap-2 mt-1">
                                            {project.technologies.map((tech, techIndex) => (
                                                <li key={techIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{tech}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {project.url && (
                                    <p className="mt-2">
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            Project URL
                                        </a>
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No projects specified</p>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
                {(data?.Linkedin || data?.Github || data?.Portfolio) ? (
                    <ul className="space-y-2">
                        {data.Linkedin && (
                            <li>
                                <a href={data.Linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    LinkedIn
                                </a>
                            </li>
                        )}
                        {data.Github && (
                            <li>
                                <a href={data.Github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    GitHub
                                </a>
                            </li>
                        )}
                        {data.Portfolio && (
                            <li>
                                <a href={data.Portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Portfolio
                                </a>
                            </li>
                        )}
                    </ul>
                ) : (
                    <p>No social links specified</p>
                )}
            </section>
        </div>
    );
}