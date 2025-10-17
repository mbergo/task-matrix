
import { GoogleGenAI, Type } from "@google/genai";
import { Task, Quadrant } from '../types';

if (!process.env.API_KEY) {
    // In a real app, you'd want to handle this more gracefully.
    // For this environment, we'll throw an error if the key is missing.
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const taskParsingSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'The concise title of the task.',
        },
        quadrant: {
          type: Type.STRING,
          description: `The Eisenhower Matrix quadrant. Must be one of: 'Q1', 'Q2', 'Q3', 'Q4'.`,
          enum: ['Q1', 'Q2', 'Q3', 'Q4'],
        },
      },
      required: ['title', 'quadrant'],
    },
};

const taskBreakdownSchema = {
    type: Type.ARRAY,
    description: "A list of 3-5 smaller, actionable sub-tasks.",
    items: {
        type: Type.STRING,
        description: "A single, actionable sub-task."
    }
};

export const parseTasksFromText = async (text: string): Promise<Omit<Task, 'id'>[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Parse the following text into a list of tasks. For each task, provide a title and assign it to the correct Eisenhower Matrix quadrant (Q1: Urgent & Important, Q2: Not Urgent & Important, Q3: Urgent & Not Important, Q4: Not Urgent & Not Important). Text: "${text}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: taskParsingSchema,
            },
        });

        const jsonString = response.text.trim();
        const parsedResponse = JSON.parse(jsonString);
        
        if (Array.isArray(parsedResponse)) {
            // Validate that each item has a valid quadrant
            return parsedResponse.filter(item => 
                item.title && typeof item.title === 'string' &&
                item.quadrant && Object.values(Quadrant).includes(item.quadrant)
            ) as Omit<Task, 'id'>[];
        }
        return [];

    } catch (error) {
        console.error("Error parsing tasks with Gemini:", error);
        throw new Error("Failed to parse tasks. The AI model may be temporarily unavailable.");
    }
};

export const breakdownTask = async (taskTitle: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Break down the following task into 3-5 smaller, actionable steps. Task: "${taskTitle}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: taskBreakdownSchema,
            }
        });

        const jsonString = response.text.trim();
        const subtasks = JSON.parse(jsonString);

        if (Array.isArray(subtasks) && subtasks.every(s => typeof s === 'string')) {
            return subtasks;
        }
        return [];

    } catch (error) {
        console.error("Error breaking down task with Gemini:", error);
        throw new Error("Failed to get suggestions. The AI model may be temporarily unavailable.");
    }
};
