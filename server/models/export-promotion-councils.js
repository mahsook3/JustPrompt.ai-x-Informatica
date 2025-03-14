import { MongoClient } from "mongodb";
import { getEmbeddings } from "./get-embeddings.js";
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.ATLAS_CONNECTION_STRING_JP;
const client = new MongoClient(uri);

async function connectClient() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
}

export async function searchExportPromotionCouncil(query) {
    try {
        await connectClient();

        const database = client.db("cross-intelligence");
        const coll = database.collection("export-promotion-councils");

const agg = [
  {
    '$vectorSearch': {
      'index': 'vector_index',
      'path': 'embedding',
      'queryVector': await getEmbeddings(query),
      'numCandidates': 150,
      'limit': 5
    }
  }, {
    '$project': {
        council_name : 1,
        contact : 1,
        details : 1,
      'score': {
        '$meta': 'vectorSearchScore'
      }
    }
  }
];

        const result = coll.aggregate(agg);
        const documents = [];
        await result.forEach((doc) => documents.push(doc));
        return documents;
    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    } finally {
        // Do not close the client here to allow reuse
    }
}

// Ensure the client is closed when the application exits
process.on('SIGINT', async () => {
    await client.close();
    process.exit(0);
});