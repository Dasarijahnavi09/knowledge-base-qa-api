const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Load knowledge base text
const KB_PATH = path.join(__dirname, "kb.txt");
function loadKB() {
  return fs.readFileSync(KB_PATH, "utf-8");
}

// Very simple "retrieval": return most relevant lines based on keywords
function retrieveRelevantLines(question, kbText) {
  // Common stop words to filter out
  const stopWords = new Set([
    "how", "many", "much", "are", "is", "was", "were", "there", "the", "a", "an",
    "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "from",
    "what", "where", "when", "why", "who", "which", "this", "that", "these", "those",
    "do", "does", "did", "we", "you", "they", "have", "has", "had", "can", "could"
  ]);

  const words = question
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(" ")
    .filter(w => w.length >= 3 && !stopWords.has(w))
    .map(w => w.endsWith("s") ? w.slice(0, -1) : w);

  // If no meaningful words after filtering, use original words (except stop words)
  if (words.length === 0) {
    const allWords = question
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(" ")
      .filter(w => w.length >= 2 && !stopWords.has(w));
    words.push(...allWords);
  }

  const lines = kbText.split("\n").map(l => l.trim()).filter(Boolean);

  if (lines.length === 0) {
    return ["No matching info found in the knowledge base."];
  }

  const scored = lines.map(line => {
    const lineLower = line.toLowerCase();
    let score = 0;
    for (const w of words) {
      // Check if word appears in line (handles both singular and plural)
      if (lineLower.includes(w) || lineLower.includes(w + "s")) {
        score++;
      }
    }
    return { line, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored[0]?.score > 0
    ? [scored[0].line]  // Return only the best match (top 1)
    : ["No matching info found in the knowledge base."];
}

// "Answer generator" (simple demo version)
function generateAnswer(question, relevantLines) {
  // If we found info, reply using it
  if (relevantLines[0] !== "No matching info found in the knowledge base.") {
    return `Based on the knowledge base: ${relevantLines[0]}`;  // Return only the first (best) match
  }
  return "Sorry, I couldn't find that in the knowledge base yet.";
}

// Health endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Text Knowledge Base API is running.",
    endpoints: ["POST /ask"]
  });
});

// Main endpoint: question -> answer from text
app.post("/ask", (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({
      success: false,
      error: "Please provide a 'question' string in the request body."
    });
  }

  const kbText = loadKB();
  const relevantLines = retrieveRelevantLines(question, kbText);
  const answer = generateAnswer(question, relevantLines);

  res.json({
    success: true,
    question,
    answer,
    matched_text: relevantLines,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});