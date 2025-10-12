import { ChromaClient } from "chromadb";

async function checkChromaDB() {
  const client = new ChromaClient({
    host: "localhost",
    port: 8000
  });

  console.log("🔍 Checking ChromaDB...\n");

  try {
    // List all collections
    const collections = await client.listCollections();
    console.log(`📚 Total Collections: ${collections.length}\n`);

    if (collections.length === 0) {
      console.log("❌ No collections found!");
      return;
    }

    // Check each collection
    for (const col of collections) {
      console.log(`\n${"=".repeat(60)}`);
      console.log(`📁 Collection: ${col.name}`);
      console.log(`${"=".repeat(60)}`);

      const collection = await client.getCollection({ name: col.name });
      
      // Get all data including embeddings
      const data = await collection.get({
        include: ["documents", "metadatas", "embeddings"]
      });

      const count = data.ids.length;
      console.log(`\n📊 Total Documents: ${count}`);

      if (count > 0) {
        console.log("\n🔍 First Document Details:");
        console.log("─".repeat(60));
        
        // Check first document
        const firstDoc = {
          id: data.ids[0],
          document: data.documents?.[0],
          metadata: data.metadatas?.[0],
          embedding: data.embeddings?.[0]
        };

        console.log(`\n📄 ID: ${firstDoc.id}`);
        console.log(`\n📝 Text Content:`);
        console.log(firstDoc.document);
        
        console.log(`\n🏷️  Metadata:`);
        console.log(JSON.stringify(firstDoc.metadata, null, 2));

        // Check if embeddings exist
        console.log(`\n🧬 Embedding Status:`);
        if (firstDoc.embedding) {
          console.log(`   ✅ EMBEDDINGS EXIST`);
          console.log(`   📐 Embedding Dimension: ${firstDoc.embedding.length}`);
          console.log(`   🔢 First 10 values: [${firstDoc.embedding.slice(0, 10).map(n => n.toFixed(4)).join(", ")}...]`);
          console.log(`   📊 Range: [${Math.min(...firstDoc.embedding).toFixed(4)} to ${Math.max(...firstDoc.embedding).toFixed(4)}]`);
        } else {
          console.log(`   ❌ NO EMBEDDINGS - Only text is stored`);
        }

        // Show all document IDs
        if (count > 1) {
          console.log(`\n📋 All Document IDs in this collection:`);
          data.ids.forEach((id, idx) => {
            console.log(`   ${idx + 1}. ${id}`);
          });
        }
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("✅ Check Complete!");
    console.log("=".repeat(60));

  } catch (error) {
    console.error("\n❌ Error:", error);
  }
}

// Run the check
checkChromaDB()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });