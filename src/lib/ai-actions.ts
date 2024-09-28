'use server'

import OpenAI from "openai";
import { Education, SkillsArray, WorkExperience } from "./types";
import { getProfile } from "@/app/actions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompts

const BULLET_POINT_TIPS = `For listing the accomplishments,

Follow the STAR method (Situation, Task, Action, Result)
Highlight specific technical work done
Mention domains of exposure (e.g., UI, SDKs, web services, cloud, databases)
Describe technical challenges faced and overcome
Quantify the impact of your work where possible

Be specific about technical details
Describe the actual work done, not just technologies used
Include impact or results when possible
Multiple sentences per bullet are acceptable (max 2)




Note:
Use present tense of verb for current roles/experiences (e.g. Administer, Conduct, Design, Edit, Promote, etc.).
Accomplishment:
Achieved, Designed, Elected to, Established, Executed, Expanded, Generated, Handled, Implemented, Improved,
Optimized, Pioneered, Reduced (losses), Resolved, Restored, Transformed
Administrative Skills:
Administered, Coordinated, Designed, Established, Evaluated, Interpreted, Interviewed, Managed, Mediated, Negotiated,
Organized, Oversaw, Prepared, Planned, Purchased, Supervised
Communication Skills:
Addressed, Advertised, Arbitrated, Arranged, Articulated, Attended, Authored, Collaborated, Committed, Convinced,
Corresponded, Demonstrated, Described, Developed, Directed, Discussed, Diverted, Drafted, Drew, Edited, Elicited,
Empathized, Enlisted, Entertained, Expressed, Facilitated, Formulated, Handled, Harmonized, Influenced, Informed, Inquired,
Interacted, Interpreted, Interviewed, Invited, Justified, Lectured, Listened, Manipulated, Marketed, Mediated, Moderated,
Motivated, Negotiated, Networked, Perceived, Persuaded, Presented, Promoted, Proposed, Publicized, Rated,
Recommended, Reconciled, Recruited, Reported, Represented, Settled, Showed, Signaled, Solicited, Specified, Spoke,
Telephoned, Testified, Translated, Wrote
Counseling/Helping Skills:
Accompanied, Adopted, Advocated, Affected, Aided, Assessed, Assisted, Assumed, Clarified, Coached, Collaborated,
Combined, Counseled, Demonstrated, Devoted, Diagnosed, Educated, Enlarged, Ensured, Executed, Expanded, Expedited,
Facilitated, Familiarized, Fortified, Guided, Increased, Involved, Maintained, Modified, Motivated, Offered, Participated,
Protected, Provided, Reduced, Referred, Rehabilitated, Reinforced, Represented, Retained, Reviewed, Revised, Sampled,
Served, Shared, Suggested, Supplied
Creative Skills:
Acted, Anticipated, Appeared, Conceptualized, Created, Customized, Decorated, Designed, Developed, Directed,
Displayed, Drew, Edited, Entertained, Established, Fashioned, Filmed, Founded, Illustrated, Initiated, Innovated, Instituted,
Integrated, Introduced, Invented, Originated, Performed, Planned, Revitalized
Financial Skills:
Administered, Allocated, Analyzed, Appraised, Assessed, Audited, Balanced, Bargained, Bought, Budgeted, Calculated,
Computed, Developed, Exchanged, Forecasted, Insured, Managed, Marketed, Planned, Prepared, Procured, Purchased,
Researched, Sold
Function/Task:
Approved, Arranged, Catalogued, Charted, Classified, Collected, Compiled, Delivered, Dispatched, Distributed, Drafted,
Edited, Executed, Filed, Generated, Hosted, Implemented, Inspected, Memorized, Monitored, Operated, Organized,
Outlined, Prepared, Processed, Purchased, Recorded, Registered, Relayed, Reorganized, Reproduced, Retrieved, Scanned,
Screened, Separated, Simplified, Specified, Systematized, Tabulated, Transferred, Updated
Management Skills:
Administered, Allotted, Analyzed, Assigned, Attained, Broadened, Called for, Chaired, Changed, Consolidated, Contacted,
Contracted, Coordinated, Decided, Defined, Delegated, Developed, Devised, Directed, Eliminated, Enforced, Established,
Evaluated, Executed, Focused, Handled, Headed, Hired, Implemented, Improved, Incorporated, Increased, Instituted,
Integrated, Judged, Led, Managed, Mediated, Mobilized, Motivated, Organized, Overhauled, Oversaw, Planned,
Prioritized, Produced, Provided, Recommended, Regulated, Resolved, Restored, Reviewed, Scheduled, Screened,
Scrutinized, Selected, Shaped, Solved, Sought, Specialized, Strengthened, Structured, Supervised, Terminated, Verified
Organizational Skills:
Analyzed, Applied, Approved, Arranged, Catalogued, Classified, Collected, Compiled, Coordinated, Dispatched,
Developed, Expedited, Facilitated, Generated, Handled, Implemented, Initiated, Inspected, Monitored, Organized,
Planned, Prepared, Processed, Purchased, Recorded, Retrieved, Screened, Specified, Systematized, Tabulated, Validated
Research Skills:
Analyzed, Applied, Checked, Cited, Clarified, Collected, Compared, Critiqued, Deducted, Determined, Diagnosed,
Discovered, Dissected, Estimated, Evaluated, Examined, Explored, Extracted, Forecasted, Formulated, Found, Gathered,
Graphed, Identified, Inspected, Interpreted, Interviewed, Investigated, Isolated, Located, Observed, Predicted, Read,
Researched, Reviewed, Studied, Summarized, Surveyed, Systematized
Technical Skills:
Adjusted, Advanced, Altered, Amplified, Assembled, Built, Calculated, Computed, Designed, Devised, Developed,
Engineered, Excavated, Extrapolated, Fabricated, Installed, Interpreted, Maintained, Mapped, Measured, Mediated,
Moderated, Motivated, Negotiated, Obtained, Operated, Overhauled, Persuaded, Plotted, Produced, Programmed,
Promoted, Publicized, Reconciled, Recruited, Remodeled, Renovated, Repaired, Restored, Rotated, Solved, Synthesized,
Translated, Upgraded, Wrote
Time Management Skills:
Administered, Consolidated, Developed, Directed, Generated, Improved, Increased, Initiated, Promoted, Reduced
Training Skills:
Adapted, Advised, Clarified, Coached, Communicated, Coordinated, Developed, Enabled, Encouraged, Evaluated,
Explained, Facilitated, Guided, Informed, Initiated, Instructed, Motivated, Persuaded, Presented, Stimulated
Type of Experience:
Broad, Complete, Comprehensive, Consistent, Diversified, Extensive, Intensive, Scope, Solid, Specific, Successful, Varied

`


