import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Interview } from "@/types";

import { CustomBreadCrumb } from "./custom-bread-crumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Headings } from "./headings";
import { Button } from "./ui/button";
import { Loader, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui";
import { chatSession } from "@/scripts";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

interface FormMockInterviewProps {
  initialData: Interview | null;
}

const formSchema = z.object({
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be 100 characters or less"),
  description: z.string().min(10, "Description is required"),
  experience: z.coerce
    .number()
    .min(0, "Experience cannot be empty or negative"),
  techStack: z.string().min(1, "Tech stack must be at least a character"),
  difficulty: z.enum(["Easy", "Moderate", "Difficult"], {
    required_error: "Please select a difficulty level",
  }),
});

type FormData = z.infer<typeof formSchema>;

export const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const { isValid, isSubmitting } = form.formState;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const title = initialData
    ? initialData.position
    : "Create a new mock interview";

  const breadCrumpPage = initialData ? initialData?.position : "Create";
  const actions = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData
    ? { title: "Updated..!", description: "Changes saved successfully..." }
    : { title: "Created..!", description: "New Mock Interview created..." };

  const cleanAiResponse = (responseText: string) => {
    // Step 1: Trim any surrounding whitespace
    let cleanText = responseText.trim();

    // Step 2: Remove any occurrences of "json" or code block symbols (``` or `)
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    // Step 3: Extract a JSON array by capturing text between square brackets
    const jsonArrayMatch = cleanText.match(/\[.*\]/s);
    if (jsonArrayMatch) {
      cleanText = jsonArrayMatch[0];
    } else {
      throw new Error("No JSON array found in response");
    }

    // Step 4: Parse the clean JSON text into an array of objects
    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateAiResponse = async (data: FormData) => {
    // Define difficulty-specific instructions
    const difficultyInstructions = {
      Easy: "Generate basic, entry-level questions suitable for beginners or junior developers. Focus on fundamental concepts, basic syntax, and simple problem-solving scenarios. Questions should be straightforward and test foundational knowledge.",
      Moderate: "Generate intermediate-level questions for experienced professionals. Include questions about best practices, design patterns, optimization, and real-world problem-solving. Questions should require practical experience and deeper understanding.",
      Difficult: "Generate advanced, challenging questions for senior-level positions. Include complex system design, architecture decisions, performance optimization, scalability concerns, and advanced technical concepts. Questions should test expert-level knowledge and strategic thinking."
    };

    // Define difficulty-specific question types and complexity
    const difficultyExamples = {
      Easy: {
        types: "basic syntax, simple concepts, fundamental operations, basic debugging, entry-level best practices",
        complexity: "straightforward, one-concept-per-question, practical examples",
        keywords: "What is, How do you, Explain the basic, Define, Give an example of"
      },
      Moderate: {
        types: "design patterns, performance optimization, debugging complex issues, API integration, state management, testing strategies",
        complexity: "multi-concept questions, scenario-based problems, real-world applications",
        keywords: "How would you implement, What are the pros and cons, Compare and contrast, How would you optimize, Describe a scenario where"
      },
      Difficult: {
        types: "system architecture, scalability solutions, advanced algorithms, security considerations, performance bottlenecks, microservices design",
        complexity: "multi-layered problems, architectural decisions, trade-off analysis, complex scenarios",
        keywords: "Design a system that, How would you scale, What are the architectural considerations, Analyze the performance implications, How would you handle"
      }
    };

    // Check if this is a DSA/Algorithm focused interview
    const isDSAFocused = data?.position.toLowerCase().includes('dsa') || 
                       data?.position.toLowerCase().includes('algorithm') ||
                       data?.techStack.toLowerCase().includes('algorithm') ||
                       data?.techStack.toLowerCase().includes('data structure') ||
                       data?.description.toLowerCase().includes('algorithm') ||
                       data?.description.toLowerCase().includes('data structure');

    const difficultyLevel = data?.difficulty || "Moderate";
    const difficultyInstruction = difficultyInstructions[difficultyLevel];
    const difficultySpec = difficultyExamples[difficultyLevel];
    
    // Add randomization seed based on current timestamp
    const randomSeed = Date.now();

    // Enhanced prompt for DSA interviews
    const dsaSpecificGuidelines = isDSAFocused ? `
    
    DSA-SPECIFIC REQUIREMENTS:
    - Include coding problems and algorithm questions
    - Ask about time and space complexity analysis
    - Cover data structures appropriate for ${difficultyLevel} level
    - Include problem-solving and optimization questions
    - For ${difficultyLevel} level: ${
      difficultyLevel === 'Easy' ? 'Basic arrays, strings, simple sorting, basic recursion' :
      difficultyLevel === 'Moderate' ? 'Trees, graphs, dynamic programming, hash tables, advanced sorting' :
      'Advanced trees, graph algorithms, complex DP, system design with algorithms'
    }
    ` : '';

    const prompt = `
        As an experienced prompt engineer, generate a UNIQUE and RANDOM set of 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

        [
          { "question": "<Question text>", "answer": "<Answer text>" },
          ...
        ]

        RANDOMIZATION REQUIREMENT: Generate completely different questions each time. Use this random seed for variety: ${randomSeed}

        Job Information:
        - Job Position: ${data?.position}
        - Job Description: ${data?.description}
        - Years of Experience Required: ${data?.experience}
        - Tech Stacks: ${data?.techStack}
        - Difficulty Level: ${difficultyLevel}

        DIFFICULTY REQUIREMENTS (${difficultyLevel}):
        ${difficultyInstruction}

        QUESTION SPECIFICATIONS FOR ${difficultyLevel} LEVEL:
        - Question Types: ${difficultySpec.types}
        - Complexity Level: ${difficultySpec.complexity}
        - Question Starters: ${difficultySpec.keywords}
        ${dsaSpecificGuidelines}

        IMPORTANT INSTRUCTIONS:
        1. Generate RANDOM and DIVERSE questions - avoid repetitive patterns
        2. Ensure questions are SPECIFICALLY ${difficultyLevel} level - not easier or harder
        3. Questions must be directly related to ${data?.techStack} and ${data?.position}
        4. Each question should test different aspects/skills
        5. Provide comprehensive, accurate answers that match the difficulty level
        6. Vary question formats (theoretical, practical, scenario-based, problem-solving)
        ${isDSAFocused ? '7. Include algorithm implementation details and complexity analysis in answers' : ''}

        Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
        `;

    const aiResult = await chatSession.sendMessage(prompt);
    const cleanedResponse = cleanAiResponse(aiResult.response.text());

    return cleanedResponse;
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      if (initialData) {
        // update
        if (isValid) {
          const aiResult = await generateAiResponse(data);

          await updateDoc(doc(db, "interviews", initialData?.id), {
            questions: aiResult,
            ...data,
            difficulty: data.difficulty, // Ensure difficulty is explicitly saved
            updatedAt: serverTimestamp(),
          }).catch((error) => console.log(error));
          toast(toastMessage.title, { description: toastMessage.description });
        }
      } else {
        // create a new mock interview
        if (isValid) {
          const aiResult = await generateAiResponse(data);

          await addDoc(collection(db, "interviews"), {
            ...data,
            userId,
            questions: aiResult,
            difficulty: data.difficulty, // Ensure difficulty is explicitly saved
            isDefault: false, // Mark as user-created interview
            createdAt: serverTimestamp(),
          });

          toast(toastMessage.title, { description: toastMessage.description });
        }
      }

      navigate("/generate", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Error..", {
        description: `Something went wrong. Please try again later`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      form.reset({
        position: initialData.position,
        description: initialData.description,
        experience: initialData.experience,
        techStack: initialData.techStack,
        difficulty: initialData.difficulty,
      });
    }
  }, [initialData, form]);

  return (
    <div className="w-full flex-col space-y-4">
      <CustomBreadCrumb
        breadCrumbPage={breadCrumpPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />

      <div className="mt-4 flex items-center justify-between w-full">
        <Headings title={title} isSubHeading />

        {initialData && (
          <Button size={"icon"} variant={"ghost"}>
            <Trash2 className="min-w-4 min-h-4 text-red-500" />
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      <div className="my-6"></div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-8 rounded-lg flex-col flex items-start justify-start gap-6 shadow-md "
        >
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Role / Job Position</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- Full Stack Developer"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Description</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- describle your job role"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Years of Experience</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- 5 Years"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Tech Stacks</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- React, Typescript..."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Difficulty Level</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy" className="text-green-600">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Easy - Perfect for beginners
                        </div>
                      </SelectItem>
                      <SelectItem value="Moderate" className="text-yellow-600">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Moderate - For experienced professionals
                        </div>
                      </SelectItem>
                      <SelectItem value="Difficult" className="text-red-600">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Difficult - Advanced level challenges
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-end gap-6">
            <Button
              type="reset"
              size={"sm"}
              variant={"outline"}
              disabled={isSubmitting || loading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              size={"sm"}
              disabled={isSubmitting || !isValid || loading}
            >
              {loading ? (
                <Loader className="text-gray-50 animate-spin" />
              ) : (
                actions
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
