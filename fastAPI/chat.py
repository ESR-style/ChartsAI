from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime
import uuid
from fastapi.middleware.cors import CORSMiddleware
from config.neo4j_config import NEO4J_CONFIG
from config.openai_config import OPENAI_CONFIG

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Neo4j Configuration
'''
class Neo4jDB:
    def __init__(self):
        self.driver = GraphDatabase.driver(
            NEO4J_CONFIG["uri"],
            auth=(
                NEO4J_CONFIG["user"],
                NEO4J_CONFIG["password"]
            )
        )

    def close(self):
        self.driver.close()

    def create_thread(self, title: str):
        with self.driver.session() as session:
            result = session.write_transaction(self._create_thread, title)
            return result

    @staticmethod
    def _create_thread(tx, title):
        query = """
        CREATE (t:Thread {
            id: $thread_id,
            title: $title,
            created_at: $timestamp
        })
        RETURN t
        """
        result = tx.run(query,
            thread_id=str(uuid.uuid4()),
            title=title,
            timestamp=datetime.now().isoformat()
        )
        return result.single()["t"]

    def create_message(self, thread_id: str, content: str, sender: str):
        with self.driver.session() as session:
            result = session.write_transaction(
                self._create_message,
                thread_id,
                content,
                sender
            )
            return result

    @staticmethod
    def _create_message(tx, thread_id, content, sender):
        query = """
        MATCH (t:Thread {id: $thread_id})
        CREATE (m:Message {
            id: $message_id,
            content: $content,
            sender: $sender,
            timestamp: $timestamp
        })-[:BELONGS_TO]->(t)
        RETURN m
        """
        result = tx.run(query,
            thread_id=thread_id,
            message_id=str(uuid.uuid4()),
            content=content,
            sender=sender,
            timestamp=datetime.now().isoformat()
        )
        return result.single()["m"]

    def get_thread_messages(self, thread_id: str):
        with self.driver.session() as session:
            return session.read_transaction(self._get_thread_messages, thread_id)

    @staticmethod
    def _get_thread_messages(tx, thread_id):
        query = """
        MATCH (m:Message)-[:BELONGS_TO]->(t:Thread {id: $thread_id})
        RETURN m
        ORDER BY m.timestamp
        """
        result = tx.run(query, thread_id=thread_id)
        return [record["m"] for record in result]

# Initialize Neo4j (uncomment when ready)
# db = Neo4jDB()
'''

# Data Models
class Message(BaseModel):
    id: str
    thread_id: str
    content: str
    timestamp: str
    sender: str

class Thread(BaseModel):
    id: str
    title: str
    created_at: str
    messages: List[Message] = []

# Mock Database
chat_threads: Dict[str, Thread] = {}
messages: Dict[str, Message] = {}

# Thread CRUD Operations
@app.post("/threads/", response_model=Thread)
async def create_thread(title: str):
    # Neo4j version 
    '''
    try:
        thread_data = db.create_thread(title)
        new_thread = Thread(
            id=thread_data["id"],
            title=thread_data["title"],
            created_at=thread_data["created_at"],
            messages=[]
        )
        return new_thread
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    '''
    
    # Current mock version
    thread_id = str(uuid.uuid4())
    new_thread = Thread(
        id=thread_id,
        title=title,
        created_at=datetime.now().isoformat(),
        messages=[]
    )
    chat_threads[thread_id] = new_thread
    return new_thread

@app.get("/threads/", response_model=List[Thread])
async def get_all_threads():
    return list(chat_threads.values())

@app.get("/threads/{thread_id}", response_model=Thread)
async def get_thread(thread_id: str):
    if thread_id not in chat_threads:
        raise HTTPException(status_code=404, detail="Thread not found")
    return chat_threads[thread_id]

@app.delete("/threads/{thread_id}")
async def delete_thread(thread_id: str):
    if thread_id not in chat_threads:
        raise HTTPException(status_code=404, detail="Thread not found")
    del chat_threads[thread_id]
    return {"message": "Thread deleted"}

# Message CRUD Operations
def generate_mock_response(user_message: str) -> str:
    
    greetings = ['hello', 'hi', 'hey', 'greetings']
    if user_message.lower() in greetings:
        return (
            "Hello! I'm your data analysis assistant. I can help you with:\n\n"
            "1. Available Features:\n"
            "   - Data visualization\n"
            "   - Trend analysis\n"
            "   - Performance metrics\n\n"
            "2. Getting Started:\n"
            "   - Upload your data file\n"
            "   - Ask specific questions\n"
            "   - Request visualizations\n\n"
            "What type of analysis would you like to explore?"
        )

    # Default analysis responses for other queries
    responses = [
        f"Analysis of your query: '{user_message}'\n\n"
        "1. Initial Findings:\n"
        "   - Detected key variables\n"
        "   - Analyzed data relationships\n"
        "   - Found relevant patterns\n\n"
        "2. Next Steps:\n"
        "   - Create visualization\n"
        "   - Perform deeper analysis\n"
        "   - Generate insights\n\n"
        "Would you like me to create a chart based on this analysis?",

        f"Examining your request: '{user_message}'\n\n"
        "1. Data Overview:\n"
        "   - Categories identified\n"
        "   - Temporal patterns found\n"
        "   - Correlations detected\n\n"
        "2. Suggested Actions:\n"
        "   - Visualize trends\n"
        "   - Compare metrics\n"
        "   - Forecast outcomes\n\n"
        "Shall I prepare a visual representation for you?"
    ]
    return responses[hash(user_message) % len(responses)]

@app.post("/threads/{thread_id}/messages/", response_model=List[Message])
async def create_message(thread_id: str, content: str, sender: str):
    if thread_id not in chat_threads:
        raise HTTPException(status_code=404, detail="Thread not found")
    
    # Create user message
    user_message = Message(
        id=str(uuid.uuid4()),
        thread_id=thread_id,
        content=content,
        timestamp=datetime.now().isoformat(),
        sender="user"  # Force sender to be "user"
    )
    
    # Create AI response
    ai_message = Message(
        id=str(uuid.uuid4()),
        thread_id=thread_id,
        content=generate_mock_response(content),
        timestamp=datetime.now().isoformat(),
        sender="assistant"  # Force sender to be "assistant"
    )
    
    # Add messages to thread
    chat_threads[thread_id].messages.append(user_message)
    chat_threads[thread_id].messages.append(ai_message)
    
    return [user_message, ai_message]

@app.get("/threads/{thread_id}/messages/", response_model=List[Message])
async def get_thread_messages(thread_id: str):
    if thread_id not in chat_threads:
        raise HTTPException(status_code=404, detail="Thread not found")
    return chat_threads[thread_id].messages

@app.put("/messages/{message_id}", response_model=Message)
async def update_message(message_id: str, content: str):
    if message_id not in messages:
        raise HTTPException(status_code=404, detail="Message not found")
    messages[message_id].content = content
    return messages[message_id]

@app.delete("/messages/{message_id}")
async def delete_message(message_id: str):
    if message_id not in messages:
        raise HTTPException(status_code=404, detail="Message not found")
    
    message = messages[message_id]
    thread = chat_threads[message.thread_id]
    thread.messages = [m for m in thread.messages if m.id != message_id]
    
    del messages[message_id]
    return {"message": "Message deleted"}

# Neo4j, add cleanup on app shutdown
'''
@app.on_event("shutdown")
async def shutdown_event():
    db.close()
'''
