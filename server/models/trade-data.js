import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.ATLAS_CONNECTION_STRING_creation;
const client = new MongoClient(uri);

const database = client.db("cross-intelligence");
const coll = database.collection("trade-statistics");

export async function tradeDataGet(ProductCode) {
    console.log('ProductCode:', ProductCode);
    try {
        await client.connect();
        const query = {};
        if (ProductCode) query.ProductCode = ProductCode;
        const projection = {
            _id: 0,
            ReportingCountry: 1,
            PartnerCountry: 1,
            Year: 1,
            Revision: 1,
            ProductCode: 1,
            ProductDescription: 1,
            TradeFlow: 1,
            TradeAmount: 1
        };
        const results = await coll.find(query).project(projection).toArray();
        return results;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        await client.close();
    }
}