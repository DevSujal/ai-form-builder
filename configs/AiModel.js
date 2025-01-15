"use server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });
export const AiChatSession = async (userInput) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Generate a JSON structure for a web form based on the following description:\n\n${userInput}\n\n**Format:**\n- **title:** Form\'s concise title.\n- **subheading:** Brief purpose or instructions.\n- **fields:** Array of form fields, each containing:\n  - **fieldName:** Unique backend identifier.\n  - **placeholder:** Example input text.\n  - **label:** User-facing label.\n  - **fieldType:** Input type (e.g., text, email, number, select, radio, checkbox).\n  - **required:** Boolean for mandatory fields.\n  - **options:** For radio, checkbox, or select fields.\n\n**Notes:**\n- Use **radio buttons** and **checkboxes** for MCQ tests, not dropdowns or select.\n- Options must not include list numbers (e.g., 1., 2., A., B.).\n- Ensure compatibility with standard HTML form attributes.\n\n**Example:**\n{\n  "title": "Sample Form",\n  "subheading": "Fill in the details",\n  "fields": [\n    {\n      "fieldName": "userName",\n      "placeholder": "Enter your name",\n      "label": "Name",\n      "fieldType": "text",\n      "required": true\n    }\n  ]\n}`,
      },
    ],
    model: "mixtral-8x7b-32768",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    response_format: {
      type: "json_object",
    },
    stop: null,
  });

  return chatCompletion.choices[0].message.content;
};
