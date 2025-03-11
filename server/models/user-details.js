import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.ATLAS_CONNECTION_STRING_JP;
const client = new MongoClient(uri);

const database = client.db("cross-intelligence");
const userCollection = database.collection("user-details");

export async function postUserDetails(details) {
    const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        location,
        phoneNumber,
        email,
        businessName,
        website
    } = details;

    try {
        await client.connect();

        if (!firstName || !email || !phoneNumber) {
            return {
                success: false,
                message: "Missing required fields: First Name, Email, or Phone Number"
            };
        }

        // Create a document to insert
        const userDocument = {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            location,
            phoneNumber,
            email,
            businessName,
            website,
            createdAt: new Date()
        };

        // Insert the document into the collection
        const result = await userCollection.insertOne(userDocument);
        return {
            success: true,
            message: "User details added successfully",
            insertedId: result.insertedId
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Internal Server Error",
            error: err.message
        };
    } finally {
        await client.close();
    }
}

export async function getUserDetailsByEmail(email) {
    try {
        await client.connect();
        const user = await userCollection.findOne({ email });
        if (!user) {
            return {
                success: false,
                message: "User not found"
            };
        }
        return {
            success: true,
            user
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Internal Server Error",
            error: err.message
        };
    } finally {
        await client.close();
    }
}

export async function updateUserDetailsByEmail(email, updateFields) {
    try {
        await client.connect();

        // Ensure _id is not included in the updateFields
        if (updateFields._id) {
            delete updateFields._id;
        }

        const result = await userCollection.updateOne(
            { email },
            { $set: updateFields }
        );
        if (result.matchedCount === 0) {
            return {
                success: false,
                message: "User not found"
            };
        }
        return {
            success: true,
            message: "User details updated successfully"
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Internal Server Error",
            error: err.message
        };
    } finally {
        await client.close();
    }
}