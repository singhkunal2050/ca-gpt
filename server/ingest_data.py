
from langchain.document_loaders import WebBaseLoader
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores.faiss import FAISS

import pickle
import os

#will create a vector store for vector
def create_vector_store():

    if os.path.exists('vectorstore.pkl'):
        print("Store Already exists")
        return FAISS.load_local('vectorstore.pkl', HuggingFaceEmbeddings)

    print("Ingesting the required doc .. ")

    loader = WebBaseLoader("https://cleartax.in/s/house-property")
    raw_documents = loader.load()
    #loader = ReadTheDocsLoader("https://cleartax.in/s/house-property")
    # raw_documents = loader.load()
    print("Docs loaded", raw_documents)
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=600,
        chunk_overlap=150,
    )
    documents = text_splitter.split_documents(raw_documents)
    print("Documents successfully chunked")
    embeddings = HuggingFaceEmbeddings()

    print(documents)
    vectorstore = FAISS.from_documents(documents, embeddings)

    with open("vectorstore.pkl", "wb") as f:
        pickle.dump(vectorstore, f)

    return vectorstore
