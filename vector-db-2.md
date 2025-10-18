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

