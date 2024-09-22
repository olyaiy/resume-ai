'use server'

import OpenAI from "openai";


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
              "text": "You are a helpful assistant who takes in user education history and turns it into a json format."
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
        "name": "education_history",
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
                  "field_of_study": {
                    "type": "string"
                  },
                  "start_date": {
                    "type": "string"
                  },
                  "end_date": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  }
                },
                "required": [
                  "institution",
                  "degree",
                  "field_of_study",
                  "start_date",
                  "end_date",
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

  console.log('WE GOT THIS REPONSE FROM THE AI ----------------------------------------')
  console.log(response.choices[0].message.content);

}