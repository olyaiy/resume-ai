'use server'

import OpenAI from "openai";
import { Education } from "./types";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  

export async function generateEducationHistory(prompt: string) {
  
const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
          "role": "system",
          "content": [
            {
              "type": "text",
              "text": "You are a helpful assistant who takes in user education history and turns it into a json format. Do that with this text."
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt
            }
          ]
        }
      ],    temperature: 1,
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

  console.log('WE GOT THIS REPONSE FROM THE AI ----------------------------------------')
  console.log(response.choices[0].message.content);
  console.log('AS EDUCATION HISTORY ----------------------------------------')
  console.log(educationHistory);

  return educationHistory

}



export async function generateWorkExperience(prompt: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "system",
          "content": [
            {
              "type": "text",
              "text": "You are a helpful assistant who takes in user work experience history and turns it into a json format. Do that with this text."
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt
            }
          ]
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
  
    console.log('WE GOT THIS RESPONSE FROM THE AI ----------------------------------------');
    console.log(response.choices[0].message.content);
    console.log('AS WORK EXPERIENCE ----------------------------------------');
    console.log(workExperience);
  
    return workExperience;
  }