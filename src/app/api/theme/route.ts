import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { role } = await req.json();

  const prompt = `Suggest a Tailwind CSS gradient background for a digital business card of a ${role}. Example: bg-gradient-to-r from-indigo-500 to-blue-700`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const theme = completion.choices[0].message?.content ?? "bg-gray-100";
  return NextResponse.json({ theme });
}
