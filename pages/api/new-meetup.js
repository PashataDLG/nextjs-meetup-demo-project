import { MongoClient } from "mongodb";

// /api/new-meetup

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;

        const client = await MongoClient.connect(
            "mongodb+srv://pashata1998:IctCOUAfcojDYa4Y@cluster0.xjhwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );

        const db = client.db();

        const meetupsCollection = db.collection("meetups");

        await meetupsCollection.insertOne(data);

        client.close();

        res.status(201).json({ message: "Meetup inserted!" });
    }
}

export default handler;
