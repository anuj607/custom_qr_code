import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: "Minimal modern logo, circular, blue and white",
      size: "1024x1024",
    });

    return NextResponse.json({ imageUrl: response.data![0].url });
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
