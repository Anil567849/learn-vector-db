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


---

## How RAG works and What is the role of Vector DB?
### Let's Take Example of Real-Time Interaction of User

- Note: Feed your context, resource, and data etc. into your vector db with perfect formatting of text, metadata, and ids.
``` Javascript
const student_info = `
Alexandra Thompson, a 19-year-old computer science sophomore with a 3.7 GPA,
is a member of the programming and chess clubs who enjoys pizza, swimming, and hiking
in her free time in hopes of working at a tech company after graduating from the University of Washington.
`

const club_info = `
The university chess club provides an outlet for students to come together and enjoy playing
the classic strategy game of chess. Members of all skill levels are welcome, from beginners learning
the rules to experienced tournament players. The club typically meets a few times per week to play casual games,
participate in tournaments, analyze famous chess matches, and improve members' skills.
`

const university_info = `
The University of Washington, founded in 1861 in Seattle, is a public research university
with over 45,000 students across three campuses in Seattle, Tacoma, and Bothell.
As the flagship institution of the six public universities in Washington state,
UW encompasses over 500 buildings and 20 million square feet of space,
including one of the largest library systems in the world.
`

const documents = [student_info, club_info, university_info];
const metadatas = [{"source": "student info"}, {"source": "club info"}, {'source': 'university info'}];
const ids = ["id1", "id2", "id3"];

await your_vector_db.add({
  documents: documents,
  metadatas: metadatas,
  ids: ids
});
```

How Flow works
#### Step 1: User Input 
- The user types a question
  
#### Step 2: Query Embedding
- The user's new query is immediately sent to the same Embedding Model
- This model converts the user's text query into a vector embedding.

#### Step 3: Context Retrieval (The "R" in RAG)
- The query's vector embedding is sent to the Vector Database.
- The database performs a Vector Similarity Search to find the top K (e.g., 5-10) most relevant text chunks from your proprietary data.
- It does this by identifying which stored vectors are numerically closest to the user's query vector.
- The system also retrieves relevant information from the current Conversation History (short-term memory).

#### Step 4: Prompt Augmentation (The "A" in RAG)
- A Prompt Orchestrator takes the original **user query**, the **conversation history**, and the newly **retrieved relevant data chunks**, and combines them all into one detailed Contextual Prompt.
- **Example**: The resulting prompt looks something like: 
``` Javascript
`Here is the user's current question: [User Query]. 
Here is the conversation history: [History]. 
Answer the user's question only using the following context: [Retrieved Data Chunks].`
```

#### Step 5: Response Generation (The "G" in RAG)
- The complete Contextual Prompt is sent to the Large Language Model (LLM) (eg: ChatGPT, Gemini, Claude or a fine-tuned model etc.).
- The LLM reads the entire prompt—paying special attention to the retrieved data chunks—and generates a final, context-aware answer that directly addresses the user's query using only the provided proprietary information.

#### Step 6: Final Output
- The LLM's final response is sent back to the Chatbot Interface.


---
---

## Deep dive intro internals
### How does recommendation or similar suggestion engine works behind?

Let's learn it from the first principle
### 1. First Solution (Brute Force):
- We will create an array and store similar items in single array.
- In this way we can maintain thousand of different array for similar product that we want to suggest with each other.

<img width="788" height="573" alt="image" src="https://github.com/user-attachments/assets/5ed59413-4084-4cec-ac46-4213eac93717" />

#### Cons:
- Time Complexity: In large database where millions of product exist: you have to find right array and put new product there.
- Duplication issue. What if you want to suggest same with other that exist in different mulitple array.
- Complex Mathing: Two product may not be similar for recommendation but makes sense eg: Family: rice + toffee.

### 2. Graph Based Solution:
- We will create a graph and make each to all other nodes that is similar or can be recommended with this product.
- As people buy similar products you increase the weights of the edges.
<img width="854" height="560" alt="image" src="https://github.com/user-attachments/assets/29420a15-fd66-4980-be4d-9e15cc632320" />

<img width="612" height="387" alt="image" src="https://github.com/user-attachments/assets/ddf90892-5fe3-4d10-8e1e-f4cb8d9a6dd3" />

How to implement: using graph
<img width="796" height="620" alt="image" src="https://github.com/user-attachments/assets/dad5d250-b3e3-4632-bb82-d9ddc5675d4d" />

#### Cons:
- When you have millions of items then adding a one product is expensive.
- To show the recommention in sorted format - you need to sort huge column.
- Cold start: when started you have no purchasing data - your system will not work.
- Same product different brand - you may have data of only one brand it will not work for other.


### 3. Assign a number to each item and show closes as a recommendation
- fruits: 1 to 100 = 1 is apple, 2 is banana etc..
- electronics: 101 to 200
- When someone buy 4th item - recommend them (4-1, 4-2, 4+1, 4+2) etc.

#### Cons:
- not work for: 101-1, 200+1 -> they are different items
- if items are very far: 99 is far from 2
- if new fruit needed to be add - there is no space


### 4. Vectors
- Suppose you want to recommend a moving. You have two dimensions: action, comedy
- When someone watch chup-chup-ke movie you can easily find nearest neighbour and recommend that.

<img width="984" height="683" alt="image" src="https://github.com/user-attachments/assets/02ff56f4-1b34-4cec-88d1-a53d8d87eca0" />

- List this you can add multiple dimensions: {action, comedy, thrill, emotional, romance, so on..} <- this is vector
- To create a vector you can use embedding models -> they are train on neural networks -> You put word, image, audio and video - you get vector
- <img width="765" height="682" alt="image" src="https://github.com/user-attachments/assets/a39c592f-8ac6-47ab-84ef-8c7b38cd1b8e" />

``` bash
famous question:
vector("King") - vector("Man") + vector("Woman") ≈ vector("Queen")

