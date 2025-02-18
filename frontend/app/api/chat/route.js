// frontend/app/api/chat/route.js
import { POST as fastApiChat } from '../../../backend_api_proxy';

export async function POST(request) {
    try {
        // Forward the request to our backend proxy
        return await fastApiChat(request);
    } catch (error) {
        console.error("Error in API route:", error);
        return new Response(
            JSON.stringify({ error: "Error processing query" }), 
            { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
