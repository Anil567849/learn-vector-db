## How does recommendation or similar suggestion engine works behind?

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