// PROMPTS FOR PROFILE EDITOR
const EDUCATION_PROMPT = `You take in user education history and turn it into a json format. 
If the user has attended multiple schools, or holds multiple degrees, include each school and degree as 
an object in the array.
Here is an example of what the json should look like:

[
  {
    "date": "Expected August 2024",
    "degree": "Bachelor of Science in Computer Science",
    "description": "Dean's List, 3.8 GPA, Member of Computer Science Club",
    "institution": "Tech University"
  }
]


The education Object looks like this:


export interface Education {
    institution: string;
    degree: string;
    date: string;
    description?: string;
  }

and you are to return an array of Education objects education_history: Education[];

`
const WORK_EXPERIENCE_PROMPT = `You are a helpful assistant who 
takes in user work experience history and turns it into a 
json format. 

for work experience, you are to return an array of strings, each string being a work experience.

REMEMBER, EACH STRING SHOULD BE A WORK EXPERIENCE. ALL THE DETAILS ABOUT THE WORK EXPERIENCE SHOULD BE IN THE STRING.

FOR EXAMPLE:

'software enginer at google....'
' product manager at facebook....'

ETC. Do not take information about one job, and make it more then one string.


ENSURE YOUR RESPONSE IS ONLY ABOUT THE WORK EXPERIENCE, AND NOTHING ELSE. NOT PROJECTS, NOT SKILLS, NOT EDUCATION, NOT PERSONAL INFO. JUST
ITEMS THAT ARE CLEARLY WORK EXPERIENCE.

  `;
