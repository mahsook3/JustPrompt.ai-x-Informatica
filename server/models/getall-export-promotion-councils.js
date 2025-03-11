import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.ATLAS_CONNECTION_STRING_JP;
const client = new MongoClient(uri);

const database = client.db("cross-intelligence");
const coll = database.collection("export-promotion-councils");

export async function councilsDetails(t) {
    try {
        await client.connect();
        // Query the collection, excluding the 'embedding' field
        const cursor = coll.find({}).project({ embedding: 0, _id: 0 });  // Exclude the 'embedding' field
        // Use .toArray() on the cursor to get the results
        const results = await cursor.toArray();
        return results;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        await client.close();
    }
}
