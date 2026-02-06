Knowledge Base Q&A API

This is a small and simple backend API that answers questions using information stored in a text file.

You write information in a text file, ask a question through the API, and it returns the most relevant answer. That’s it.

What does this project do?

Think of it like a smart text search.

For example:

Your text file says:
We have 5 burgers in stock.

You ask:
“How many burgers do we have?”

The API replies:
“Based on the knowledge base: We have 5 burgers in stock.”

Tech used (very simple)

Node.js – runs the server

Express – makes it easy to build API endpoints

CORS – allows the API to be called from other apps

Text file (kb.txt) – stores the knowledge

No database, no cloud setup, no UI. Just a clean backend demo.

Project structure
demo/
├── server.js        # Main API code
├── kb.txt           # Text knowledge base
├── package.json     # Dependencies
├── README.md        # Simple guide (this file)
├── DOCUMENTATION.md # Detailed explanation (optional)
How to run the project
1. Make sure Node.js is installed

Check by running:

node --version

If you see a version number, you’re good.

2. Install dependencies

Inside the project folder, run:

npm install
3. Add your data

Open kb.txt and add information.
Each line should be one fact.

Example:

We have 5 burgers in stock.
There are 3 hamburgers available.
The kitchen has 10 burger patties ready.
4. Start the server

Run:

npm start

You should see:

Server running at http://localhost:3000

That means it’s working.

How to ask a question
Using Postman (recommended)

Open Postman

Create a new request

Method: POST

URL:

http://localhost:3000/ask

Headers:

Content-Type: application/json

Body (raw → JSON):

{
  "question": "How many burgers do we have?"
}

Click Send

Example response
{
  "success": true,
  "question": "How many burgers do we have?",
  "answer": "Based on the knowledge base: We have 5 burgers in stock.",
  "matched_text": ["We have 5 burgers in stock."],
  "timestamp": "2026-02-06T00:34:44.601Z"
}
How it works (simple explanation)

The API receives a question

It picks out important words from the question

It searches the text file for matching lines

It chooses the best match

It returns the answer as JSON

It uses simple keyword matching, not AI or machine learning.

Common issues

Port already in use

Change the port in server.js or stop the other process

Cannot find module ‘express’

Run npm install

No matching info found

Check kb.txt

Make sure your question contains words that appear in the file

Why this project exists

This project was built as a small proof-of-concept to show:

Backend API skills

Clean request/response flow

How text-based knowledge systems work

How this can be extended later with AI or cloud services
# knowledge-base-qa-api

