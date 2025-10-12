"use client";

import { useState } from "react";

interface QueryResult {
  documents: string[];
  distances: number[];
  metadatas: any[];
  ids: string[];
}

interface DocumentEntry {
  document: string;
  metadata: string;
}

export default function ChromaDBDemo() {
  const [documentEntries, setDocumentEntries] = useState<DocumentEntry[]>([
    { document: "", metadata: "" }
  ]);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  // Add new document entry row
  const addDocumentEntry = () => {
    setDocumentEntries([...documentEntries, { document: "", metadata: "" }]);
  };

  // Remove document entry row
  const removeDocumentEntry = (index: number) => {
    const updated = documentEntries.filter((_, idx) => idx !== index);
    setDocumentEntries(updated.length > 0 ? updated : [{ document: "", metadata: "" }]);
  };

  // Update document text
  const updateDocument = (index: number, value: string) => {
    const updated = [...documentEntries];
    updated[index].document = value;
    setDocumentEntries(updated);
  };

  // Update metadata
  const updateMetadata = (index: number, value: string) => {
    const updated = [...documentEntries];
    updated[index].metadata = value;
    setDocumentEntries(updated);
  };

  // Add documents to ChromaDB
  const handleAddDocuments = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Filter out empty entries
      const validEntries = documentEntries.filter(
        (entry) => entry.document.trim() !== ""
      );

      if (validEntries.length === 0) {
        setMessage("❌ Please add at least one document");
        setLoading(false);
        return;
      }

      // Prepare documents and metadata
      const documents = validEntries.map((entry) => entry.document.trim());
      const metadatas = validEntries.map((entry) => {
        // Parse JSON metadata if provided, otherwise use empty object
        if (entry.metadata.trim()) {
          try {
            return JSON.parse(entry.metadata);
          } catch {
            // If not valid JSON, store as a single field
            return { value: entry.metadata.trim() };
          }
        }
        return { index: documents.indexOf(entry.document.trim()) };
      });

      const response = await fetch("/api/chroma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documents, metadatas })
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ Successfully added ${documents.length} documents with embeddings!`);
        setDocumentEntries([{ document: "", metadata: "" }]);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  // Query ChromaDB
  const handleQuery = async () => {
    setLoading(true);
    setMessage("");
    setResults(null);

    try {
      const response = await fetch(
        `/api/chroma?query=${encodeURIComponent(query)}&nResults=5`
      );

      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        setMessage(`✅ Found ${data.results.documents.length} results`);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  // Clear collection
  const handleClear = async () => {
    if (!confirm("Are you sure you want to delete all documents?")) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/chroma", {
        method: "DELETE"
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Collection cleared successfully!");
        setResults(null);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">ChromaDB Vector Database</h1>
        <p className="text-gray-600 mt-2">Add documents with metadata, generate embeddings, and semantic search</p>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`p-4 rounded-lg ${message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      {/* Add Documents Section */}
      <div className="border-2 border-blue-200 rounded-lg p-6 space-y-4 bg-blue-50">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">📝 Add Documents</h2>
          <button
            onClick={addDocumentEntry}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm"
          >
            + Add Row
          </button>
        </div>

        <div className="space-y-4">
          {documentEntries.map((entry, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-sm text-gray-700">Document #{index + 1}</span>
                {documentEntries.length > 1 && (
                  <button
                    onClick={() => removeDocumentEntry(index)}
                    disabled={loading}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Text *
                  </label>
                  <textarea
                    className="w-full p-3 border-2 border-gray-300 rounded-lg resize-none focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your document text here..."
                    rows={3}
                    value={entry.document}
                    onChange={(e) => updateDocument(index, e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Metadata (JSON format or plain text)
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder='{"category": "business", "type": "scooty"} or simple text'
                    value={entry.metadata}
                    onChange={(e) => updateMetadata(index, e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddDocuments}
            disabled={loading || documentEntries.every(e => !e.document.trim())}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? "Processing & Generating Embeddings..." : "🚀 Generate Embeddings & Store"}
          </button>
          
          <button
            onClick={() => setDocumentEntries([{ document: "", metadata: "" }])}
            disabled={loading}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:bg-gray-200"
          >
            Clear Form
          </button>
        </div>

        <div className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-300">
          <strong>💡 Tip:</strong> Metadata can be JSON like {`{"business": "scooty", "category": "pricing"}`} or plain text. 
          The backend will generate vector embeddings automatically using the default embedding model.
        </div>
      </div>

      {/* Query Section */}
      <div className="border-2 border-green-200 rounded-lg p-6 space-y-4 bg-green-50">
        <h2 className="text-2xl font-semibold">🔍 Semantic Search</h2>
        <input
          type="text"
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
          placeholder="Enter your search query (e.g., 'target customer for scooty')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleQuery()}
          disabled={loading}
        />
        <button
          onClick={handleQuery}
          disabled={loading || !query.trim()}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
        >
          {loading ? "Searching..." : "🎯 Search with Embeddings"}
        </button>
      </div>

      {/* Results Section */}
      {results && (
        <div className="border-2 border-purple-200 rounded-lg p-6 space-y-4 bg-purple-50">
          <h2 className="text-2xl font-semibold">📊 Search Results</h2>
          <div className="space-y-4">
            {results.documents.length === 0 ? (
              <p className="text-gray-600">No results found</p>
            ) : (
              results.documents.map((doc, idx) => (
                <div key={idx} className="p-5 bg-white rounded-lg border-2 border-purple-200 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-bold text-lg text-purple-700">
                      Result #{idx + 1}
                    </span>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-600">
                        Similarity Score
                      </span>
                      <div className="text-lg font-bold text-purple-600">
                        {((1 - results.distances[idx]) * 100).toFixed(1)}%
                      </div>
                      <span className="text-xs text-gray-500">
                        Distance: {results.distances[idx]?.toFixed(4)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-3 text-lg">{doc}</p>
                  {results.metadatas[idx] && Object.keys(results.metadatas[idx]).length > 0 && (
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <span className="text-xs font-semibold text-gray-600">Metadata:</span>
                      <pre className="text-xs mt-1 text-gray-700">
                        {JSON.stringify(results.metadatas[idx], null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Clear Button */}
      <div className="text-center">
        <button
          onClick={handleClear}
          disabled={loading}
          className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
        >
          🗑️ Clear All Documents & Embeddings
        </button>
      </div>
    </div>
  );
}