const PROJECTS_PROMPT = `You are a helpful assistant who 
takes in user project information from their resumeand turns it into a 
json format. 


ENSURE YOUR RESPONSE IS ONLY ABOUT THE PROJECTS, AND NOTHING ELSE. NOT WORK EXPERIENCE, NOT SKILLS, NOT EDUCATION, NOT PERSONAL INFO. JUST
ITEMS THAT ARE CLEARLY PROJECTS.

REMEMBER, EACH STRING SHOULD BE A PROJECT. ALL THE DETAILS ABOUT THE PROJECT SHOULD BE IN THE STRING.

FOR EXAMPLE:
{
'made an ai resume builder....'
'portfolio website....'
}
ETC. Do not take information about one project, and make it more then one string.
Include as much detail as possible.

Your ouput will be going in a an array like this:

[
  "Personal Portfolio Website\nTechnologies: React, Next.js, Tailwind CSS\nDescription: Designed and developed a responsive personal portfolio website to showcase projects and skills.\nAccomplishments:\n• Achieved a 95% performance score on Google Lighthouse\n• Implemented a dark mode feature, increasing user engagement by 20%\n• Reduced load time by 40% through image optimization and lazy loading\nURL: https://alexjohnson-portfolio.com",
  "Task Management App\nTechnologies: Node.js, Express, MongoDB, React, Socket.io\nDescription: Created a full-stack task management application with user authentication and real-time updates.\nAccomplishments:\n• Implemented JWT authentication, ensuring secure user access\n• Utilized Socket.io to enable real-time task updates across multiple users\n• Designed and implemented a RESTful API with over 20 endpoints\nURL: https://github.com/alexjohnson/task-manager"
]

SO ENSURE IT FOLLOWS THAT FORMAT.
`;
const SKILLS_PROMPT = `You are a helpful assistant who takes in user 
resume and returns a list of skills. Do not mention yourself or anything that is not a skill. 
Your output is directly going into a resume, so it should look like this:

Languages: Python, JavaScript, Typescript, C, C++, Java, HTML, CSS, SQL, BASH

Frameworks/Libraries: React, ReactNative, NextJS, Express.js, Node.js, Mongoose, GraphQL, Tailwind, Vite

Developer Tools: Git, Docker, AWS (S3, EC2, ECS, Lambda), Linux, MSSQL, PostgreSQL, NGINX, REST APIs

Other Skills: Web development, Data processing, Data handling, Data analysis, Database management, Content management systems, Workflow creation

thats just an example. The following is the user information. Format is as 

Category: skill1, skill2, skill3, etc.
`;
const PERSONAL_INFO_PROMPT = `You are a helpful assistant who extracts 
personal information from user input and formats it as JSON. Extract the 
first name, last name, GitHub URL, LinkedIn URL, and personal portfolio 
URL if available.`;
const GENERAL_PROMPT =  `If the user has not provided any 
information about a specific field, return an empty string. Now do as instructed with the text.
Ensure that all items are sorted by date, from most recent first to least recent last. `

// Generate Education History

