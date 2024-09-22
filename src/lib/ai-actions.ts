'use server'

import OpenAI from "openai";
import { Education } from "./types";

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
Example: 

    "accomplishments": [
      "Achieved a 95% performance score on Google Lighthouse",
      "Implemented a dark mode feature, increasing user engagement by 20%",
      "Reduced load time by 40% through image optimization and lazy loading"
    ],"




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



const EDUCATION_PROMPT = `You take in user education history and turn it into a json format. 
If the user has attended multiple schools, or holds multiple degrees, include each school and degree as 
an object in the array.
Do that with this text, and aim to create this format:

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

for work experience, you are to return an array of WorkExperience objects that look like this: 

export interface WorkExperience {
    company: string;
    position: string;
    date: string;
    description: string;
    accomplishments: string[];
  }


ENSURE YOUR RESPONSE IS ONLY ABOUT THE WORK EXPERIENCE, AND NOTHING ELSE. NOT PROJECTS, NOT SKILLS, NOT EDUCATION, NOT PERSONAL INFO. JUST
ITEMS THAT ARE CLEARLY WORK EXPERIENCE.

  `;

const PROJECTS_PROMPT = `You are a helpful assistant who 
takes in user project information and turns it into a 
json format. 


ENSURE YOUR RESPONSE IS ONLY ABOUT THE PROJECTS, AND NOTHING ELSE. NOT WORK EXPERIENCE, NOT SKILLS, NOT EDUCATION, NOT PERSONAL INFO. JUST
ITEMS THAT ARE CLEARLY PROJECTS.
`;


const SKILLS_PROMPT = `You are a helpful assistant who takes in user 
skill information and turns it into a json format. Do that with this text.`;


const PERSONAL_INFO_PROMPT = `You are a helpful assistant who extracts 
personal information from user input and formats it as JSON. Extract the 
first name, last name, GitHub URL, LinkedIn URL, and personal portfolio 
URL if available.`;


const GENERAL_PROMPT =  `If the user has not provided any 
information about a specific field, return an empty string. Now do as instructed with the text.`

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

// Generate Work Experience
export async function generateWorkExperience(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": [{ "type": "text", "text": WORK_EXPERIENCE_PROMPT + BULLET_POINT_TIPS + GENERAL_PROMPT  }]
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
            "work_experience": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "company": { "type": "string" },
                  "position": { "type": "string" },
                  "date": { "type": "string" },
                  "description": { "type": "string" },
                  "accomplishments": {
                    "type": "array",
                    "items": { "type": "string" }
                  }
                },
                "required": ["company", "position", "date", "description", "accomplishments"],
                "additionalProperties": false
              }
            }
          },
          "required": ["work_experience"],
          "additionalProperties": false
        }
      }
    },
  });

  const workExperience = JSON.parse(response.choices[0].message.content || '{}');

  return workExperience;
}

// Generate Projects
export async function generateProjects(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": [{ "type": "text", "text": PROJECTS_PROMPT }]
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
              "items": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "description": { "type": "string" },
                  "accomplishments": {
                    "type": "array",
                    "items": { "type": "string" }
                  },
                  "technologies": {
                    "type": "array",
                    "items": { "type": "string" }
                  },
                  "url": { "type": "string" }
                },
                "required": ["name", "description", "accomplishments", "technologies","url"],
                "additionalProperties": false
              }
            }
          },
          "required": ["projects"],
          "additionalProperties": false
        }
      }
    },
  });

  const projects = JSON.parse(response.choices[0].message.content || '{}');

  console.log('WE GOT THIS RESPONSE FROM THE AI ----------------------------------------');
  console.log(response.choices[0].message.content);
  console.log('AS PROJECTS ----------------------------------------');
  console.log(projects);

  return projects;
}

// Generate Skills
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
    response_format: {
      "type": "json_schema",
      "json_schema": {
        "name": "Skills",
        "strict": true,
        "schema": {
          "type": "object",
          "properties": {
            "skills": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "Languages": {
                    "type": "array",
                    "items": { "type": "string" }
                  },
                  "Frameworks/ Libraries": {
                    "type": "array",
                    "items": { "type": "string" }
                  },
                  "Developer Tools": {
                    "type": "array",
                    "items": { "type": "string" }
                  },
                  "Other": {
                    "type": "array",
                    "items": { "type": "string" }
                  }
                },
                "required": ["Languages", "Frameworks/ Libraries", "Developer Tools", "Other"],
                "additionalProperties": false
              }
            }
          },
          "required": ["skills"],
          "additionalProperties": false
        }
      }
    },
  });

  const skills = JSON.parse(response.choices[0].message.content || '{}');

  console.log('WE GOT THIS RESPONSE FROM THE AI ----------------------------------------');
  console.log(response.choices[0].message.content);
  console.log('AS SKILLS ----------------------------------------');
  console.log(skills);

  return skills;
}

// Generate Personal Information
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

  console.log('Personal Info generated:', personalInfo);

  return personalInfo;
}