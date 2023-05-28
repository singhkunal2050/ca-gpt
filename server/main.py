from fastapi import FastAPI, Request

import logging
from pathlib import Path
import pickle
from typing import Optional

from langchain.llms import OpenAI
from langchain import ConversationChain
from langchain.chains import LLMChain
from langchain.vectorstores import VectorStore

from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain

from ingest_data import create_vector_store
from schemas.request_schemas import RequestBodyParams

app = FastAPI()
app.run(host='0.0.0.0')

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
llm = OpenAI(openai_api_key="api_key", temperature=0.5, max_tokens=1000, frequency_penalty=0.2)
vectorstore: Optional[VectorStore] = None

@app.on_event("startup")
async def startup_event():
    logging.info("loading vectorstore")
    if not Path("vectorstore.pkl").exists():
        create_vector_store()
        raise ValueError("vectorstore.pkl does not exist, please run ingest.py first")
    with open("vectorstore.pkl", "rb") as f:
        global vectorstore
        vectorstore = pickle.load(f)
        print("Vector store loaded successfully")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/v1/completion")
async def get_completion(params: RequestBodyParams):

    print("User Query", params.user_query)
    print("meta", params.meta)

    conversationQA = ConversationalRetrievalChain.from_llm(llm, vectorstore.as_retriever(), memory=memory)

    response = conversationQA({"question": params.user_query})

    print(response)

    return response["answer"]
