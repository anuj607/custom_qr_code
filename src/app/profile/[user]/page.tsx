"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user } = useParams();
  const [theme, setTheme] = useState<string>("bg-gray-100");

  // Call AI to suggest theme (simplified example)
  useEffect(() => {
    async function getTheme() {
      // Later you can call your API with OpenAI
      if (user.includes("developer")) {
        setTheme("bg-gradient-to-r from-blue-500 to-indigo-700");
      } else {
        setTheme("bg-gradient-to-r from-purple-400 to-pink-600");
      }
    }
    getTheme();
  }, [user]);

  return (
    <div className={`${theme} min-h-screen flex flex-col items-center justify-center text-white`}>
      <div className="bg-white text-black rounded-xl shadow-xl p-6 w-96 text-center">
        <h1 className="text-2xl font-bold">{user}</h1>
        <p className="text-gray-600">AI-generated digital business card</p>
      </div>
    </div>
  );
}
