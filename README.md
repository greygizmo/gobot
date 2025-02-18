# BLT Bot

A conversational AI assistant specialized in BLT 3D printers, built with FastAPI backend and Next.js frontend. The bot uses Google's Gemini AI to provide accurate information about BLT metal 3D printers.

## Features

- 🤖 AI-powered responses about BLT 3D printers
- 💬 Real-time chat interface
- 🎨 Modern, responsive UI with BLT branding
- 🔄 Seamless backend-frontend integration

## Tech Stack

### Backend
- FastAPI
- Google Gemini AI
- Python 3.8+
- Langchain

### Frontend
- Next.js 14
- Tailwind CSS
- React

## Setup

### Prerequisites
- Python 3.8 or higher
- Node.js 18 or higher
- Google Gemini API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory:
```
GEMINI_API_KEY=your_api_key_here
```

5. Start the backend server:
```bash
uvicorn agent_with_memory_server:app --reload
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Type your question about BLT 3D printers in the chat input
3. Press Enter or click the Send button to get a response
4. The AI will provide information based on the available printer data

## Project Structure

```
gobot/
├── backend/
│   ├── agent_with_memory_server.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── BLT_printers.json
```

## Development Status

⚠️ This project is currently in development. Some features may not work as expected.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is proprietary and confidential. All rights reserved. 