export async function generateEducationHistory(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": [{ "type": "text", "text": `${EDUCATION_PROMPT} + ${GENERAL_PROMPT}` }]
      },
      {
        "role": "user",
        "content": [{ "type": "text", "text": prompt }]
      }
    ],
    temperature: 1,
    max_tokens: 5000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type": "json_schema",
      "json_schema": {
        "name": "Education",
        "strict": true,
        "schema": {
          "type": "object",
          "properties": {
            "education_history": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "institution": {
                    "type": "string"
                  },
                  "degree": {
                    "type": "string"
                  },
                  "date": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  }
                },
                "required": [
                  "institution",
                  "degree",
                  "date",
                  "description"
                ],
                "additionalProperties": false
              }
            }
          },
          "required": [
            "education_history"
          ],
          "additionalProperties": false
        }
      }
    },
  });

  const educationHistory = JSON.parse(response.choices[0].message.content || '{}')

  return educationHistory
}

// --------------- PROFILE --------------- //

// Generate Work Experience FOR PROFILE
export async function generateWorkExperience(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": [{ "type": "text", "text": WORK_EXPERIENCE_PROMPT + BULLET_POINT_TIPS +  GENERAL_PROMPT  }]
      },
      {
        "role": "user",
        "content": [{ "type": "text", "text": prompt }]
      }
    ],
    temperature: 1,
    max_tokens: 5000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type": "json_schema",
      "json_schema": {
        "name": "WorkExperience",
        "strict": true,
        "schema": {
          "type": "object",
          "properties": {
            "work_history": {
              "type": "array",
              "items": { "type": "string" }
            }
          },
          "required": ["work_history"],
          "additionalProperties": false
        }
      }
    },
  });

  const workExperience = JSON.parse(response.choices[0].message.content || '{}');




  return workExperience.work_history; // This should be an array of strings

}

// Generate Projects FOR PROFILE
export async function generateProjects(prompt: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "system",
          "content": [{ "type": "text", "text": PROJECTS_PROMPT + GENERAL_PROMPT }]
        },
        {
          "role": "user",
          "content": [{ "type": "text", "text": prompt }]
        }
      ],
      temperature: 1,
      max_tokens: 5000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        "type": "json_schema",
        "json_schema": {
          "name": "Projects",
          "strict": true,
          "schema": {
            "type": "object",
            "properties": {
              "projects": {
                "type": "array",
                "items": { "type": "string" }
              }
            },
            "required": ["projects"],
            "additionalProperties": false
          }
        }
      },
    });
  
    const projects = JSON.parse(response.choices[0].message.content || '{}');
  

  return projects.projects; // This will return an array of strings
}

// Generate Skills FOR PROFILE
export async function generateSkills(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": [{ "type": "text", "text": SKILLS_PROMPT }]
      },
      {
        "role": "user",
        "content": [{ "type": "text", "text": prompt }]
      }
    ],
    temperature: 1,
    max_tokens: 5000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    
  });

  const skills = response.choices[0].message.content || '';

 
  return skills;
}

// Generate Personal Information FOR PROFILE
export async function generatePersonalInfo(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": [{ "type": "text", "text": PERSONAL_INFO_PROMPT }]
      },
      {
        "role": "user",
        "content": [{ "type": "text", "text": prompt }]
      }
    ],
    temperature: 1,
    max_tokens: 5000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type": "json_schema",
      "json_schema": {
        "name": "PersonalInfo",
        "strict": true,
        "schema": {
          "type": "object",
          "properties": {
            "first_name": { "type": "string" },
            "last_name": { "type": "string" },
            "Github": { "type": "string" },
            "Linkedin": { "type": "string" },
            "Portfolio": { "type": "string" }
          },
          "required": ["first_name", "last_name", "Github", "Linkedin", "Portfolio"],
          "additionalProperties": false
        }
      }
    },
  });

  const personalInfo = JSON.parse(response.choices[0].message.content || '{}');



  return personalInfo;
}


// --------------- RESUME EDITOR --------------- //

