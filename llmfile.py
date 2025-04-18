from langchain_ollama import ChatOllama
from langchain.prompts import PromptTemplate
from fastapi import FastAPI

app=FastAPI()

prompt=PromptTemplate.from_template(
    '''You are an expert about cybersecurity
     Following are details of a datapacket that was classified as malicious
     by a machine learning system.

     {details}

     Is it really a threat? What could the threat possibly be?
     Explain in layman language to the most common user in short.'''
)

llm=ChatOllama(
    model="deepseek-r1:1.5b",
    temperature=0.3
)

pipline=prompt|llm

@app.post("/analyze")
def givedet(packet_details: dict):
    response=pipline.invoke({"details": packet_details})
    print(response)
    return response