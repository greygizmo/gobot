# backend/agent_with_memory_server.py
from fastapi import FastAPI
from pydantic import BaseModel
import os, json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

app = FastAPI()

# Define the request body schema
class Query(BaseModel):
    query: str

def load_printer_data(json_path: str) -> str:
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return json.dumps(data, indent=2)
    except Exception as e:
        return f"Error reading printer data: {e}"

# Load printer data once
printer_data = load_printer_data("BLT_printers.json")
print("Loaded printer data:", printer_data[:200] + "...")  # Print first 200 chars

# Initialize Gemini model
model = genai.GenerativeModel("gemini-2.0-flash")

# Create a conversation to maintain history
conversation = model.start_chat(history=[])

@app.post("/chat")
async def chat_endpoint(query: Query):
    try:
        print(f"Received query: {query.query}")
        
        # Construct the prompt with context
        prompt = f"""You are a friendly assistant knowledgeable about metal 3D printers. 
Answer the user's questions clearly and accurately using the printer data below.

Printer Data (in JSON):
{printer_data}

User Query: {query.query}

Please provide a clear and concise answer based on the printer data."""

        # Generate response
        response = model.generate_content(prompt)
        answer = response.text.strip()
        print(f"Generated answer: {answer[:200]}...")  # Print first 200 chars of answer
        
        return {"answer": answer}
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in chat endpoint: {error_details}")
        return {"error": str(e)}, 500
