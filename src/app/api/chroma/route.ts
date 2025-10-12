import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";
import { NextRequest, NextResponse } from "next/server";

// Initialize embedding function
const embedder = new DefaultEmbeddingFunction();

// Initialize ChromaDB client with proper configuration
const client = new ChromaClient({
  host: "localhost",
  port: 8000
});

const COLLECTION_NAME = "my_documents";

// Helper function to get or create collection
async function getCollection() {
  try {
    return await client.getCollection({ 
      name: COLLECTION_NAME,
      embeddingFunction: embedder
    });
  } catch (error) {
    // Collection doesn't exist, create it
    return await client.createCollection({
      name: COLLECTION_NAME,
      embeddingFunction: embedder,
      metadata: { description: "My document collection" }
    });
  }
}

// POST: Add documents
export async function POST(request: NextRequest) {
  try {
    const { documents, metadatas } = await request.json();

    if (!documents || !Array.isArray(documents)) {
      return NextResponse.json(
        { error: "documents array is required" },
        { status: 400 }
      );
    }

    const collection = await getCollection();

    // Generate IDs
    const ids = documents.map((_, idx) => `doc_${Date.now()}_${idx}`);

    // Add documents to collection
    await collection.add({
      ids,
      documents,
      metadatas: metadatas || documents.map((_, idx) => ({ index: idx }))
    });

    return NextResponse.json({
      success: true,
      message: `Added ${documents.length} documents`,
      ids
    });
  } catch (error) {
    console.error("Error adding documents:", error);
    return NextResponse.json(
      { error: "Failed to add documents", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// GET: Query documents
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const nResults = parseInt(searchParams.get("nResults") || "5");

    if (!query) {
      return NextResponse.json(
        { error: "query parameter is required" },
        { status: 400 }
      );
    }

    const collection = await getCollection();

    // Query the collection
    const results = await collection.query({
      queryTexts: [query],
      nResults
    });

    return NextResponse.json({
      success: true,
      query,
      results: {
        documents: results.documents[0] || [],
        distances: results.distances?.[0] || [],
        metadatas: results.metadatas?.[0] || [],
        ids: results.ids?.[0] || []
      }
    });
  } catch (error) {
    console.error("Error querying documents:", error);
    return NextResponse.json(
      { error: "Failed to query documents", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE: Clear collection
export async function DELETE() {
  try {
    await client.deleteCollection({ name: COLLECTION_NAME });
    return NextResponse.json({
      success: true,
      message: "Collection deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json(
      { error: "Failed to delete collection", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}