import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Import LangChain components
from langchain.llms import LLM
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

def load_printer_data(json_path: str) -> str:
    """
    Loads the entire printer JSON file and returns it as a pretty-printed string.
    """
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return json.dumps(data, indent=2)
    except Exception as e:
        return f"Error reading printer data: {e}"

class GeminiLLM(LLM):
    """A simple custom LLM that wraps the Gemini API via the official Python SDK."""
    
    @property
    def _llm_type(self) -> str:
        return "gemini"
    
    def _call(self, prompt: str, stop: list = None) -> str:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)
        return response.text.strip()

def main():
    # Load printer data once
    printer_data = load_printer_data("BLT_printers.json")
    
    # Define a prompt template that includes conversation history, printer data, and the current query.
    prompt_template = (
        "You are a friendly assistant knowledgeable about metal 3D printers. "
        "Answer the user's questions clearly and accurately using the printer data and conversation history below.\n\n"
        "Conversation History:\n{history}\n\n"
        "Printer Data (in JSON):\n{printer_data}\n\n"
        "User Query: {query}\n\n"
        "Answer:"
    )
    
    prompt = PromptTemplate(
        input_variables=["history", "printer_data", "query"],
        template=prompt_template,
    )
    
    # Create conversation memory to store past messages.
    memory = ConversationBufferMemory(memory_key="history", return_messages=True)
    
    # Initialize our custom Gemini LLM
    gemini_llm = GeminiLLM()
    
    # Build an LLMChain that ties the LLM, prompt template, and memory together.
    chain = LLMChain(llm=gemini_llm, prompt=prompt, memory=memory)
    
    print("Enter your queries. Type 'exit' to quit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break
        # Run the chain; it will automatically include previous conversation history.
        result = chain.run(query=user_input, printer_data=printer_data)
        print("Bot:", result)

if __name__ == "__main__":
    main()
