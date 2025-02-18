// pages/api/chat.js
import { execSync } from "child_process";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { query } = req.body;
  if (!query) {
    res.status(400).json({ error: "No query provided" });
    return;
  }

  try {
    const scriptPath = path.join(process.cwd(), "backend", "official_agent.py");
    // Execute the Python script with the query as an argument
    const command = `python "${scriptPath}" "${query}"`;
    const output = execSync(command, { encoding: "utf-8" });
    res.status(200).json({ answer: output });
  } catch (error) {
    console.error("Error calling Python agent:", error);
    res.status(500).json({ error: "Error processing query" });
  }
}
