# How to use this app

1. Run the app
- use this cmd in the root folder
``` bash
bun run dev
```

2. Run the docker
- create new terminal
- make sure your docker engine is up and running
``` bash
cd src/docker
docker-compose up
```

3. Use this app
``` bash
http://localhost:3000
```

---

# Let's learn about vector db?

## Why we need vector database?
- AI works with huge amounts of complex data, like huge text, images, voices, or recommendations.
- Vector databases help store and manage this kind of data efficiently.

## Why not traditional db?
- Traditional databases are like a phonebook — you can look up a name or number easily.
- AI data, however, is like a map with millions of points showing different locations and directions.
- A phonebook can’t help you find points that are close on the map, so we need vector databases to handle this kind of data.

___

## What is a Vector Database?

- A vector database stores data as multi-dimensional vectors that capture the key features or qualities of information. 
- These vectors can represent text, images, audio, or video.

- The main advantage is that it can quickly find data based on semantic meaning, contextual similarity, or vector proximity, not just exact matches.
For example:
- Find songs that are similar in melody and rhythm.
- Discover articles that are contextually related.
- Identify gadgets that resemble another device in features and reviews.

It lets you search by meaning and similarity, rather than exact values.

## How a Vector Database Works?
- Traditional databases store simple data like words or numbers and search for exact matches. 
- Vector databases, on the other hand, work with vectors — multi-dimensional numerical representations of complex data like text, images, or audio.
- While regular databases search for exact data matches, vector databases look for the closest match using specific measures of similarity.

- Vector databases use special search techniques known as Approximate Nearest Neighbor (ANN) search, which includes methods like hashing and graph-based searches.

### Embeddings
- To make this possible, data is transformed into embeddings.
- Embedding is like giving each item, whether it's a word, image, or something else, a unique code that captures its meaning or essence.
- This code helps computers understand and compare these items in a more efficient and meaningful way.
- For example, similar words or images get vectors that are close together in space.

- This embedding process is typically achieved using a special kind of neural network designed for the task. For example, word embeddings convert words into vectors in such a way that words with similar meanings are closer in the vector space.
- This transformation allows algorithms to understand relationships and similarities between items.
- In short: embeddings turn unstructured/non-number data into numbers, and vector databases use these numbers to quickly find things that are meaningfully similar.

<img width="705" height="367" alt="image" src="https://github.com/user-attachments/assets/9211febb-8335-48dd-a920-626dc91ef12c" />

---

## Real World Application of Vector Databases

Here’s how they are used:

### 1. Enhancing Retail Experiences
Vector databases are transforming retail by powering advanced recommendation systems. 
Online shoppers can receive product suggestions not just based on past purchases, but also by analyzing **similarities in product features, user behavior, and preferences**.

### 2. Financial Data Analysis
In finance, vector databases analyze complex patterns in data to help detect trends, forecast market movements, and support smarter investment decisions. 
They recognize subtle **similarities or deviations** that are crucial for strategy planning.

### 3. Healthcare
Vector databases enable personalized medical treatments by analyzing **genomic sequences** and other medical data, helping solutions align closely with individual patient needs.

### 4. Enhancing Natural Language Processing (NLP)
AI systems like chatbots and virtual assistants rely on understanding human language. 
Vector databases convert large text datasets into vectors, improving **contextual understanding** and enabling more accurate responses.

### 5. Media Analysis
From medical scans to surveillance footage, vector databases can focus on essential features of images, filtering out noise. 
This enables faster and more precise analysis, for example, in **traffic management or public safety monitoring**.

### 6. Anomaly Detection
Vector databases are powerful for spotting **outliers** and unusual patterns. 
In finance and security, this helps prevent fraud and preempt potential breaches with greater speed and accuracy.

---

## Top 5 Best Vector Databases

### 1. Chroma
<img width="699" height="370" alt="image" src="https://github.com/user-attachments/assets/d095f5f5-a7df-4974-a395-66eb30826c1d" />

- Chroma is an open-source vector store
- Its main use is to save embeddings along with metadata
- Chroma makes it easy to build LLM apps by making knowledge, facts, and skills pluggable
- Additionally, it can also be used for semantic search engines over text data.
- Multi-language support: Python, JavaScript/TypeScript, Ruby, PHP, and Java.
- Open source: Licensed under Apache 2.0.

#### Embeddings
- By default, Chroma converts the text into the embeddings using all-MiniLM-L6-v2.
- But you can modify the collection to use another embedding model (HuggingFace, OpenAI, Google, and more).

- Note: it's not managed vector database platform. You need host it yourself.

### 2. Pinecone
<img width="711" height="272" alt="image" src="https://github.com/user-attachments/assets/a466570f-6a65-4361-a1bb-7a781d681b2e" />

- Pinecone is a managed vector database
- Cutting-edge indexing and search capabilities

### 3. Weaviate
<img width="709" height="384" alt="image" src="https://github.com/user-attachments/assets/3c78d7cc-9c05-4460-8d4c-2ca7cac03ad7" />

- Weaviate is an open-source vector database
- Offers recommendations, summarizations, and neural search framework integrations.

### 4. Faiss
<img width="704" height="397" alt="image" src="https://github.com/user-attachments/assets/cce25a37-faaa-4685-b454-4e8c736dcab5" />

- Faiss is an open-source library for the search of similarities and the clustering of dense vectors.
- While it's primarily coded in C++, it fully supports Python/NumPy integration. 

### 5. Qdrant
<img width="707" height="671" alt="image" src="https://github.com/user-attachments/assets/8a98c7c1-6b57-4b22-b806-8ededd409925" />

- Qdrant is a vector database and a tool for conducting vector similarity searches.
- It operates as an API service, enabling searches for the closest high-dimensional vectors.
- You can transform embeddings or neural network encoders into comprehensive applications for tasks like matching, searching, and making recommendations.
- Offers OpenAPI v3 specs
- Supports string matching, numerical ranges, geo-locations, and more.
- Built-in Rust, optimizing resource use with dynamic query planning.











