import streamlit as st
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.document_loaders import TextLoader
from dotenv import load_dotenv
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from tqdm import tqdm


text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=0,
    length_function=len,
)
print("embedding")
# Set an environment variable
os.environ['OPENAI_API_KEY'] = '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' #ADD MY KEY

# Access the environment variable
value = os.environ.get('OPENAI_API_KEY')
#print("Value:", value)


load_dotenv()


directory = 'data_dump'
all_docs = [os.path.join(directory, filename) for filename in os.listdir(directory)]

print("all_docs",all_docs)

langchain_documents = []
for document in tqdm(all_docs):
    print("tqdm")
    try:
        
        loader = TextLoader(document)
        data = loader.load()
        print(data)
        langchain_documents.extend(data)
    except Exception:
        print("geting e:",Exception)
        continue

print("Num pages: ", len(langchain_documents))
print("Splitting all documents")
split_docs = text_splitter.split_documents(langchain_documents)
print(split_docs)
# **********************************************
# **********************************************

embeddings = OpenAIEmbeddings()
print("embeddings")
db = FAISS.from_documents(split_docs, embeddings)


# ******************************************************

def retrieve_info(query):
    similar_response = db.similarity_search(query, k=1)
    print(similar_response)
    page_contents_array = [doc.page_content for doc in similar_response]

    # print("page_contents_array-----------------")
    # print(page_contents_array)
    # print("page_contents_array-----------------")

    return page_contents_array

# ******************************************************

print("llm")
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-16k-0613")

template = """
You are a world class onboarding easing agent for customers telling relevant answers based on the info fed into you 
I will share all the data to you in a text file
and you will follow ALL of the rules below:


1/ Response should be taken from all the data provided to you and if a question is asked you should search in the data internally in the text file for the most relevant answers you can get your hands on

2/ Always try to find a plausible response in context to the data provided to you 

3/ Read the data like everything in the data file is true to its word .

4./ Remember Every Converstation ,every question and answer that you're able to find from the dataset provided

5./ Don't Add 'Based on data provided' anywhere in any context when responding to user answer.

6./ Don't add images in the responses as well

7./ Dont hallucinate , if you dont know the answer reply with "Please Enter Valid Input"

8./ Answer should be in format containing the exercise name, number of sets for the exercise and duration of the workout each exercise fomatted in new Line and the name of the parameter in bold

Please write the best response for the query asked to you based on best relevance and performance.

{message} ? answer this question based on this {data} if possible mostly .

if no data matches the query only then you're supposed to answer according to your needs


"""

prompt = PromptTemplate(
    input_variables=["message","data"],
    template=template
)

chain = LLMChain(llm=llm, prompt=prompt)



def generate_response(message):
    data = retrieve_info(message)
    response = chain.run(message=message,data=data)
    return response

def main():
    st.set_page_config(
        page_title="Customer response generator", page_icon=":bird:")

    st.header("Customer response generator :bird:")
    message = st.text_area("Enter your Query Here")

    if message:
        st.write("Generating results...")

        result = generate_response(message)
        print("result",result)

        st.info(result)


if __name__ == '__main__':
    main()








