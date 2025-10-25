import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri as string, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectDb() {
    try {
        await client.connect();
        return client.db("jd-genie");
    } catch {
        console.log("Database connection error:");
        await client.close();
    }
}

export default async function getCollection(collectionName: string) {
    const db = await connectDb();
    return db!.collection(collectionName);
}