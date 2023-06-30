import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id);
    if (!prompt)
      return new Response("The prompt could not be found", { status: 404 });
    return new Response(JSON.stringify(prompt));
  } catch (error) {
    return new Response("Failed to fetch any response", { status: 500 });
  }
};

//PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt could not be found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt));
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

//DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await findByIdandRemove(params.id);
    return new Response("Deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
