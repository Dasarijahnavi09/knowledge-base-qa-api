# Text Knowledge Base REST API (Small Demo)

This is a small demo API that shows:
- A REST API built using Node.js + Express
- A text knowledge base (kb.txt)
- Ask a question and get an answer from the text data

## Run locally
1) Install dependencies:
   npm install

2) Start server:
   npm run dev

Server runs at:
http://localhost:3000

## Endpoints
GET /
- Shows API status

POST /ask
- Send a question and get an answer based on kb.txt

Example request:
{
  "question": "How many burgers do we have?"
}