// Profile Skills -> Resume Skills
export async function convertProfileSkillsToResumeSkills() {
  const profile = await getProfile();

  // console.log('PROFILE SKILLS ----------------------------------------');
  // console.log(profile.skills);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": "Convert this to json." + profile.skills
          }
        ]
      }
    ],
    temperature: 1,
    max_tokens: 16383,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type": "json_schema",
      "json_schema": {
        "name": "skills",
        "strict": false,
        "schema": {
          "type": "object",
          "properties": {},
          "required": []
        }
      }
    },
  });



  // console.log('WE GOT THIS RESPONSE FROM THE AI ----------------------------------------');
  // console.log(response.choices[0].message.content)

  const resumeSkills = JSON.parse(response.choices[0].message.content || '{}');

  // console.log('AS RESUME SKILLS ----------------------------------------');
  // console.log(resumeSkills);

  // Convert the resumeSkills object to the desired SkillsArray format
  const skillsArray: SkillsArray = Object.entries(resumeSkills).map(([key, value]) => ({
    [key.replace('_', ' ')]: (value as string[]).join(', ')
  }));


  // console.log('AS SKILLS ARRAY ----------------------------------------');
  // console.log(skillsArray);

  
  return skillsArray;
  

}

//  Profile Work Experience -> Resume Work Experience
export async function convertProfileWorkExperienceToResumeWorkExperience() {
  const profile = await getProfile();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": "Convert this work experience to a structured JSON format. Each work experience should have company, position, date, description, and accomplishments fields. The accomplishments should be an array of strings." + JSON.stringify(profile.work_history)
          }
        ]
      }
    ],
    temperature: 1,
    max_tokens: 16383,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "work_experience_response",
        schema: {
          type: "object",
          properties: {
            work_history: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  company: { type: "string" },
                  position: { type: "string" },
                  date: { type: "string" },
                  description: { type: "string" },
                  accomplishments: {
                    type: "array",
                    items: { type: "string" }
                  }
                },
                required: ["company", "position", "date", "description", "accomplishments"],
                additionalProperties: false
              }
            }
          },
          required: ["work_history"],
          additionalProperties: false
        },
        strict: true
      }
    }
  });

  const parsedResponse = JSON.parse(response.choices[0].message.content || '{}');


  
  return parsedResponse.work_history || [];;
}


// Profile Projects -> Resume Projects
export async function convertProfileProjectsToResumeProjects() {
  const profile = await getProfile();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": "Convert these projects to a structured JSON format. Each project should have name, description, accomplishments, technologies, and an optional url field. The accomplishments and technologies should be arrays of strings." + JSON.stringify(profile.projects)
          }
        ]
      }
    ],
    temperature: 1,
    max_tokens: 16383,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "projects_response",
        schema: {
          type: "object",
          properties: {
            projects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  accomplishments: {
                    type: "array",
                    items: { type: "string" }
                  },
                  technologies: {
                    type: "array",
                    items: { type: "string" }
                  },
                  url: { type: "string" }
                },
                required: ["name", "description", "accomplishments", "technologies", "url"],
                additionalProperties: false
              }
            }
          },
          required: ["projects"],
          additionalProperties: false
        },
        strict: true
      }
    }
  });

  const parsedResponse = JSON.parse(response.choices[0].message.content || '{}');
  
  return parsedResponse.projects || [];
}


// New function to extract job keywords
export async function extractJobKeywords(jobInfo: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": "Extract key skills, technologies, and important keywords from the given job description. Return them as an array of strings, with each keyword or phrase as a separate item. Focus on technical skills, tools, frameworks, and job-specific terminology."
          }
        ]
      },
      {
        "role": "user",
        "content": [{ "type": "text", "text": jobInfo }]
      }
    ],
    temperature: 0.7,
    max_tokens: 10000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "job_keywords_response",
        schema: {
          type: "object",
          properties: {
            job_keywords: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["job_keywords"],
          additionalProperties: false
        },
        strict: true
      }
    }
  });

  const parsedResponse = JSON.parse(response.choices[0].message.content || '{}');
  
  return parsedResponse.job_keywords || [];
}





export async function askAI(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: "you are a helpful assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 1,
    max_tokens: 16383,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content || '';
}
