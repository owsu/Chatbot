from groq import Groq
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
load_dotenv()


conversation_history = []
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

client = Groq()

# Called everytime
@app.post("/chat")
def chat(body: Message):
    try:
        conversation_history.append({"role": "user", "content": body.message}) # Adds the user's message onto the LLM memory, so you can chat with it
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            max_tokens=512,
            messages=[
                {"role": "system", "content": "You are a helpful and understanding online assistant trying to help customers with troubleshooting/complaints with Direct Supply."}, #An initial prompt to Groq so it can "roleplay" as a helpful online assistant
                *conversation_history
            ]
        )
        reply = response.choices[0].message.content
        conversation_history.append({"role": "assistant", "content": reply}) # Allows the LLM to see it's previous responses to your requests so it gets the full picture
        return {"reply": reply}
    except Exception as e: # Basic error handling
        raise HTTPException(status_code=500, detail=str(e)) 

@app.post("/reset")
def reset():
    conversation_history.clear()
    return {"status": "cleared"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)