Embedding:
King → [0.8, 0.3, 0.9]
Man → [0.7, 0.1, 0.2]
Woman → [0.6, 0.9, 0.3]

“King” and “Queen” are both rulers, so their vectors are near each other.
"king" and "men" are both male, so their vectors are near to each other.

When we remove king - man all similar aspect - we left with [ruler, money, so on..]
[ruler, money, etc..] + "women" == queen
```


### How to measure closeness between vectors

#### 1. Euclidean Distance (like a ruler)
Measures the straight-line distance between two points.
Example:
- vector A = [1, 2]
- vector B = [4, 6]
- Distance = √((4−1)² + (6−2)²) = √(9 + 16) = 5

Think of it like measuring how far two dots are on paper.


#### 2. Cosine Distance (like an angle)
Measures the angle between two vectors, not how long they are.
It checks how similar their directions are.
Example:
- vector A = [1, 0]
- vector B = [2, 0] → same direction → cosine similarity = 1 (very close)
- vector C = [0, 1] → 90° apart → cosine similarity = 0 (not close)

Used in LLMs because meaning depends on direction (context), not vector length.


Note: Cosine Distance is widely used and much better



---
---

## All about vector data base algorithms
## Why not OLTP or OLAP databases.
- Sql or NoSql database are build for exact searches.
- It is not designed to find symantic seaches or store multiple dimensions.

## How to find nearest values in Vector Database?
### 1. ENN (Exact Nearest Neighbour)
- I have lots of items with embedding (vector)
<img width="382" height="236" alt="image" src="https://github.com/user-attachments/assets/5480fa00-c779-42f4-8f01-a5709293caf2" />

If i need to find similar items as onion 
- I will run a loop and compare with each item and find nearest one using (Cosine or Elucide Distance Formula): O(N)^2 time
- This works Exactly but it is slow -
- This is called a **Exact Nearest Neighbour**

### 2. ANN (Approximate Nearest Neighbour)
- It find closest values very fast but tiny amount of data may be incorrect
- if 8 out of 10 is correct but algorithm is fast then it is fine.

#### Here are 4 type of ANN algos
#### 1. (IVF) Clustering/Inverted File Index
- There are multiple cluster
- Step 1: find each cluster centroid
- Step 2: compare you value with only centroid
- Step 3: choose that cluster whose centroid is closer to your value -> means: that cluster all values will be nearest to you value.
- Step 4: now you can find some times in that cluster which is more closer to your value and pick some.

<img width="688" height="563" alt="image" src="https://github.com/user-attachments/assets/d520f4e8-b989-436f-b40e-d99e043a96f4" />

Note: 
- Cluster X edge maybe closer than Cluster y centroid - but you only find centroid first.
- To make answer more find: you can pick 2-3 centroid in each cluser.

#### 2. Decision Tree Method (Binary Space Partitioning)
- It works similar to binary search -> eg: if value is big than find in right side, left side will never have answer
<img width="640" height="462" alt="image" src="https://github.com/user-attachments/assets/64a0dc49-3e78-4263-8159-445c2d6e511d" />

How it works
- Step 1: Your sort you vector:
<img width="1135" height="216" alt="image" src="https://github.com/user-attachments/assets/d182af23-f4cd-4730-8c9a-7b95f509e839" />

- Step 2: Build Tree using that:
- First Cut in X axis
- Second Cut in Y axis so on..
<img width="677" height="547" alt="image" src="https://github.com/user-attachments/assets/d78b9cfe-2c37-4b01-8e13-4935908e6f0a" />

- Now if i want to find some value i can just use binary approach
Cons:
- if you choose either direction you can't come back and it is possible some dimensions are getting far and far
- if you backtrack it will increase time complexity
- this is not very reliable method: spotify was using it, but moved to another.


### (HNSW) Heirarchical Nevigable Small Worlds
- You consider every vector as a node
- make x nearest neighbour connection in layer 0
- promote some nodes to layer 1
- make x nearest neighbout connection in layer 1
- promote some nodes to layer 2 so on..
- <img width="619" height="415" alt="image" src="https://github.com/user-attachments/assets/518bc255-273d-4dc4-9daf-181b22d34e3f" />

Searching:
- When you want to find some value you start with top level find nearest one
- move down layer and find all connected nodes to that and find nearest
- move more down to that connected node and pick some values - this nodes always be closer to what you are finding


NOTE: 
- Distribute values evenly - so nodes are connected widely


### The Compression Method: (Product Quantization - PQ):
- If a vector has 1536 dimension
- Each is number 32 bit or 4 bytes
- 1536 x 4 bytes - 6144
- billion vectors = ~6 Tera Bytes of RAM to process this
- If you process all - Costly
- If you process chunk by chunk - Slow

  So we use Compress
  - Example: RGB color pink: (255,192,203)
  - We know there are 0 to 255 values
  - We compress pink to single number - say 42 is mathing with pink.
  - You loose some depth of color but your memory reduced from (3bytes x 3values) to (1value x 1byte)
  - 
  <img width="550" height="742" alt="image" src="https://github.com/user-attachments/assets/56f88cef-8e6e-4bf8-b5ca-a0cb3ab6c653" />

What is codebook:
- Training: Look at millions of vectors, find 256 common patterns
- Codebook: Store these 256 patterns in a list (indexed 0-255)
- Compression: For any new vector, find which of the 256 patterns is closest
- Storage: Store just the number (0-255) instead of the full vector


### Which method is best
<img width="710" height="225" alt="image" src="https://github.com/user-attachments/assets/df0e0885-7d55-4d4d-b0fe-5c69a6a34c4b" />

### Popular Databases:
<img width="956" height="474" alt="image" src="https://github.com/user-attachments/assets/48ccd369-ac44-44dd-be23-f4b1e57aac4e" />

### what data is actually stored:
- id => for exact search (search by id)
- vector => for approxiamate/symantic search
- metadata => additional info (vector are non-reversable so metadata is used to save human readable data)
<img width="401" height="150" alt="image" src="https://github.com/user-attachments/assets/40e9bc73-5326-43e1-b7bf-58bf1aeb42df" />

NOTE: 
- Possible: Text, Word, Audio or Video => Embedding
- Not Possible Embedding => Text, word, audio or video
- So we use metadata 


