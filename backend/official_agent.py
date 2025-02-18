# backend/official_agent.py
import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()  # Load GEMINI_API_KEY from .env

# Configure the SDK
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

def build_composite_prompt(query: str, json_path: str) -> str:
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            printer_data = json.load(f)
    except Exception as e:
        return f"Error reading printer data: {e}"
    
    # Pretty-print the entire JSON data
    printer_text = json.dumps(printer_data, indent=2)
    
    # Compose the prompt with persona instructions
    prompt = (
        "You are a friendly assistant knowledgeable about metal 3D printers. "
        "Answer the following question clearly and accurately using the printer data provided.\n\n"
        "Printer Data (in JSON):\n\n"
        f"{printer_text}\n\n"
        f"User query: {query}\n\n"
        "Please provide your answer."
    )
    return prompt

def process_query(query: str) -> str:
    composite_prompt = build_composite_prompt(query, "BLT_printers.json")
    # Remove any debug prints so only the answer is output.
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(composite_prompt)
    # Print only the answer (no extra text)
    print(response.text.strip())

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python official_agent.py 'your query'")
    else:
        user_query = sys.argv[1]
        process_query(user_query)
